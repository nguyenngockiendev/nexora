const Message = require("../model/ClassMessages");

const InserMessage = async (data) => {
  try {
    if (!data.userId || !data.classId) {
      throw { status: 404, message: "error" };
    }
    const newMessage = await Message.create({
      ...data,
      classId: data.classId,
      sender: data.userId,
    });
    return await newMessage.populate("sender", "name avatar role");
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const GetMessage = async (classId) => {
  try {
    const listMes = await Message.find({ classId })
      .populate("sender", "name avatar role")
      .sort({
        createdAt: -1,
      })
      .limit(50)
      .lean();
    return listMes.reverse();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  InserMessage,
  GetMessage,
};
