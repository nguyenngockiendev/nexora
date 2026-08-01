import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { MessageList } from "../api/class-api";
import { toast } from "react-toastify";
const useClassChat = (classId) => {
  const [message, setMessage] = useState([]);
  const socketRef = useRef(null);
  const [loadings, setLoading] = useState(false);
  const inforUser = JSON.parse(localStorage.getItem("userInfor") || "{}");
  useEffect(() => {
    socketRef.current = io("http://localhost:5000");
    socketRef.current.emit("join_class", {
      classId,
      name: inforUser.name || "Vô danh",
    });
    socketRef.current.on("system_message", (data) => {
      toast.info(data);
    })
    socketRef.current.on("new_class_message" , (data)=>{
      setMessage((prev) => [...prev,data])
    })

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [classId]);

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
    socketRef.current.emit("send_class_message", {
      classId,
      userId: inforUser?.userId,
      content,
    });
  };

  return { message, loadings, sendMess };
};
export default useClassChat;
