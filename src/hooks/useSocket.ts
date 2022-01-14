import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

const useSocket = () => {
  const socket = useMemo(() => io(SOCKET_URL), [SOCKET_URL]);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => setIsOnline(true));
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => setIsOnline(false));
  }, [socket]);

  return {
    socket,
    isOnline,
  };
};

export default useSocket;
