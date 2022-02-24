import { render } from "react-dom";
import { SocketProvider } from "./context/SocketContext";
import "./index.css";

import App from "./App";

render(
  <SocketProvider>
    <App />
  </SocketProvider>,
  document.getElementById("root")
);
