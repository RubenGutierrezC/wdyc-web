import { Icon } from "@iconify/react";
import { FC } from "react";

interface PlayersProps {
  participants: any[];
  judge: any;
}

export const Players: FC<PlayersProps> = ({ participants, judge }) => {
  return (
    <div className="flex gap-3 mt-10">
      {participants?.map((user: any) => {
        const isJudge = judge?.username === user?.username;

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

            <p className={"text-sm text-white" + (isJudge && " text-red-500")}>
              {user?.username}
            </p>
          </div>
        );
      })}
    </div>
  );
};
