import { createContext, FC } from "react";
import { Socket } from "socket.io-client";
import useSocket from "../hooks/useSocket";

interface ISocketContext {
  socket: Socket | null;
  isOnline: boolean;
  setSocket: (socket: Socket | null) => void;
}

export const SocketContext = createContext({} as ISocketContext);

export const SocketProvider: FC = ({ children }) => {
  const { socket, isOnline, setSocket } = useSocket();

  return (
    <SocketContext.Provider
      value={{
        socket,
        isOnline,
        setSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
