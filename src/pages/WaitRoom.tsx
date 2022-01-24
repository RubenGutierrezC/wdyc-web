import useSocket from "../hooks/useSocket";
import { useCallback, useEffect, useState } from "react";
import useSocketContext from "../hooks/useSocketContext";
import useStore from "../store";
const mockParticipants = [
  { id: 1, username: "juan" },
  { id: 2, username: "juan" },
  { id: 3, username: "juan" },
];

const WaitRoom = () => {
  const { socket } = useSocketContext();
  const user = useStore((state) => state.user);
  const [participants, setParticipant] = useState<string[]>([]);

  const handleInitGame = () => {
    // socket login
    socket?.emit(
      "start-game",
      { code: user.roomCode, username: user.username },
      (resp) => {
        console.log("ssss");
      }
    );
    console.log("init game");
  };

  const handleLogout = () => {
    // socket login
    console.log("logout");
  };

  useEffect(() => {
    socket?.on("participant-joined", (resp: any) => {
      console.log("participant-joined", resp);
      addParticipant([resp.username]);
    });
  }, [socket]);

  useEffect(() => {
    socket?.emit(
      "get-participants-in-room",
      {
        code: user.roomCode,
        username: user.username,
      },
      (resp: any) => {
        console.log("get-participants-in-room", resp.data);
        if (resp.data?.participants) {
          const news = resp.data.participants.map((p) => p.username);
          console.log(news);
          addParticipant(news);
        }
      }
    );
  }, [socket]);

  const addParticipant = useCallback(
    (pats) => {
      setParticipant((prev) => [...prev, ...pats]);
    },
    [participants]
  );

  return (
    <div className="grid place-content-center mt-24">
      <div className="flex flex-col items-center justify-center bg-gray-100">
        <div
          className="         flex flex-col
          bg-white
          shadow-md
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          py-8
          rounded-3xl
          w-50
          max-w-md
        "
        >
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Sala de espera
          </div>
          <p className="my-5">creado: usuario creador</p>

          <hr />
          <p>participantes: </p>
          <ul>
            {participants.map((part) => (
              <li className="my-3" key={part}>
                {part}
              </li>
            ))}
          </ul>

          <div className="flex flex-col">
            <button
              onClick={handleInitGame}
              className="                  flex
                  mt-2
                  items-center
                  justify-center
                  disabled:opacity-50
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in"
            >
              Iniciar
            </button>
            <button
              onClick={handleLogout}
              className="                  flex
                  mt-2
                  items-center
                  justify-center
                  disabled:opacity-50
                  focus:outline-none
                  text-white text-sm
                  sm:text-base
                  bg-blue-500
                  hover:bg-blue-600
                  rounded-2xl
                  py-2
                  w-full
                  transition
                  duration-150
                  ease-in"
            >
              Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitRoom;
