import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { SocketProvider } from "./context/SocketContext";

render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  document.getElementById("root")
);
