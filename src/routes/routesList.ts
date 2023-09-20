import { ReactElement } from "react";
import { ROUTE } from "../constants/routesPath";
import { Home } from "../pages";

interface IRoutes {
  path: string;
  auth: boolean;
  component: () => ReactElement;
}

const routesList: Array<IRoutes> = [
  {
    path: ROUTE.HOME,
    auth: false,
    component: Home,
  },
];

export default routesList;
