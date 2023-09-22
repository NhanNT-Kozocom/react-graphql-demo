import { ReactElement } from "react";
import { ROUTE } from "../constants/routesPath";
import { CreateAuthor, Home } from "../pages";

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
  {
    path: ROUTE.CREATE_AUTHOR,
    auth: false,
    component: CreateAuthor,
  },
];

export default routesList;
