import { FC } from "react";

interface RoomGameInfoProps {
  gameConfig: any;
}

export const RoomGameInfo: FC<RoomGameInfoProps> = ({ gameConfig }) => {
  return (
    <>
      <p className="text-white">
        Numero de rounds: {gameConfig?.numberOfRounds}
      </p>
      <p className="text-white">Ronda: {gameConfig?.actualRound}</p>
    </>
  );
};
