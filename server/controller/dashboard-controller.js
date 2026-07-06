const {
  getInstructorBusinessDashboard,
} = require("../service/dashboard-service");

const GetInstructorBusinessDashboard = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      instructorId: req.user.userId,
    };

    const result = await getInstructorBusinessDashboard(data);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  GetInstructorBusinessDashboard,
};
