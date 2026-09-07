const { body } = require("express-validator");
const {
  CreateClassbyIntructor,
  GetClassbyInstructor,
  UpdateclassByrole,
  ChangeStatusClass,
  GetClassByStudent,
  CourseDetailsClass,
  AssesmentClass,
  GetAssesment,
  SumbitAssments,
} = require("../service/class-manager-service");
const uploadFile = require("../service/uploadfile-service");

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
const GetclassbyId = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      intructor: req.user.userId,
      courseId: req.params.courseId,
    };
    const result = await GetClassbyInstructor(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const UpdateClass = async (req, res) => {
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
    };
    const result = await UpdateclassByrole(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const ChangeStatus = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      classId: req.params.classId,
      ...req.body,
    };
    const result = await ChangeStatusClass(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetClass = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      classId: req.params.classId,
    };
    const result = await GetClassByStudent(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const DetaiCourseClass = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      courseId: req.params.courseId,
    };
    const result = await CourseDetailsClass(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const SumbitAssignment = async (req, res) => {
  try {
    let fileAss = null;
    if (req.file) {
      const uploadRes = await uploadFile(req.file.path, false);
      fileAss = uploadRes?.secure_url || uploadRes?.url;
    }
    const data = {
      userId: req.user.userId,
      classId: req.params.classId,
      title: req.body.title,
      description: req.body.description,
      fileUrl: fileAss,
      deadline: req.body.deadline,
      assignmentId: req.body.assignmentId,
    };
    const result = await AssesmentClass(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetAssesmentClass = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      classId: req.params.classId,
    };
    const result = await GetAssesment(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GradeAssignments = async (req, res) => {
  try {
    let fileAss = null;
    if (req.file) {
      const uploadRes = await uploadFile(req.file.path, false);
      fileAss = uploadRes?.secure_url || uploadRes?.url;
    }
    const data = {
      userId: req.user.userId,
      classId: req.params.classId,
      assignmentId: req.body.assignmentId,
      assignmentSubmissionsid:
        req.body.assignmentSubmissionsid || req.body.submissionId,
      fileUrl: fileAss,
      score: req.body.score,
      feedback: req.body.feedback,
      status: req.body.status,
    };
    const result = await SumbitAssments(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  GradeAssignments,
  GetAssesmentClass,
  SumbitAssignment,
  CreateClass,
  GetclassbyId,
  UpdateClass,
  ChangeStatus,
  GetClass,
  DetaiCourseClass,
};
