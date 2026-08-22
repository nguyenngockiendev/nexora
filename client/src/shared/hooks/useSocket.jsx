import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
const useShareSocket = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const socketUrl =
      import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";
    const newsocket = io(socketUrl);

    newsocket.on("system_message", (data) => {
      toast.info(data);
    });
    newsocket.on("messageChangettext", (data) => {
      toast.info(data);
    });

    setSocket(newsocket);

    return () => {
      newsocket.disconnect();
    };
  }, []);
  return socket;
};
export default useShareSocket;
