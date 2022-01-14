import { useState } from "react";

import useLogin from "../hooks/pages/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [roomCode, setRoomCode] = useState("");

  const { handleJoinRoom, handleCreateRoom, isLoading } = useLogin();

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
            Login
          </div>

          <div className="">
            <div className="flex flex-col mb-5">
              <label
                htmlFor="email"
                className="-1 text-xs tracking-wide text-gray-600"
              >
                Username
              </label>
              <div className="lative">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  id="email"
                  type="email"
                  name="email"
                  className="                   text-sm
                    placeholder-gray-500
                    pl-5
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <button
                onClick={() => handleCreateRoom({ username })}
                disabled={!username || isLoading}
                type="submit"
                className="
                  flex
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
                  ease-in
                "
              >
                Create room
              </button>
            </div>

            <hr className="my-10" />

            <div>
              <p className="text-gray-800 mb-8 text-center font-bold">
                Or Join by code!
              </p>
              <div className="flex flex-col mb-5">
                <label
                  htmlFor="email"
                  className="-1 text-xs tracking-wide text-gray-600"
                >
                  Room code
                </label>
                <div className="lative">
                  <input
                    onChange={(e) => setRoomCode(e.target.value)}
                    id="email"
                    type="email"
                    name="email"
                    className="                   text-sm
                    placeholder-gray-500
                    pl-5
                    pr-4
                    rounded-2xl
                    border border-gray-400
                    w-full
                    py-2
                    focus:outline-none focus:border-blue-400
                  "
                    placeholder="Room code"
                  />
                </div>
              </div>
              <button
                onClick={() => handleJoinRoom({ roomCode, username })}
                disabled={!roomCode || !username || isLoading}
                type="submit"
                className="
                  flex
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
                  ease-in
                "
              >
                Join room
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
