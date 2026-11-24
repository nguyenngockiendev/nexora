const assert = require('node:assert/strict');
const Module = require('node:module');
const mongoose = require('mongoose');
const Class = require('../modules/classes/Class');
const teacher = new mongoose.Types.ObjectId();
const admin = new mongoose.Types.ObjectId();
const course = new mongoose.Types.ObjectId();
const otherCourse = new mongoose.Types.ObjectId();
let classes = [];
let courseOwner = true;
let passed = 0;
const base = () => ({ courseId: course, instructorId: teacher, className: 'Lớp React', description: '', maxStudents: 20, currentStudents: 0, registerDeadline: '2026-11-20', startDate: '2026-11-23', endDate: '2026-12-28', meetingLink: 'https://example.com/room', schedule: { day: 'Monday', startTime: 540, endTime: 660 }, status: 'open', price: 100000 });
function matches(item, query) {
  return Object.entries(query).every(([key, condition]) => {
    const value = key.split('.').reduce((target, part) => target?.[part], item);
    if (condition && typeof condition === 'object' && !(condition instanceof mongoose.Types.ObjectId)) {
      return Object.entries(condition).every(([operator, expected]) => {
        if (operator === '$in') return expected.includes(value);
        if (operator === '$ne') return String(value) !== String(expected);
        if (operator === '$lt') return value < expected;
        if (operator === '$gt') return value > expected;
        throw new Error(operator);
      });
    }
    return String(value) === String(condition);
  });
}
const classModel = {
  find: async query => classes.filter(item => matches(item, query)),
  countDocuments: async query => classes.filter(item => matches(item, query)).length,
  findById: async id => classes.find(item => String(item._id) === String(id)) || null,
  create: async data => { const item = new Class(data); await item.validate(); classes.push(item); return item; },
  findByIdAndUpdate: async (id, data) => {
    const item = classes.find(item => String(item._id) === String(id));
    item.set(data); await item.validate(); return item;
  },
};
const original = Module._load;
Module._load = function(id, ...args) {
  if (id === './Class') return classModel;
  if (id === '../courses/Courses') return { findOne: async () => courseOwner ? { _id: course } : null };
  return original.call(this, id, ...args);
};
const { CreateClassbyIntructor: create, UpdateclassByrole: update, ChangeStatusClass: change } = require('../modules/classes/classes.service');
Module._load = original;
function reset() { classes = []; courseOwner = true; }
function existing(overrides = {}) { const item = new Class({ ...base(), ...overrides }); classes.push(item); return item; }
async function reject(operation, status, text) {
  const log = console.log;
  console.log = () => {};
  try { await assert.rejects(operation, error => error.status === status && (!text || error.message.includes(text))); }
  finally { console.log = log; }
}
async function test(name, run) { reset(); await run(); passed++; console.log('PASS: ' + name); }
async function main() {
  await test('tạo lớp đầu tiên', async () => { const result = await create(base()); assert.equal(result.result.status, 'open'); });
  await test('cho lớp thứ 4, không tính lớp đã đóng', async () => { for(let i=0;i<3;i++) existing({schedule:{day:'Tuesday',startTime:540,endTime:660}}); existing({status:'closed'}); await create(base()); });
  await test('chặn lớp thứ 5 cùng khóa', async () => { for(let i=0;i<4;i++) existing(); await reject(create(base()),400,'4 lớp'); assert.equal(classes.length,4); });
  for (const [name,startTime,endTime,blocked] of [
    ['giao nhau một phần',600,720,true], ['bao trọn lớp cũ',480,720,true], ['nằm trong lớp cũ',570,600,true], ['trùng hoàn toàn',540,660,true], ['nối sau',660,780,false], ['nối trước',420,540,false],
  ]) await test(name, async () => { existing(); const data={...base(),schedule:{day:'Monday',startTime,endTime}}; if(blocked) await reject(create(data),409,'trùng'); else await create(data); });
  await test('trùng lịch xuyên khóa học', async () => { existing({courseId:otherCourse}); await reject(create(base()),409); });
  await test('giáo viên khác được cùng giờ', async () => { existing({instructorId:new mongoose.Types.ObjectId(),courseId:otherCourse}); await create(base()); });
  await test('khác thứ được cùng giờ', async () => { existing({schedule:{day:'Tuesday',startTime:540,endTime:660}}); await create(base()); });
  await test('hai đợt không giao nhau', async () => { existing({endDate:'2026-11-23'}); await create({...base(),startDate:'2026-11-30'}); });
  await test('khoảng ngày giao nhau nhưng không có cùng buổi học', async () => { existing({endDate:'2026-11-29'}); await create({...base(),startDate:'2026-11-24'}); });
  await test('không tự trùng và vẫn sửa được khi khóa đủ 4 lớp', async () => { const item=existing(); for(let i=0;i<3;i++) existing({schedule:{day:'Tuesday',startTime:540,endTime:660}}); await update({classId:item._id,userId:teacher,role:'instructor',className:'Đã đổi'}); assert.equal(item.className,'Đã đổi'); });
  await test('sửa lịch bị trùng', async () => { const item=existing({schedule:{day:'Tuesday',startTime:540,endTime:660}}); existing(); await reject(update({classId:item._id,userId:teacher,role:'instructor',schedule:{day:'Monday'}}),409); });
  await test('admin sửa vẫn xét lịch của giáo viên lớp', async () => { const item=existing({schedule:{day:'Tuesday',startTime:540,endTime:660}}); existing(); await reject(update({classId:item._id,userId:admin,role:'admin',schedule:{day:'Monday'}}),409); });
  await test('không được sửa lớp người khác', async () => { const item=existing(); await reject(update({classId:item._id,userId:admin,role:'instructor',className:'Sai'}),403); });
  await test('mở lại bị chặn khi khóa đủ 4', async () => { const item=existing({status:'closed'}); for(let i=0;i<4;i++) existing(); await reject(change({classId:item._id,userId:teacher,role:'instructor',status:'open'}),400); });
  await test('mở lại bị chặn khi trùng lịch', async () => { const item=existing({status:'closes'}); existing(); await reject(change({classId:item._id,userId:teacher,role:'instructor',status:'open'}),409); });
  await test('đóng và mở lại lớp hợp lệ', async () => { const item=existing(); await change({classId:item._id,userId:teacher,role:'instructor',status:'closed'}); assert.equal(item.status,'closed'); await change({classId:item._id,userId:teacher,role:'instructor',status:'open'}); assert.equal(item.status,'open'); });
  await test('không giảm sĩ số dưới số đã đăng ký', async () => { const item=existing({currentStudents:10}); await reject(update({classId:item._id,userId:teacher,role:'instructor',maxStudents:9}),400); });
  for(const [name,patch] of [
    ['ngày không hợp lệ',{startDate:'invalid'}], ['kết thúc trước khai giảng',{endDate:'2026-11-01'}], ['hạn đăng ký sau khai giảng',{registerDeadline:'2026-11-24'}], ['không có buổi đúng thứ',{startDate:'2026-11-24',endDate:'2026-11-25'}], ['giờ ngược',{schedule:{day:'Monday',startTime:660,endTime:540}}], ['qua đêm',{schedule:{day:'Monday',startTime:1380,endTime:60}}], ['giờ không phải số',{schedule:{day:'Monday',startTime:NaN,endTime:660}}], ['thứ sai',{schedule:{day:'Invalid',startTime:540,endTime:660}}], ['sĩ số lẻ',{maxStudents:1.5}], ['giá âm',{price:-1}], ['trạng thái sai',{status:'invalid'}],
  ]) await test(name,()=>reject(create({...base(),...patch}),400));
  console.log(`PASS: ${passed} class schedule scenarios (mocked database, real Mongoose documents).`);
}
main().catch(error=>{console.error(error);process.exitCode=1});
