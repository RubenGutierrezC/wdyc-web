import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import useStore from "../store";

const SOCKET_URL = "http://localhost:5000";

const useSocket = () => {
  const { user, login } = useStore((state) => state);
  const socket = useMemo(() => io(SOCKET_URL), [SOCKET_URL]);
  const [socketIsOnline, setSocketIsOnline] = useState(false);

  useEffect(() => {
    setSocketIsOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setSocketIsOnline(true);

      const user = window.localStorage.getItem("user");

      if (user) {
        const parsedUser = JSON.parse(user);

        if (parsedUser.roomCode) {
          socket.emit("reconnect", parsedUser, (resp: any) => {
            console.log("resp", resp);
            if (resp.error) {
              return window.localStorage.removeItem("user");
            }

            login(
              parsedUser.username,
              parsedUser.roomCode,
              resp.data.judge ? "/room" : "/wait"
            );
          });
        }
      }
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => setSocketIsOnline(false));
  }, [socket]);

  return {
    socket,
    socketIsOnline,
  };
};

export default useSocket;
