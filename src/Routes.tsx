import { DefaultGenerics, ReactLocation, Route, Router } from "react-location";
import Login from "./pages/Login";
import WaitRoom from "./pages/WaitRoom";
import Room from "./pages/Room";
import useStore from "./store/index";
import { FC } from "react";

const location = new ReactLocation();

const routes: Route<DefaultGenerics>[] = [
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/wait",
    element: <WaitRoom />,
  },
  {
    path: "/room",
    element: <Room />,
  },
  {
    path: "/*",
    element: <Login />,
  },
];

const Routes: FC = ({ children }) => {
  return (
    <Router location={location} routes={routes}>
      {children}
    </Router>
  );
};

export default Routes;
