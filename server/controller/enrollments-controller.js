const {
  GetorderByUserId,
  CheckEnrollment,
} = require("../service/enrollments-service");

const Getorderbyuser = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
    };

    const result = await GetorderByUserId(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    
    res.status(error.status || 500).json({ message: error.message });
  }
};
const Getcheckenrollment = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
      courseId: req.params.courseId,
    };
    const result = await CheckEnrollment(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};
module.exports = {
  Getorderbyuser,
  Getcheckenrollment,
};
