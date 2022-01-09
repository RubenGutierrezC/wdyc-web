import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(() => io(SOCKET_URL));
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => setIsOnline(true));
      socket.on("offline", () => setIsOnline(false));
      socket.on("disconnect", () => setIsOnline(false));
    }

    return () => {
      socket?.close();
    };
  }, [socket]);

  return {
    socket,
    isOnline,
    setSocket,
  };
};

export default useSocket;
