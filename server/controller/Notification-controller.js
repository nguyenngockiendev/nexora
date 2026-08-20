const {
  SennotificationbyStudent,
  ReplyForuser,
  GetALLNotification,
  GetNotificationbyuser,
} = require("../service/Notification/help-service");

const UsertSendNotifi = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
      title: req.body.title,
      message: req.body.message,
    };
    const result = await SennotificationbyStudent(data);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const ReplybyAdmin = async (req, res) => {
  try {
    const rawReceiver = req.params.receiverId;
    const isBroadcast =
      !rawReceiver || rawReceiver === "all" || rawReceiver === "null";

    const data = {
      role: req.user.role,
      userId: req.user.userId,
      receiverId: isBroadcast ? null : rawReceiver,
      title: req.body.title,
      type: req.body.type || (isBroadcast ? "broadcast" : "admin_note"),
      message: req.body.message,
    };
    const result = await ReplyForuser(data);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetAllNotifi = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
    };
    const result = await GetALLNotification(data);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const GetNotifiByUser = async (req, res) => {
  try {
    const data = {
      role: req.user.role,
      userId: req.user.userId,
    };
    const result = await GetNotificationbyuser(data);

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  UsertSendNotifi,
  ReplybyAdmin,
  GetAllNotifi,
  GetNotifiByUser,
};
