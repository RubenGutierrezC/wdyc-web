import { DefaultGenerics, ReactLocation, Route, Router } from "react-location";
import Login from "./pages/Login";
import WaitRoom from "./pages/WaitRoom";
import Room from "./pages/Room";

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

const Routes = () => {
  return <Router location={location} routes={routes}></Router>;
};

export default Routes;
