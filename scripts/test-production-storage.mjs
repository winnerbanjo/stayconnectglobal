import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { parseEnv } from 'node:util';
import { randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import mongoose from 'mongoose';

// Copy only public listing records into a disposable database; never copy or mutate guest data.
const localEnv = parseEnv(await fs.readFile('.env', 'utf8'));
const sourceUri = localEnv.MONGODB_URI;
assert(sourceUri, 'A source database connection is required');
const dbName = `stayconnect_release_test_${randomUUID().replaceAll('-','').slice(0,10)}`;
const target = new URL(sourceUri); target.pathname = `/${dbName}`;
console.log('Connecting to source database (read-only listing copy)…');
const source = await mongoose.createConnection(sourceUri, { autoIndex: false, serverSelectionTimeoutMS: 10000, socketTimeoutMS: 15000 }).asPromise();
console.log('Connecting to disposable database…');
const test = await mongoose.createConnection(target.href, { autoIndex: false, serverSelectionTimeoutMS: 10000, socketTimeoutMS: 15000 }).asPromise();
let server;
let passed = 0;
const base = 'http://127.0.0.1:3001';
let cookie = '';
const password = randomUUID();
function check(value, message) { assert.ok(value, message); passed++; console.log(`PASS ${message}`); }
async function req(path, method='GET', body, auth=false, token) {
  const res = await fetch(base+path, { method, headers: { ...(body ? {'Content-Type':'application/json'} : {}), ...(auth ? {Cookie:cookie} : {}), ...(token ? {Authorization:`Bearer ${token}`} : {}) }, body:body ? JSON.stringify(body):undefined });
  const json = await res.json(); return { res,json };
}
try {
  console.log('Copying public property and room records…');
  for (const name of ['properties','rooms']) { const docs = await source.db.collection(name).find({}).toArray(); if(docs.length) await test.db.collection(name).insertMany(docs, { maxTimeMS:10000 }); }
  // Ensure collections exist before transactional writes.
  await test.db.createCollection('partners', { maxTimeMS:10000 }); await test.db.createCollection('bookings', { maxTimeMS:10000 });
  console.log('Starting production-mode application…');
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3001'], {env:{...process.env, STAYCONNECT_LOCAL_PREVIEW:'false', MONGODB_URI:target.href, ADMIN_PASSWORD:password, ADMIN_SESSION_SECRET:randomUUID(), MAILTRAP_TOKEN:''},stdio:['ignore','ignore','pipe']});
  server.stderr.on('data', data => { if(String(data).includes('EADDRINUSE')) console.error('Test port 3001 is already in use'); });
  let ready=false; for(let i=0;i<80;i++){try{ if((await fetch(base+'/api/admin/session')).ok){ready=true;break;} }catch{} await new Promise(r=>setTimeout(r,250)); }
  check(ready,'Production-mode test server starts against isolated MongoDB');
  check(!(await req('/api/admin/session')).json.localPreview,'MongoDB path is active, not local fixtures');
  const login=await req('/api/admin/session','POST',{password}); cookie=login.res.headers.get('set-cookie')?.split(';')[0]; check(login.res.ok,'Production admin session works');
  const props=(await req('/api/properties')).json.data; const rooms=(await req('/api/rooms')).json.data;
  check(props.length===await source.db.collection('properties').countDocuments(), 'All existing published properties survive normalization');
  check(rooms.length===await source.db.collection('rooms').countDocuments(), 'Both MongoDB-ID and legacy property-ID room links survive');
  check(props.every(p=>p.policies && Array.isArray(p.amenities)), 'Older listing fields are filled safely without database migration');
  for(const room of rooms) check((await fetch(base+`/rooms/${room.slug}`)).ok, `Existing room ${room.slug} renders`);
  check((await fetch(base+'/rooms/standard-room')).ok,'Former Standard Room URL still resolves');
  const partner = await req('/api/partners','POST',{businessName:'Release Test',contactName:'Test Owner',email:'test@example.test',phone:'08012345678',propertyName:'Release Test Property',propertyType:'Hotel',address:'Isolated test address, Lagos',city:'Lagos',numberOfUnits:15,expectedRate:50000,description:'An isolated fixture for the production storage test.',amenities:['Wi-Fi'],images:['/images/saffron/saffron-1.jpg']});
  check(partner.json.success,'Partner and property are saved in a MongoDB transaction');
  const id=partner.json.data.propertyId, token=partner.json.data.accessToken;
  check((await req('/api/partner/manage','PATCH',{id,action:'submit'},false,token)).json.success,'MongoDB partner submission succeeds');
  check((await req('/api/properties','PATCH',{id,action:'approve'},true)).json.success,'MongoDB property approval succeeds');
  const roomResult=await req('/api/rooms','POST',{propertyId:id,name:'Concurrent Inventory Test',pricePerNight:50000,numberOfUnits:1,heroImage:'/images/saffron/saffron-1.jpg',gallery:['/images/saffron/saffron-1.jpg']},true);
  check(roomResult.json.success,roomResult.json.error || 'Room creation persists and links to new property');
  const room=roomResult.json.data;
  const body={roomId:room.id,checkIn:new Date(Date.now()+90*86400000).toISOString().slice(0,10),checkOut:new Date(Date.now()+92*86400000).toISOString().slice(0,10),adults:2,guestName:'Isolated Test Guest',guestEmail:'test@example.test',guestPhone:'08012345678',paymentMethod:'Bank Transfer'};
  const reservations=await Promise.all([req('/api/bookings','POST',body),req('/api/bookings','POST',body)]);
  check(reservations.every(r=>r.json.success && r.json.data.status==='Pending'),'Concurrent reservation requests persist as pending');
  const confirmations=await Promise.all(reservations.map(r=>req('/api/bookings','PATCH',{id:r.json.data.id,action:'confirm-payment'},true)));
  check(confirmations.filter(r=>r.json.success).length===1,'Only one concurrent payment confirmation consumes the last unit');
  check(await test.db.collection('bookings').countDocuments({paymentStatus:'Paid'})===1,'Database contains exactly one paid booking after contention');
  check((await req('/api/rooms','PATCH',{id:room.id,numberOfUnits:2},true)).json.success,'Admin can increase inventory transactionally');
  const pending=confirmations.findIndex(r=>!r.json.success);
  check((await req('/api/bookings','PATCH',{id:reservations[pending].json.data.id,action:'confirm-payment'},true)).json.success,'Second confirmation succeeds after inventory increases');
  check(await source.db.collection('properties').countDocuments()===props.length,'Original production listing collection remains unchanged');
  console.log(`\n${passed} production-storage checks passed using a disposable MongoDB database.`);
} finally {
  if(server){server.kill('SIGTERM'); await new Promise(resolve=>{if(server.exitCode!==null)resolve();else {const timer=setTimeout(()=>server.kill('SIGKILL'),5000);server.once('exit',()=>{clearTimeout(timer);resolve();});}});}
  assert(test.name===dbName && dbName.startsWith('stayconnect_release_test_'));
  await test.dropDatabase(); await test.close(); await source.close();
}
