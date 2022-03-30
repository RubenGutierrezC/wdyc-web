import { createContext, FC } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";

interface ISocketContext {
  socket: Socket | null;
  socketIsOnline: boolean;
}

export const SocketContext = createContext({} as ISocketContext);

export const SocketProvider: FC = ({ children }) => {
  const { socket, socketIsOnline } = useSocket();

  return (
    <SocketContext.Provider
      value={{
        socket,
        socketIsOnline,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
