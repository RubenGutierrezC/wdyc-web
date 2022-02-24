import useStore from "../store";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import useSocketContext from "../hooks/useSocketContext";
import { toast } from "react-toastify";
import { Players } from "../components/Players";
import useToast from "../hooks/useToast";
import { RoomGameInfo } from "../components/RoomGameInfo";
import { Cards } from "../components/Cards";

const Room = () => {
  const user = useStore((store) => store.user);
  const { socket } = useSocketContext();

  const { showErrorToast, showSuccessToast } = useToast();

  // const [isDragging, setIsDragging] = useState(false);
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

  const [cardsToSelect, setCardsToSelect] = useState([]);

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
      if (resp.error) {
        return showErrorToast(resp.message);
      }
      setRound(resp.data);
    });
  }, [socket]);

  const dragZoneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    setDragZoneposition(dragZoneRef.current?.getBoundingClientRect());
  }, [dragZoneRef]);

  const verifyIfItemIsInDragZone = ({ x, y }: { x: number; y: number }) => {
    const { left, top, x: h, y: w } = dragZoneposition;

    setIsOnDragZone(x > left && x < left + w && y > top && y < top + h);
  };

  const toastId = useRef<any>(null);

  const isJudge = round.judge.username === user.username;

  const setCard = (card: any) => {
    if (isJudge) {
      socket?.emit(
        "set-win-card",
        {
          roomCode: user.roomCode,
          username: user.username,
          card,
        },
        (resp) => {
          console.log("set-card", resp);
          if (resp.error) {
            return showErrorToast(resp.message);
          }

          setSelectedCard(null);
          setRound((prevState) => ({
            ...prevState,
            participantCards: {
              ...prevState.participantCards,
              cards: prevState.participantCards.cards.filter(
                (c: any) => c._id !== card._id
              ),
            },
          }));
        }
      );
    } else {
      socket?.emit(
        "set-card",
        {
          roomCode: user.roomCode,
          username: user.username,
          card,
        },
        (resp) => {
          if (resp.error) {
            return showErrorToast(resp.message);
          }

          console.log("set-card", resp);
          setSelectedCard(null);
          setRound((prevState) => ({
            ...prevState,
            participantCards: {
              ...prevState.participantCards,
              cards: prevState.participantCards.cards.filter(
                (c: any) => c._id !== card._id
              ),
            },
          }));
        }
      );
    }
  };

  useEffect(() => {
    socket?.on("participant-set-card", (resp: any) => {
      showSuccessToast(`${resp} set a card`);
    });
  }, [socket]);

  useEffect(() => {
    // socket called when all players (except de judge) set a card
    socket?.on("select-card", (resp: any) => {
      showSuccessToast(` now, judge will select the winner card`);
      if (isJudge) {
        setCardsToSelect(resp);
      }
    });
  }, [socket, isJudge]);

  useEffect(() => {
    // socket called when judge select the winner card
    socket?.on("winner-card", (resp: any) => {
      showSuccessToast(`winner card: ${resp?.phrase}`);
    });
  }, [socket, isJudge]);

  useEffect(() => {
    // socket called when judge select the winner card
    socket?.on("next-round", (resp: any) => {
      showSuccessToast(`starting next round..`);
    });
  }, [socket]);

  return (
    <div className="grid place-content-center mt-24">
      <RoomGameInfo gameConfig={round.gameConfig} />

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
          ref={dragZoneRef}
          className="h-full border-dotted w-56 border-2 flex justify-center items-center text-white"
        >
          drag zone
        </motion.div>
      </div>

      {/* TODO: move to separate component */}
      <h4 className="text-white text-center">cards</h4>

      <Cards
        cards={isJudge ? cardsToSelect : round.participantCards.cards}
        selectedCard={selectedCard}
        onDrag={verifyIfItemIsInDragZone}
        // onDragStart={() => setIsDragging(true)}
        onDragEnd={(card) => {
          if (isOnDragZone) {
            setSelectedCard(card);

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
                    onClick={() => setCard(card)}
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
          // setIsDragging(false);
        }}
      />

      <Players judge={round.judge} participants={round.participants} />
    </div>
  );
};

export default Room;
