const mockParticipants = [
  { id: 1, username: "juan" },
  { id: 2, username: "juan" },
  { id: 3, username: "juan" },
];

const WaitRoom = () => {
  const handleInitGame = () => {
    // socket login
    console.log("init game");
  };

  const handleLogout = () => {
    // socket login
    console.log("logout");
  };

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
            {mockParticipants.map((part) => (
              <li className="my-3" key={part.id}>
                {part.username}
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
