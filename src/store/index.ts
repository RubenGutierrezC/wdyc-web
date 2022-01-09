import create from "zustand";

interface Store {
  user: {
    username: string;
    roomCode: string;
  };
  login: (username: string, roomCode: string) => void;
}

const useStore = create<Store>((set) => ({
  user: {
    username: "",
    roomCode: "",
  },
  login: (username, roomCode) => {
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
        },
      };
    });
  },
}));

export default useStore;
