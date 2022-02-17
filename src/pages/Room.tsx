import useStore from "../store";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import useSocketContext from "../hooks/useSocketContext";
import { toast } from "react-toastify";

const mockResponse = {
  participantCards: {
    username: "ruben",
    isRoomCreator: true,
    numberOfWinnings: 0,
    socketId: "uEje8G9niB8kOXqIAAAD",
    cards: [
      {
        status: true,
        _id: "620d01ea4776c9bd922c1d78",
        phrase: "Basil",
      },
      {
        status: true,
        _id: "620d01ea4776c9bd922c1d32",
        phrase: "Ridgeway",
      },
      {
        status: true,
        _id: "620d01ea4776c9bd922c1d2c",
        phrase: "Karstens",
      },
      {
        status: true,
        _id: "620d01ea4776c9bd922c1d3e",
        phrase: "Jana",
      },
      {
        status: true,
        _id: "620d01ea4776c9bd922c1d3a",
        phrase: "Onsgard",
      },
      {
        status: true,
        _id: "620d01ea4776c9bd922c1d54",
        phrase: "Tomscot",
      },
      {
        status: true,
        _id: "620d01ea4776c9bd922c1d1e",
        phrase: "Bobwhite",
      },
    ],
  },
  participants: [
    {
      username: "ruben",
      isRoomCreator: true,
      numberOfWinnings: 0,
    },
    {
      username: "juan",
      isRoomCreator: false,
      numberOfWinnings: 0,
    },
  ],
  judge: {
    username: "ruben",
    receivedCards: [],
  },
  gameConfig: {
    numberOfRounds: 5,
    actualRound: 1,
    meme: {
      status: true,
      _id: "620d02884776c9bd922c1d87",
      img: "https://robohash.org/nonnumquamdignissimos.png?size=50x50&set=set1",
    },
  },
};

const Room = () => {
  const user = useStore((store) => store.user);
  const { socket } = useSocketContext();

  const [isDragging, setIsDragging] = useState(false);
  const [isOnDragZone, setIsOnDragZone] = useState(false);

  const [selectedCard, setSelectedCard] = useState<any>(null);

  const [round, setRound] = useState({
    participants: [],
    judge: {},
    gameConfig: {},
    participantCards: {
      cards: [],
    },
  });

  const [dragZoneposition, setDragZoneposition] = useState({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    socket?.emit("get-room-info", user, (resp: any) => {
      console.log("get-room-info", resp.data);
      // setRound(resp.data);
    });
  }, [socket]);

  useEffect(() => {
    setRound(mockResponse);
  }, []);

  const handleOnHoveDragZone = () => {
    setIsOnDragZone(isDragging);
  };

  const dragZoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setDragZoneposition(dragZoneRef.current?.getBoundingClientRect());
  }, [dragZoneRef]);

  const verifyIfItemIsInDragZone = ({ x, y }: { x: number; y: number }) => {
    const { left, top, x: h, y: w } = dragZoneposition;

    // console.log(`${left} < ${x} < ${left + w},,,, ${top} < ${y} < ${top + h}`);

    setIsOnDragZone(x > left && x < left + w && y > top && y < top + h);
  };

  const toastId = useRef<any>(null);

  return (
    <div className="grid place-content-center mt-24">
      <p className="text-white">
        Numero de rounds: {round?.gameConfig?.numberOfRounds}
      </p>
      <p className="text-white">Ronda: {round?.gameConfig?.actualRound}</p>

      <div className="flex gap-5 mb-10">
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
          min-w-[300px]
          max-w-md
        "
          >
            <img src={round.gameConfig?.meme?.img} alt="meme" />
          </div>
        </div>
        <motion.div
          // ref={constraintsRef}

          ref={dragZoneRef}
          className="h-full border-dotted w-56 border-2 flex justify-center items-center"
        >
          drag zone
        </motion.div>
      </div>

      {/* TODO: move to separate component */}
      <h4 className="text-white text-center">cards</h4>
      <div className="flex gap-2">
        {round.participantCards?.cards?.map((el) => (
          <motion.div
            key={el._id}
            drag
            animate={{
              translateY: el === selectedCard ? 100 : 0,
              scale: el === selectedCard ? 2 : 1,
            }}
            whileDrag={{
              scale: 0.85,
            }}
            dragSnapToOrigin
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(evt, info) => {
              if (isOnDragZone) {
                setSelectedCard(el);

                if (!toastId.current) {
                  toast.dismiss(toastId.current);
                }

                toastId.current = toast(
                  <div className="flex flex-col gap-2">
                    <h5>Seguro que deseas jugar esa carta?</h5>
                    <div className="flex">
                      <button
                        className="hover:bg-purple-300 px-2 py-2 rounded-full"
                        onClick={() => setSelectedCard(null)}
                      >
                        cancel
                      </button>
                      <button
                        className="bg-purple-500 hover:bg-purple-300 text-white px-2 py-2 rounded-full"
                        onClick={() => console.log("confirm", selectedCard)}
                      >
                        confirm
                      </button>
                    </div>
                  </div>,
                  {
                    autoClose: false,
                    closeButton: false,
                    position: "bottom-center",
                    toastId: "drag-card",
                  }
                );
              }
              setIsOnDragZone(false);
              setIsDragging(false);
            }}
            onDrag={(_, { point }) => {
              verifyIfItemIsInDragZone(point);
            }}
            className="min-w-[100px] h-40 bg-white rounded-lg shadow-md px-2"
          >
            <span>{el?.phrase}</span>
          </motion.div>
        ))}
      </div>

      {/* TODO: move to separate component */}
      <div className="flex gap-3 mt-10">
        {round?.participants?.map((user: any) => {
          const isJudge = round?.judge?.username === user?.username;

          return (
            <div key={user?.username} className="flex flex-col">
              <div className="relative inline-block rounded-full">
                <img
                  className="object-cover w-12 h-12  relative"
                  src="https://www.elarraydejota.com/wp-content/uploads/2016/09/Linux-Avatar-300px.png"
                  alt="Profile image"
                />
                {isJudge && (
                  <>
                    <div className="bg-black bg-opacity-50 h-full w-full absolute top-0" />
                    <Icon
                      icon="mdi:gavel"
                      fontSize={30}
                      className="z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      color="#fff"
                    />
                  </>
                )}
                <span className="absolute top-0 right-0 z-40 inline-block text-sm font-bold bg-white border-2 border-white rounded-full">
                  {user?.numberOfWinnings}
                </span>
              </div>

              <p
                className={"text-sm text-white" + (isJudge && " text-red-500")}
              >
                {user?.username}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Room;
