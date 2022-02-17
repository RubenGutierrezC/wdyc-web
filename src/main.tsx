import { render } from "react-dom";
import { SocketProvider } from "./context/SocketContext";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import App from "./App";

render(
  <SocketProvider>
    <App />
    <ToastContainer />
  </SocketProvider>,
  document.getElementById("root")
);
