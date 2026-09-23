import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { randomUUID } from 'node:crypto';

const base = 'http://127.0.0.1:3017';
const password = ` ${randomUUID()}! `;
let passed = 0;
function check(value, message) { assert.ok(value, message); console.log(`PASS ${message}`); passed++; }
async function server(env, test) {
  const child = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--hostname', '127.0.0.1', '--port', '3017'], {
    env: { ...process.env, STAYCONNECT_LOCAL_PREVIEW: 'false', ADMIN_PASSWORD: '', ADMIN_SESSION_SECRET: '', ...env }, stdio: 'ignore',
  });
  try {
    let ready = false;
    for (let i = 0; i < 100; i++) {
      if (child.exitCode !== null) throw new Error('Test server exited before startup');
      try { if ((await fetch(base + '/api/admin/session')).ok) { ready = true; break; } } catch {}
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    assert.ok(ready, 'Server ready');
    await test();
  } finally {
    child.kill();
    await new Promise(resolve => { if (child.exitCode !== null) resolve(); else child.once('exit', resolve); });
  }
}
const login = body => fetch(base + '/api/admin/session', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
for (const env of [{}, { ADMIN_PASSWORD: password }, { ADMIN_SESSION_SECRET: randomUUID() }]) {
  await server(env, async () => {
    const response = await login({ password });
    check(response.status === 503 && !(response.headers.get('set-cookie')), 'Missing configuration fails clearly without issuing a session');
  });
}
await server({ ADMIN_PASSWORD: password, ADMIN_SESSION_SECRET: randomUUID() }, async () => {
  for (const wrong of ['admin', 'stayconnect', 'stayconnect1', password.trim()]) check((await login({ password: wrong })).status === 401, 'Wrong or former fallback password is rejected');
  check((await login(null)).status === 401, 'Malformed body cannot authenticate');
  const malformed = await fetch(base + '/api/admin/session', { method: 'POST', body: '{' });
  check(malformed.status === 400, 'Invalid JSON is handled');
  const response = await login({ password });
  const setCookie = response.headers.get('set-cookie');
  check(response.status === 200 && /HttpOnly/i.test(setCookie) && /Secure/i.test(setCookie) && /SameSite=strict/i.test(setCookie), 'Exact configured password issues a protected session');
  const cookie = setCookie.split(';')[0];
  const status = await fetch(base + '/api/admin/session', { headers: { cookie } });
  check((await status.json()).authenticated, 'Session survives the login page reload');
  const tampered = await fetch(base + '/api/admin/session', { headers: { cookie: cookie + 'x' } });
  check(!(await tampered.json()).authenticated, 'Tampered session is rejected');
  const logout = await fetch(base + '/api/admin/session', { method: 'DELETE', headers: { cookie } });
  check(/expires=Thu, 01 Jan 1970/i.test(logout.headers.get('set-cookie')), 'Logout expires the session cookie');
});
console.log(`${passed} admin-session checks passed.`);
