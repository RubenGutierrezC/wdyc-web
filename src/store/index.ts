import create from "zustand";
import { devtools } from "zustand/middleware";
interface Store {
  user: {
    username: string;
    roomCode: string;
    redirectTo: string;
  };
  login: (username: string, roomCode: string, redirectTo?: string) => void;
}

const useStore = create<Store>(
  devtools((set) => ({
    user: {
      username: "",
      roomCode: "",
      redirectTo: "",
    },
    login: (username, roomCode, redirectTo = "") => {
      set((state) => {
        window.localStorage.setItem(
          "user",
          JSON.stringify({ username, roomCode })
        );
        return {
          ...state,
          user: {
            username,
            roomCode,
            redirectTo,
          },
        };
      });
    },
  }))
);

export default useStore;
