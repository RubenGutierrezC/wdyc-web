import useStore from "../store";

const Room = () => {
  const user = useStore((store) => store.user);

  console.log("user logged", user);

  return <div></div>;
};

export default Room;
