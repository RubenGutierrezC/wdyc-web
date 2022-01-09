import Routes from "./Routes";
import useSocket from "./hooks/useSocket";

const App = () => {
  const { isOnline } = useSocket();

  return (
    <>
      <header className="bg-white bg-opacity-70">
        your online status:{" "}
        <span className={isOnline ? "text-green-600" : "text-red-600"}>
          {isOnline ? "online" : "offline"}
        </span>
      </header>
      <Routes />
    </>
  );
};

export default App;
