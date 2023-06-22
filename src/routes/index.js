import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import Detail from "../pages/Detail";
import ShowSearchFood from "../pages/ShowSearchFood";
import Home from "./../pages/Home";
import { Fragment } from "react";

export const publicRoutes = [
  { path: "/", component: Home, layout: null },
  { path: "/menu", component: Menu },
  { path: "/cart", component: Cart },
  { path: "/searchfood", component: ShowSearchFood },
  { path: "/detail", component: Detail },
  { path: "*", component: Fragment, layout: null },
  //{ path: "/upload", component: Upload, layout: null },
];
