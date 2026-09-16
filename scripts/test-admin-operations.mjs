import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
let cookie = '';
const created = [];
async function request(path, method = 'GET', body, authenticated = true) {
  const res = await fetch(base + path, { method, headers: { ...(authenticated ? { Cookie: cookie } : {}), ...(body ? { 'Content-Type': 'application/json' } : {}) }, body: body ? JSON.stringify(body) : undefined });
  return { status: res.status, json: await res.json() };
}
assert.equal((await request('/api/admin/session')).json.localPreview, true, 'Only run with local preview');
const login = await fetch(base + '/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: 'stayconnect1' }) });
assert.equal(login.status, 200); cookie = login.headers.get('set-cookie').split(';')[0];
let fixtureId;
try {
  for (const section of ['fleet', 'dining', 'housekeeping']) {
    assert.equal((await request(`/api/admin/operations/${section}`, 'GET', undefined, false)).status, 401);
    assert.equal((await request(`/api/admin/operations/${section}`, 'POST', {}, false)).status, 401);
    assert.equal((await request(`/api/admin/operations/${section}`, 'POST', {})).status, 400);
  }
  const room = (await request('/api/rooms?manage=true')).json.data[0]; assert.ok(room);
  const examples = {
    fleet: { name: 'TEST Fleet persistence', category: 'Chauffeur', driverName: 'Test Driver', dailyRate: 50000, image: '/images/saffron/saffron-1.jpg', status: 'Available' },
    dining: { name: 'TEST Menu persistence', category: 'Breakfast', price: 5000, description: 'Test item', available: true },
    housekeeping: { roomId: room.id, unit: 'TEST Unit', assignedHousekeeper: 'Test Cleaner', cleaningStatus: 'Not inspected' },
  };
  for (const [section, body] of Object.entries(examples)) {
    const endpoint = `/api/admin/operations/${section}`;
    const result = await request(endpoint, 'POST', body); assert.equal(result.status, 201, JSON.stringify(result.json));
    const record = result.json.data; created.push([section, record.id]);
    const update = { ...record, ...(section === 'fleet' ? { status: 'Maintenance' } : section === 'dining' ? { available: false } : { cleaningStatus: 'Clean & Inspected' }) };
    assert.equal((await request(endpoint, 'PATCH', update)).status, 200);
    const saved = (await request(endpoint)).json.data.find(r => r.id === record.id);
    assert.ok(saved); assert.equal(saved.status ?? saved.available ?? saved.cleaningStatus, update.status ?? update.available ?? update.cleaningStatus);
    if (section === 'housekeeping') assert.ok(saved.lastCleaned);
    assert.equal((await request(endpoint, 'PATCH', { ...update, id: 'missing' })).status, 400);
    assert.equal((await request(endpoint, 'DELETE', { id: record.id }, false)).status, 401);
    assert.equal((await request(endpoint, 'DELETE', { id: record.id })).status, 200);
    assert.ok(!(await request(endpoint)).json.data.some(r => r.id === record.id));
    console.log(`PASS ${section}: authentication, validation, create, edit, reload, delete`);
  }
  const source = (await request('/api/properties?manage=true')).json.data[0];
  const property = await request('/api/properties', 'POST', { ...source, name: 'TEST Archive fixture', heroImage: '/images/saffron/saffron-1.jpg', gallery: ['/images/saffron/saffron-1.jpg'] });
  assert.equal(property.status, 200, JSON.stringify(property.json));
  created.push(['properties', property.json.data.id]);
  const archived = await request('/api/properties', 'PATCH', { id: property.json.data.id, action: 'archive' });
  assert.equal(archived.status, 200); assert.ok(archived.json.data.archivedAt);
  assert.ok(!(await request('/api/properties?manage=true')).json.data.some(p => p.id === property.json.data.id));
  console.log('PASS test listing archives without appearing in active inventory');
  const path = '.local-data/platform.json'; const db = JSON.parse(await fs.readFile(path));
  fixtureId = `test-foreign-${Date.now()}`;
  db.bookings.push({ id: fixtureId, bookingNumber: 'NB-test', customer: { name: 'Foreign service fixture' }, status: 'pending' });
  await fs.writeFile(path, JSON.stringify(db));
  assert.ok(!(await request('/api/bookings')).json.data.some(b => b.id === fixtureId));
  console.log('PASS unrelated service bookings excluded from hotel dashboard');
} finally {
  const path = '.local-data/platform.json'; const db = JSON.parse(await fs.readFile(path));
  for (const [section, id] of created) db[section] = db[section].filter(r => r.id !== id);
  db.bookings = db.bookings.filter(b => b.id !== fixtureId);
  await fs.writeFile(path, JSON.stringify(db, null, 2));
}
