import { render } from "react-dom";
import { SocketProvider } from "./context/SocketContext";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import Routes from "./Routes";

render(
  <SocketProvider>
    <Routes>
      <App />
    </Routes>
  </SocketProvider>,
  document.getElementById("root")
);
