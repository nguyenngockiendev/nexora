// Isolated HTTP audit: real routes/auth/controllers/services; in-memory model adapter.
// No .env, real database, uploads, payment provider, or AI calls are used.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const Module = require('node:module');
const express = require('express');
const jwt = require('jsonwebtoken');
process.env.JWT_SECRET = 'isolated-audit-only-not-a-production-secret';
const ids = Object.fromEntries(['a', 'b', 'ca', 'cb', 'lb', 'classb', 'orderb', 'attemptb'].map((key, i) => [key, (i + 1).toString(16).padStart(24, '0')]));
let db;
function reset() {
  db = {
    Users: [{ _id: ids.b, name: 'Teacher B', password: 'SYNTHETIC_HASH_DO_NOT_RETURN' }],
    Courses: [{ _id: ids.ca, instructor: ids.a }, { _id: ids.cb, instructor: ids.b }],
    Lessons: [{ _id: ids.lb, courseId: ids.cb, videoUrl: 'https://example.invalid/private-video', isPreview: false }],
    Class: [{ _id: ids.classb, courseId: ids.cb, instructorId: ids.b, currentStudents: 0, meetingLink: 'https://example.invalid/private-meeting', schedule: { startTime: 600, endTime: 660 } }],
    Orders: [{ _id: ids.orderb, userId: ids.b, status: 'failed', paymentCode: 'SYNTHETIC' }],
    QuizAttempts: [{ _id: ids.attemptb, courseId: ids.cb, status: 'submitted', retakeCount: 0 }],
    Enrollments: [], Ratings: [], Quizz: [], LessonTranscripts: [],
  };
}
const clone = value => value == null ? value : JSON.parse(JSON.stringify(value));
function matches(row, filter) {
  return Object.entries(filter).every(([key, value]) => String(row[key]) === String(value));
}
function query(initial) {
  let value = clone(initial);
  const q = {
    populate(field, select) {
      const apply = row => {
        if (!row) return;
        const table = field === 'instructor' ? 'Users' : field === 'courseId' ? 'Courses' : null;
        if (table) row[field] = clone(db[table].find(r => r._id === row[field]) || null);
        if (select && row[field]) for (const part of select.split(' ')) if (part.startsWith('-')) delete row[field][part.slice(1)];
      };
      (Array.isArray(value) ? value : [value]).forEach(apply);
      return q;
    },
    select(fields) {
      for (const row of Array.isArray(value) ? value : [value]) {
        if (row) for (const part of fields.split(' ')) if (part.startsWith('-')) delete row[part.slice(1)];
      }
      return q;
    },
    lean() { return q; }, sort() { return q; }, limit() { return q; },
    then(resolve, reject) { return Promise.resolve(value).then(resolve, reject); },
  };
  return q;
}
const adapters = new Map();
function model(name) {
  if (adapters.has(name)) return adapters.get(name);
  const rows = () => db[name] || [];
  const byId = id => rows().find(r => r._id === String(id?._id || id));
  const adapter = {
    find(filter = {}) { return query(rows().filter(r => matches(r, filter))); },
    findOne(filter) { return query(rows().find(r => matches(r, filter)) || null); },
    findById(id) {
      if (name === 'Orders') {
        const row = byId(id);
        return row ? Promise.resolve({ ...clone(row), async save() { Object.assign(row, this); } }) : Promise.resolve(null);
      }
      return query(byId(id) || null);
    },
    findByIdAndUpdate(id, update) {
      const row = byId(id);
      if (row) {
        Object.assign(row, update.$set || Object.fromEntries(Object.entries(update).filter(([key]) => !key.startsWith('$'))));
        for (const [key, amount] of Object.entries(update.$inc || {})) row[key] = (row[key] || 0) + amount;
      }
      return query(row || null);
    },
    findByIdAndDelete(id) { const row = byId(id); if (row) db[name] = rows().filter(r => r !== row); return query(row || null); },
    deleteMany() { return Promise.resolve({ deletedCount: 0 }); },
  };
  adapters.set(name, adapter);
  return adapter;
}
const realLoad = Module._load;
const realControllers = new Set(['payment-controller', 'class-manager-controller', 'lession-controller', 'quiz-controller', 'course-controller']);
Module._load = function(id, ...args) {
  if (/\/(?:model)\//.test(id)) return model(path.basename(id).replace(/\.js$/, ''));
  if (id === 'dotenv') return { config() {} };
  if (id.includes('/controller/') && !realControllers.has(path.basename(id))) return new Proxy({}, { get: () => (req, res) => res.status(501).end() });
  if (id.endsWith('/uploadfile-service')) return async () => { throw Error('External uploads disabled in audit'); };
  if (id.endsWith('/Worker/worker.service')) return { Worker2() { throw Error('Workers disabled in audit'); } };
  if (id.endsWith('/Middleware/Uploadfile')) return { single: () => (req, res, next) => next(), fields: () => (req, res, next) => next() };
  return realLoad.call(this, id, ...args);
};
const router = require('../router/router');
Module._load = realLoad;
const app = express();
app.use(express.json());
app.use('/api', router);
const results = [];
async function main() {
  const server = await new Promise(resolve => { const s = app.listen(0, '127.0.0.1', () => resolve(s)); });
  const base = `http://127.0.0.1:${server.address().port}/api`;
  async function request(method, endpoint, role, body, userId = ids.a) {
    const token = role && jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '5m' });
    const res = await fetch(base + endpoint, { method, headers: { ...(token ? { authorization: `Bearer ${token}` } : {}), 'content-type': 'application/json' }, ...(body ? { body: JSON.stringify(body) } : {}) });
    return { status: res.status, body: await res.json() };
  }
  async function check(name, action, secure) {
    reset();
    const response = await action();
    const protectedResult = secure(response);
    results.push({ name, result: protectedResult ? 'BLOCKED / protected' : 'VULNERABLE in isolated reproduction', status: response.status, response: response.body });
    console.log(`${protectedResult ? 'PROTECTED' : 'VULNERABLE'} | ${response.status} | ${name}`);
  }
  const denied = r => [401, 403, 404].includes(r.status);
  try {
    await check('Anonymous cannot resume an order', () => request('PUT', `/resume-payment/${ids.orderb}`, null), r => r.status === 401);
    await check('Student cannot delete lessons', () => request('DELETE', `/delete_lession/${ids.lb}`, 'student'), r => r.status === 403 && db.Lessons.length === 1);
    await check('Instructor A cannot delete lesson B', () => request('DELETE', `/delete_lession/${ids.lb}`, 'instructor'), r => denied(r) && db.Lessons.length === 1);
    await check('Owner B can delete own lesson (positive control)', () => request('DELETE', `/delete_lession/${ids.lb}`, 'instructor', null, ids.b), r => r.status === 200 && db.Lessons.length === 0);
    await check('Instructor A cannot edit lesson B', () => request('PUT', `/update_lession/${ids.lb}`, 'instructor', { title: 'changed', status: 'PENDING' }), r => denied(r) && !db.Lessons[0].title);
    await check('Student A cannot delete order B', () => request('DELETE', `/delete-order/${ids.orderb}`, 'student'), r => denied(r) && db.Orders.length === 1);
    await check('Student A cannot resume order B', () => request('PUT', `/resume-payment/${ids.orderb}`, 'student'), r => denied(r) && db.Orders[0].status === 'failed');
    await check('Instructor A cannot read edit data of lesson B', () => request('GET', `/get_lessionbyupdate/${ids.lb}`, 'instructor'), denied);
    await check('Nonmember cannot read private meeting link', () => request('GET', `/get-class/${ids.classb}`, 'student'), r => denied(r) || !r.body.meetingLink);
    await check('Instructor cannot forge role=admin to edit class B', () => request('PUT', `/classes/${ids.classb}`, 'instructor', { role: 'admin', title: 'unauthorized change' }), r => denied(r) && !db.Class[0].title);
    await check('Instructor cannot forge userId to change class B status', () => request('PUT', `/change/status/${ids.classb}`, 'instructor', { userId: ids.b, status: 'closed' }), r => denied(r) && db.Class[0].status !== 'closed');
    await check('Owned course A does not authorize retake of attempt B', () => request('PATCH', `/update_status_Quizz/${ids.attemptb}`, 'instructor', { courseId: ids.ca }), r => denied(r) && db.QuizAttempts[0].status === 'submitted');
    await check('Course detail must not expose instructor password or paid video', () => request('GET', `/details-course/${ids.cb}`, 'student'), r => denied(r) || (!r.body.instructor?.password && !r.body.lessons?.some(l => l.videoUrl)));
    assert.equal(results.length, 13);
    fs.writeFileSync(path.join(__dirname, 'idor-audit-results.json'), JSON.stringify({ scope: 'Isolated HTTP; real route/auth/controller/service; mocked model persistence. Not a live MongoDB penetration test.', results }, null, 2));
    console.log(`Completed ${results.length} cases; ${results.filter(r => r.result.startsWith('VULNERABLE')).length} exposed problems. Details: server/tests/idor-audit-results.json`);
  } finally { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
