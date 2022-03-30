import { useEffect } from "react";
import { Outlet, useNavigate } from "react-location";
import { ToastContainer } from "react-toastify";
import useSocketContext from "./hooks/useSocketContext";
import useStore from "./store";

const App = () => {
  const { socketIsOnline, socket } = useSocketContext();

  const navigate = useNavigate();

  const user = useStore((state) => state.user);

  useEffect(() => {
    if (user.redirectTo) {
      navigate({ to: user.redirectTo });
    }
  }, [user]);

  return (
    <>
      <header className="bg-white bg-opacity-70 flex-col flex">
        <p>
          your online status:{" "}
          <span className={socketIsOnline ? "text-green-600" : "text-red-600"}>
            {socketIsOnline ? "online" : "offline"}
          </span>
        </p>

        <p>socket id: {socket?.id}</p>
        <p>user: {user.username}</p>
        <p>room code: {user.roomCode}</p>
      </header>
      <ToastContainer />

      <Outlet />
    </>
  );
};

export default App;
