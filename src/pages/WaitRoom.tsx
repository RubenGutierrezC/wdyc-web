import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-location";
import useLoading from "../hooks/useLoading";
import useSocketContext from "../hooks/useSocketContext";
import useToast from "../hooks/useToast";
import useStore from "../store";

const WaitRoom = () => {
  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const { isLoading, startLoading, stopLoading } = useLoading();

  const { socket, socketIsOnline } = useSocketContext();
  const user = useStore((state) => state.user);
  const [participants, setParticipant] = useState<string[]>([]);

  const handleInitGame = () => {
    // socket login
    if (!socket) {
      return showErrorToast("connection problem");
    }

    startLoading();
    socket?.emit("start-game", user, (resp: any) => {
      stopLoading();
      if (resp.error) {
        return showErrorToast(resp.message);
      }

      navigate({ to: "/room" });
    });
  };

  const handleLogout = () => {
    // socket login
    console.log("logout");
  };

  useEffect(() => {
    if (socketIsOnline) {
      socket?.on("participant-joined", (resp: any) => {
        addParticipant([resp.username]);
      });
    }

    return () => socket?.off("participant-joined");
  }, [socket, socketIsOnline]);

  useEffect(() => {
    if (socketIsOnline && user.roomCode) {
      console.log(socketIsOnline, user);

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
            addParticipant(news);
          }
        }
      );
    }
  }, [socket, socketIsOnline, user]);

  useEffect(() => {
    if (socketIsOnline) {
      socket?.on("start-game", (resp: any) => {
        navigate({ to: "/room" });
      });
    }
    return () => socket?.off("start-game");
  }, [socket, socketIsOnline]);

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
              disabled={isLoading}
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
              disabled={isLoading}
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
