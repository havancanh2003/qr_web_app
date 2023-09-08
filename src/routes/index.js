import Menu from "../pages/Menu";
import Cart from "../pages/Cart/indexCart";
import PaymentMethod from "../pages/PaymentMethod/index";
import BillHistory from "../pages/BillHistory";
import ShowAll from "../pages/ShowAll";
import Home from "../pages/Home/indexHome";
import { Fragment } from "react";

export const publicRoutes = [
  { path: "/home/:token", component: Home },
  // { path: "/menu", component: Menu },
  { path: "/paymentmethod/:paymentid", component: PaymentMethod, layout: null },
  { path: "/cart", component: Cart, layout: null },

  { path: "/showall", component: ShowAll },

  { path: "/billhistory", component: BillHistory },
  { path: "*", component: Fragment, layout: null },

  //{ path: "/upload", component: Upload, layout: null },
];
