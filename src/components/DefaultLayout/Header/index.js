import React from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { FaBoxTissue, FaArtstation } from "react-icons/fa";
import Sidebar from "../Sidebar";

const cx = classNames.bind(style);
function click() {
  //console.log(1);
}

const Header = () => {
  return (
    <header>
      {/* <Sidebar className={cx("sidebar")} /> */}
      <FaArtstation className={cx("cart")} onClick={click} />
      <img
        src="https://static.vecteezy.com/system/resources/previews/014/971/638/non_2x/food-logo-design-template-restaurant-free-png.png"
        alt=""
      />
      <FaBoxTissue className={cx("cart")} />
    </header>
  );
};

export default Header;
