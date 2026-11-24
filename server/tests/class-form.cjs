const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
let received;
const original = Module._load;
Module._load = function(id,...args) {
 if(id === './classes.service') return {
  CreateClassbyIntructor: async data => { received=data; return {message:'OK'}; },
  UpdateclassByrole: async data => { received=data; return {}; },
 };
 if(id === '../../services/upload.service') return async()=>{};
 return original.call(this,id,...args);
};
const {CreateClass,UpdateClass} = require('../modules/classes/classes.controller');
Module._load = original;
const response={status(){return this;},json(value){return value;}};
async function testHook(file, name, method, dependency) {
 let failure=true;
 const source=fs.readFileSync(path.resolve(__dirname,'..',file),'utf8').replace(/^import[\s\S]*?;\r?\n/gm,'').replace(`export default ${name};`,`return ${name};`);
 const state=[];
 let cursor=0;
 const useState=initial=>{
  const index=cursor++;
  if(!(index in state))state[index]=initial;
  return[state[index],value=>{state[index]=value;}];
 };
 const hook=new Function('useState',dependency,source)(useState,async()=>{
  if(failure)throw Object.assign(new Error('Failed'),{response:{data:{message:'Lịch trùng'}}});
  return {message:'OK'};
 });
 const render=()=>{cursor=0;return hook();};
 const pending=render()[method]({},'id');
 assert.equal(render().loading,true);
 await assert.rejects(pending);
 assert.equal(render().loading,false);
 assert.equal(render().notification,'Lịch trùng');
 failure=false;
 await render()[method]({},'id');
 assert.equal(render().loading,false);
}
(async()=>{
 const request={body:{schedule:{day:'Monday',startTime:'08:30',endTime:'10:00'}},user:{userId:'teacher',role:'instructor'},params:{courseId:'course'}};
 await CreateClass(request,response);
 assert.equal(received.schedule.startTime,510);
 assert.equal(received.schedule.endTime,600);
 request.body.schedule.startTime='25:00';
 await CreateClass(request,response);
 assert.ok(Number.isNaN(received.schedule.startTime));
 await UpdateClass({...request,body:{price:0},params:{classId:'class'}},response);
 assert.equal(received.schedule,undefined);
 await UpdateClass({...request,body:{schedule:{day:'Tuesday'}},params:{classId:'class'}},response);
 assert.deepEqual(received.schedule,{day:'Tuesday'});
 await testHook('../client/src/features/class/hooks/useCreateClass.jsx','useCreateClass','Create','CreateClass');
 await testHook('../client/src/features/class/hooks/useUpdataclass.jsx','useUpdateClass','Update','UpdatClassById');
 console.log('PASS: HH:mm conversion, invalid hours, partial schedule updates and both form hooks clearing loading on success/failure.');
})().catch(error=>{console.error(error);process.exitCode=1});
