import Routes from "./Routes";
import useSocketContext from "./hooks/useSocketContext";
import useStore from "./store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const { socketIsOnline, socket } = useSocketContext();

  const user = useStore((state) => state.user);

  return (
    <>
      <header className="bg-white bg-opacity-70 flex-col flex">
        <p>
          {" "}
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
      <Routes />
    </>
  );
};

export default App;
