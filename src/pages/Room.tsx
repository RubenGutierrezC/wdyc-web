import useStore from "../store";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import useSocketContext from "../hooks/useSocketContext";

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

  useEffect(() => {
    socket?.emit("get-room-info", user, (resp: any) => {
      console.log("get-room-info", resp.data);
      setRound(resp.data);
    });
  }, [socket]);

  console.log("draggin", isDragging, "hover", isOnDragZone);

  const handleOnHoveDragZone = () => {
    setIsOnDragZone(isDragging);
  };

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
          w-50
          max-w-md
        "
          >
            <img src={round.gameConfig?.meme?.img} alt="meme" />
          </div>
        </div>
        <motion.div
          // ref={constraintsRef}
          onMouseEnter={handleOnHoveDragZone}
          className="h-full border-dotted w-48 border-2 flex justify-center items-center"
        >
          drag zone
        </motion.div>
      </div>
      <h4 className="text-white text-center">cards</h4>
      <div className="flex gap-2 max-w-lg">
        {round.participantCards?.cards?.map((el) => (
          <motion.div
            key={el._id}
            drag
            animate={{
              translateY: el === selectedCard ? 200 : 0,
              scale: el === selectedCard ? 3 : 1,
            }}
            whileDrag={{
              scale: 2,
            }}
            dragSnapToOrigin
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(evt, info) => {
              if (isOnDragZone) {
                setSelectedCard(el);
              }
              setIsOnDragZone(false);
              setIsDragging(false);
            }}
            className="w-40 h-40 bg-white rounded-lg shadow-md px-2"
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
