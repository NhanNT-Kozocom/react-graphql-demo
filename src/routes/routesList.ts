import { ReactElement } from "react";
import { ROUTE } from "../constants/routesPath";
import { CreateAuthor, DetailAuthor, EditAuthor, ListAuthor } from "../pages";

interface IRoutes {
  path: string;
  auth: boolean;
  component: () => ReactElement;
}

const routesList: Array<IRoutes> = [
  {
    path: ROUTE.AUTHOR.LIST,
    auth: false,
    component: ListAuthor,
  },
  {
    path: ROUTE.AUTHOR.CREATE,
    auth: false,
    component: CreateAuthor,
  },
  {
    path: ROUTE.AUTHOR.DETAIL,
    auth: false,
    component: DetailAuthor,
  },
  {
    path: ROUTE.AUTHOR.EDIT,
    auth: false,
    component: EditAuthor,
  },
];

export default routesList;
