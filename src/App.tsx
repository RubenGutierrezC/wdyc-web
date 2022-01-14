import Routes from "./Routes";
import useSocketContext from "./hooks/useSocketContext";
import useStore from "./store";

const App = () => {
  const { isOnline, socket } = useSocketContext();

  const user = useStore((state) => state.user);

  return (
    <>
      <header className="bg-white bg-opacity-70 flex-col flex">
        <p>
          {" "}
          your online status:{" "}
          <span className={isOnline ? "text-green-600" : "text-red-600"}>
            {isOnline ? "online" : "offline"}
          </span>
        </p>

        <p>socket id: {socket?.id}</p>
        <p>user: {user.username}</p>
        <p>room code: {user.roomCode}</p>
      </header>

      <Routes />
    </>
  );
};

export default App;
