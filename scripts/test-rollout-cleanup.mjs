import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
const file = '.local-data/platform.json';
const original = await fs.readFile(file, 'utf8').catch(e => { if (e.code === 'ENOENT') return null; throw e; });
const base = 'http://127.0.0.1:3019';
let child, cookie = '', passed = 0;
function check(value, message) { assert.ok(value, message); console.log('PASS '+message); passed++; }
async function request(path, body, auth = true) {
  const response = await fetch(base+path, { method: body ? 'PATCH' : 'GET', headers: { ...(auth ? {cookie} : {}), 'Content-Type':'application/json' }, body: body ? JSON.stringify(body) : undefined });
  return { response, json: await response.json() };
}
try {
  // Explicit temporary fixtures are confined to local preview and restored in finally.
  const fixture = { properties: [{id:'linked-property',partnerId:'linked-partner'}], rooms:[{id:'test-room',rating:5,reviewCount:1}, {id:'empty-room',rating:0,reviewCount:0}], bookings:[
    {id:'past', roomId:'test-room',checkIn:'2020-01-01',checkOut:'2020-01-02',paymentStatus:'Unpaid',status:'Pending'},
    {id:'paid', roomId:'test-room',checkIn:'2020-01-01',checkOut:'2020-01-02',paymentStatus:'Paid',status:'Confirmed'},
    {id:'future', roomId:'test-room',checkIn:'2099-01-01',checkOut:'2099-01-02',paymentStatus:'Unpaid',status:'Pending'},
    {id:'other-service',appointmentDate:'2020-01-01'},
  ], partners:[{id:'test-partner',partnerId:'test-partner',status:'Pending'}, {id:'linked-partner',partnerId:'linked-partner',status:'Pending'}],fleet:[],dining:[],housekeeping:[] };
  await fs.mkdir('.local-data',{recursive:true}); await fs.writeFile(file, JSON.stringify(fixture));
  child = spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','3019'],{env:{...process.env,STAYCONNECT_LOCAL_PREVIEW:'true',ADMIN_PASSWORD:'isolated-test',ADMIN_SESSION_SECRET:'isolated-session'},stdio:'ignore'});
  let ready=false;for(let i=0;i<100;i++){try{if((await fetch(base+'/api/admin/session')).ok){ready=true;break;}}catch{}await new Promise(r=>setTimeout(r,100));}assert.ok(ready);
  check((await request('/api/bookings',{id:'past',action:'archive'},false)).response.status===401,'Guests cannot archive reservations');
  check((await request('/api/partners',{id:'test-partner',action:'archive'},false)).response.status===401,'Guests cannot archive partners');
  check((await request('/api/rooms',{id:'test-room',action:'clear-reviews'},false)).response.status===401,'Guests cannot clear ratings');
  const login=await fetch(base+'/api/admin/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:'isolated-test'})});assert.equal(login.status,200);cookie=login.headers.get('set-cookie').split(';')[0];
  for(const id of ['paid','future']) check(!(await request('/api/bookings',{id,action:'archive'})).json.success,'Protected reservation cannot be archived: '+id);
  check((await request('/api/bookings',{id:'past',action:'archive'})).json.success,'Past unpaid test reservation can be archived');
  const bookings=(await request('/api/bookings')).json.data;
  check(bookings.length===2 && !bookings.some(b=>b.id==='past'),'Archived and unrelated records are excluded from hotel dashboard');
  check(!(await request('/api/partners',{id:'linked-partner',action:'archive'})).json.success,'Linked partner remains protected');
  check((await request('/api/partners',{id:'test-partner',action:'archive'})).json.success,'Unlinked pending test application can be archived');
  check((await request('/api/partners')).json.data.length===1,'Archived partner is excluded from queue');
  check((await request('/api/rooms',{id:'test-room',action:'clear-reviews'})).json.data.reviewCount===0,'Synthetic review count is cleared');
  check(!(await request('/api/rooms',{id:'test-room',action:'archive'})).json.success,'Upcoming reservations prevent room archival');
  check((await request('/api/rooms',{id:'empty-room',action:'archive'})).json.success,'Unused room can be archived');
  check(!(await request('/api/rooms?manage=true')).json.data.some(r=>r.id==='empty-room'),'Archived room is excluded from admin inventory');
  const stored=JSON.parse(await fs.readFile(file,'utf8'));
  check(stored.bookings.length===4 && stored.bookings.find(b=>b.id==='past').archivedAt,'Archive retains recoverable records and unrelated appointments');
  console.log(`${passed} cleanup checks passed.`);
} finally {
  if(child){child.kill();await new Promise(r=>child.exitCode!==null?r():child.once('exit',r));}
  if(original!==null) await fs.writeFile(file,original); else await fs.rm(file,{force:true});
}
