import { createContext, FC } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";

interface ISocketContext {
  socket: Socket | null;
  isOnline: boolean;
}

export const SocketContext = createContext({} as ISocketContext);

export const SocketProvider: FC = ({ children }) => {
  const { socket, isOnline } = useSocket();

  console.log("render provider");

  return (
    <SocketContext.Provider
      value={{
        socket,
        isOnline,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
