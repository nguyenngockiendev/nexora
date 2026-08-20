const {
  GetAllUserByrole,
  GetUserById,
  ChangeStatusByAdmin,
  UpdateroleByAdmin,
  GetAllStudentByIdClass,
  RemoveStudentinClass,
  RefectStudentoutclass,
  RequestInstructor,
  ResponInstructor,
  GetPendingTeacherRequests,
  GetuserbyId,
  UpdateProfile,
  UpdatePass,
} = require("../service/user-service");
const uploadFile = require("../service/uploadfile-service");
const { findByIdAndUpdate } = require("../model/Lessons");

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
      status: req.body.status,
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
      roles: req.body.roles,
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
      status: req.body.status,
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
      status: req.body.status,
    };
    const result = await RefectStudentoutclass(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const BecomeInstructor = async (req, res) => {
  try {
    let proofImage = "";
    if (req?.file) {
      const uploadResult = await uploadFile(req?.file?.path, false);
      proofImage = uploadResult?.secure_url || "";
    }
    const data = {
      userId: req.user.userId,
      role: req.user.role,
      specialty: req.body.specialty,
      opinion: req.body.opinion,
      proofImage: proofImage,
    };
    const result = await RequestInstructor(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const ResInstructor = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.body.userId,
      approved: req.body.approved,
      requestId: req.body.requestId,
    };
    const result = await ResponInstructor(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const GetPendingRequests = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
    };
    const result = await GetPendingTeacherRequests(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetUserInfor = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
    };
    const result = await GetuserbyId(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
const ChangeUserProfile = async (req, res) => {
  try {
    let avatar = undefined;
    if (req.file) {
      avatar = await uploadFile(req.file.path, false);
    }

    const data = {
      userId: req.user.userId,
      name: req.body.name,
      email: req.body.email,
      avatar: avatar.secure_url,
      phone: req.body.phone,
    };
    const result = await UpdateProfile(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
const ChangePassWord = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      newpassword: req.body.newPassword,
      currentPassword: req.body.currentPassword,

    };
    const result = await UpdatePass(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  GetAlluser,
  GetUser,
  ChangeStatusUser,
  UpdateRole,
  GetStudentOnClasss,
  RemoveStudent,
  RefectStudent,
  BecomeInstructor,
  ResInstructor,
  GetPendingRequests,
  GetUserInfor,
  ChangeUserProfile,
  ChangePassWord
};
