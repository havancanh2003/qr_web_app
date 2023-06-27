import Menu from "../pages/Menu";
import Cart from "../pages/Cart/indexCart";
import Detail from "../pages/Detail";
import ShowAll from "../pages/ShowAll";
import Home from "../pages/Home/indexHome";
import { Fragment } from "react";

export const publicRoutes = [
  { path: "/home/:table", component: Home, layout: null },
  { path: "/menu", component: Menu },
  { path: "/cart", component: Cart, layout:null },
  { path: "/showall", component: ShowAll,layout:null },
  { path: "/detail", component: Detail },
  { path: "*", component: Fragment, layout: null },
  //{ path: "/upload", component: Upload, layout: null },
];
