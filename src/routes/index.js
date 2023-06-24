import Menu from "../pages/Menu";
import Cart from "../pages/Cart/indexCart";
import Detail from "../pages/Detail";
import ShowSearchFood from "../pages/ShowSearchFood";
import Home from "../pages/Home/indexHome";
import { Fragment } from "react";

export const publicRoutes = [
  { path: "/home/:table", component: Home, layout: null },
  { path: "/menu", component: Menu },
  { path: "/cart", component: Cart, layout:null },
  { path: "/searchfood", component: ShowSearchFood },
  { path: "/detail", component: Detail },
  { path: "*", component: Fragment, layout: null },
  //{ path: "/upload", component: Upload, layout: null },
];
