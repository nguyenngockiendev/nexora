const { SaveMessage } = require("./controller/message-controller");

const registerSoket = (io, socket) => {
  socket.on("join_class", (data) => {
    socket.join(data.classId);
    socket
      .to(data.classId)
      .emit("system_message", `${data.name} đã tham gia lớp học`);
  });
  socket.on("send_class_message", (data) => {
    if (socket.user?.userId) {
      data.userId = socket.user.userId;
      data.role = socket.user.role;
    }
    SaveMessage(io, socket)(data);
  });

  socket.on("disconnect", () => {
    console.log(`Học viên ngắt kết nối: ${socket.id}`);
  });
};

module.exports = registerSoket;
