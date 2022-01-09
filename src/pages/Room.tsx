import useStore from "../store";

const Room = () => {
  const user = useStore((store) => store.user);

  console.log("user logged", user);

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
        ></div>
      </div>
    </div>
  );
};

export default Room;
