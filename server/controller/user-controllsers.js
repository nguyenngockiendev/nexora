const { GetAllUserByrole, GetUserById,  ChangeStatusByAdmin, UpdateroleByAdmin, GetAllStudentByIdClass, RemoveStudentinClass, RefectStudentoutclass } = require("../service/user-service");

const GetAlluser = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
    };
    const result = await GetAllUserByrole(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetUser = async (req, res) => {
  try {
    const data = {
      userId: req.params.userId,
      role: req.user.role,
    };
    const result = await GetUserById(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const ChangeStatusUser = async (req, res) => {
  try {
    const data = {
      userId: req.params.userId,
      role: req.user.role,
      status: req.body.status
    };
    const result = await ChangeStatusByAdmin(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const UpdateRole = async (req, res) => {
  try {
    const data = {
      userId: req.params.userId,
      role: req.user.role,
      roles: req.body.roles
    };
    const result = await UpdateroleByAdmin(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetStudentOnClasss = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      classId: req.params.classId,
      
    };
    const result = await GetAllStudentByIdClass(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const RemoveStudent = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      classId: req.params.classId,
      studentId: req.params.studentId,
      status:req.body.status,
      
    };
    const result = await RemoveStudentinClass(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const RefectStudent = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      classId: req.params.classId,
      studentId: req.params.studentId,
      status:req.body.status,
      
    };
    const result = await RefectStudentoutclass(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = { GetAlluser,GetUser,ChangeStatusUser,UpdateRole ,GetStudentOnClasss ,RemoveStudent,RefectStudent};
