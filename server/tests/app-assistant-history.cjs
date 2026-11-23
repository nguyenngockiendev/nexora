const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../../client/src/features/ai-assistant/hooks/useAssistant.js'), 'utf8')
  .replace(/^import .*;\r?\n/gm, '')
  .replace('export default useAssistant;', 'return useAssistant;');
let saved = [{ _id: 'old-user', role: 'user', text: 'Tin cũ', status: 'DONE' }, { _id: 'old-model', role: 'model', text: 'Trả lời cũ', status: 'DONE', capacities: [1] }];
let failDelete = false;
const requests = [];
const send = async (request) => {
  requests.push(request);
  request.onEvent({ type: 'delta', text: 'Nội dung ' });
  request.onEvent({ type: 'delta', text: 'AI.' });
  request.onEvent({ type: 'done', usedTools: ['AIassistantService'] });
  saved.push({ _id: 'new-user', role: 'user', text: request.question, status: 'DONE' }, { _id: 'new-model', role: 'model', text: 'Nội dung AI.', status: 'DONE' });
};
function mount() {
  const values = [];
  const ref = { current: null };
  let index = 0;
  let effect;
  let registered = false;
  const useState = (initial) => {
    const key = index++;
    if (!(key in values)) values[key] = initial;
    return [values[key], value => { values[key] = typeof value === 'function' ? value(values[key]) : value; }];
  };
  const useEffect = (callback) => { if (!registered) { registered = true; effect = callback; } };
  const hook = new Function('useState', 'useRef', 'useEffect', 'sendAssistantQuestion', 'getAssistantHistory', 'deleteAssistantHistory', source)(
    useState, () => ref, useEffect, send,
    async () => saved.map(message => ({ ...message })),
    async () => { if (failDelete) throw new Error('Delete failed'); saved = []; },
  );
  const render = () => { index = 0; return hook(() => ({ lessonId: 'lesson', courseId: 'course', time: 328 })); };
  render();
  const cleanup = effect();
  return { render, cleanup };
}
async function main() {
  const first = mount();
  assert.equal(first.render().historyLoading, true);
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(first.render().messages.length, 2);
  assert.equal(first.render().messages[1].state, 'done');
  await first.render().sendMessage('Câu hỏi mới');
  assert.equal(requests[0].messhistory, undefined);
  assert.equal(requests[0].lessonContext.time, 328);
  assert.equal(first.render().messages.at(-1).text, 'Nội dung AI.');
  assert.equal(first.render().messages.at(-1).state, 'done');
  first.cleanup();
  const reload = mount();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(reload.render().messages.length, 4);
  failDelete = true;
  await reload.render().clearMessages();
  assert.equal(reload.render().messages.length, 4);
  assert.ok(reload.render().error);
  failDelete = false;
  await reload.render().clearMessages();
  assert.deepEqual(reload.render().messages, []);
  reload.cleanup();
  const afterDelete = mount();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(afterDelete.render().messages, []);
  afterDelete.cleanup();
  console.log('PASS: DB history hydration, no client history payload, streaming, reload, failed deletion preservation and persistent clear.');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
