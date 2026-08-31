const {
  getInstructorBusinessDashboard,
  DashboartAdmin,
  SelectSessionClass,
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
const DashboartforAdmin = async (req, res) => {
  try {
    const data = {
      day: req.query.day,
    };
    const result = await DashboartAdmin(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetClassSesion = async (req, res) => {
  try {
    const data = {
      userId: req.user.userId,
    };
    const result = await SelectSessionClass(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  GetInstructorBusinessDashboard,
  DashboartforAdmin,
  GetClassSesion,
};
