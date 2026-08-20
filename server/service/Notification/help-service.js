const Notifications = require("../../model/Notifications");
const TeacherRequests = require("../../model/TeacherRequests");
const Users = require("../../model/Users");

const SennotificationbyStudent = async (data) => {
  try {
    const isuser = await Users.findById(data.userId);
    if (!isuser) {
      throw { status: 404, message: "không tìm thấy!" };
    }
    const newNotifi = await Notifications.create({
      receiverId: null,
      senderId: data.userId,
      title: data.title,
      message: data.message,
      type: "help_request",
      targetRole: data.role,
    });
    return newNotifi;
  } catch (error) {
    throw error;
  }
};
const ReplyForuser = async (data) => {
  try {
    if (data.role !== "admin") {
      throw { status: 404, message: "không đủ quyền!" };
    }
    const isuser = await Users.findById(data.userId);
    if (!isuser) {
      throw { status: 404, message: "không tìm thấy!" };
    }
    const reRole = await Users.findById(data.receiverId).select("role").lean();
    const newNotifi = await Notifications.create({
      receiverId: data.receiverId || null,
      senderId: data.userId,
      title: data.title,
      message: data.message,
      type: data.type || (data.receiverId ? "admin_note" : "broadcast"),
      targetRole: reRole.role || "all",
    });
    return newNotifi;
  } catch (error) {
    throw error;
  }
};

const GetALLNotification = async (data) => {
  try {
    if (data.role !== "admin") {
      throw { status: 404, message: "không đủ quyền!" };
    }
    const getall = await Notifications.find()
      .populate("senderId")
      .sort({ createdAt: -1 })
      .lean();

    return getall;
  } catch (error) {
    throw error;
  }
};

const GetNotificationbyuser = async (data) => {
  try {
    const getnote = await Notifications.find({
      $or: [
        { receiverId: data.userId },
        { targetRole: "all" },
        { targetRole: data.role },
      ],
    })
      .sort({
        createdAt: -1,
      })
      .lean();
    const reqTeach = await TeacherRequests.find({ userId: data.userId })
      .sort({ createdAt: -1 })
      .lean();
    if (getnote.length < 0) {
      throw { status: 404, message: "Không có thông báo nào cả!" };
    }
    return { getnote: getnote, reqTeach: reqTeach };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  SennotificationbyStudent,
  ReplyForuser,
  GetALLNotification,
  GetNotificationbyuser,
};
