import { useNavigate } from "react-location";
import useStore from "../../store/index";
import useLoading from "../useLoading";
import { CreateRoomResponse } from "../../interfaces/sockets/loginSocket-interfaces";
import useToast from "../useToast";
import useSocketContext from "../useSocketContext";

const useLogin = () => {
  // hooks
  const navigate = useNavigate();
  const { socket } = useSocketContext();
  const login = useStore((state) => state.login);
  const { showErrorToast } = useToast();

  // state
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleCreateRoom = ({ username = " " }) => {
    const data = { username };

    if (socket) {
      startLoading();
      socket.emit("create-room", data, (resp: CreateRoomResponse) => {
        // TODO: standarize catch response error
        if (resp.error) {
          return showErrorToast(resp.message);
        }

        if (resp.data) {
          login(username, resp.data.roomCode);
          navigate({ to: "/wait" });
        }

        stopLoading();
      });
    } else {
      // TODO: estandarize no connect message
      showErrorToast("connection problem");
    }
  };

  const handleJoinRoom = ({ roomCode = "", username = "" }) => {
    const data = { roomCode, username };

    if (socket) {
      startLoading();
      socket?.emit("join-room", data, (resp: any) => {
        if (resp.error) {
          return showErrorToast(resp.message);
        }
        console.log(resp);
        login(username, roomCode);
        navigate({ to: "/wait" });
        stopLoading();
      });
    } else {
      // TODO: estandarize no connect message
      showErrorToast("connection problem");
    }
  };

  return {
    handleCreateRoom,
    handleJoinRoom,
    isLoading,
  };
};

export default useLogin;
