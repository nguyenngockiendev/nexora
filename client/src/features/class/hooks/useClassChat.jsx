import { useEffect, useState } from "react";

import { MessageList } from "../api/class-api";

import useShareSocket from "../../../shared/hooks/useSocket";
const useClassChat = (classId) => {
  const [message, setMessage] = useState([]);

  const socket = useShareSocket();
  const [loadings, setLoading] = useState(false);
  const inforUser = JSON.parse(localStorage.getItem("userInfor") || "{}");
  useEffect(() => {
    if (!socket) return;
    socket.emit("join_class", {
      classId,
      name: inforUser.name || "Vô danh",
    });

    socket.on("new_class_message", (data) => {
      setMessage((prev) => [...prev, data]);
    });
  }, [socket, classId]);

  useEffect(() => {
    const LimitMessage = async () => {
      try {
        setLoading(false);
        const res = await MessageList(classId);
        setMessage(res);
        setLoading(true);
      } catch (error) {
        console.log(error);
      }
    };
    LimitMessage();
  }, [classId]);
  const sendMess = (content) => {
    if (socket) {
      socket.emit("send_class_message", {
        classId,
        userId: inforUser?.userId,
        content,
      });
    }
  };

  return { message, loadings, sendMess };
};
export default useClassChat;
