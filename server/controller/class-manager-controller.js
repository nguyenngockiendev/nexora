const { body } = require("express-validator");
const { CreateClassbyIntructor, GetClassbyInstructor, UpdateclassByrole, ChangeStatusClass, GetClassByStudent, CourseDetailsClass } = require("../service/class-manager-service");

const CreateClass = async (req, res) => {
  try {
    const converttime = (time = "00:00") => {
      const [h, p] = time.split(":").map(Number);
      return h * 60 + p;
    };

    const data = {
      role: req.user.role,
      instructorId: req.user.userId,
      courseId: req.params.courseId,
      ...req.body,
      schedule: {
        ...req.body?.schedule,
        startTime: converttime(req.body?.schedule?.startTime),
        endTime: converttime(req.body?.schedule?.endTime),
      },
    };
    const result = await CreateClassbyIntructor(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetclassbyId = async(req,res)=>{
  try {
    const data ={
      role: req.user.role,
      courseId:req.user.userId,

    };
    const result = await GetClassbyInstructor(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
}
const UpdateClass = async(req,res)=>{
  try {
     const converttime = (time = "00:00") => {
      const [h, p] = time.split(":").map(Number);
      return h * 60 + p;
    };
    const data = {
      role: req.user.role,
      classId: req.params.classId,
      ...req.body,
       schedule: {
        ...req.body?.schedule,
        startTime: converttime(req.body?.schedule?.startTime),
        endTime: converttime(req.body?.schedule?.endTime),
      },

    }
    const result = await UpdateclassByrole(data)
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const ChangeStatus = async(req,res) =>{
  try {
    const data ={
      role: req.user.role,
      classId: req.params.classId,
      ...req.body

    };
    const result = await ChangeStatusClass(data);
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetClass = async(req,res) =>{
  try {
    const data ={
      role: req.user.role,
      classId: req.params.classId,
    };
    const result = await GetClassByStudent(data);
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
}

const DetaiCourseClass = async(req,res) =>{
  try {
    const data ={
      role: req.user.role,
      courseId: req.params.courseId,
    };
    const result = await CourseDetailsClass(data);
    res.status(200).json(result);

  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
}
module.exports = { CreateClass,GetclassbyId,UpdateClass,ChangeStatus,GetClass,DetaiCourseClass};
