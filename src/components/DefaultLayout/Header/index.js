import React from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { FaBoxTissue, FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const cx = classNames.bind(style);
function click() {
  //console.log(1);
}

const Header = () => {
  return (
    <header>
      {/* <Sidebar className={cx("sidebar")} /> */}
      <Link to={""}>
        <FaChevronLeft className={cx("cart")} onClick={click} />
      </Link>
      <Link to={"/"}>
        <img
          src="https://static.vecteezy.com/system/resources/previews/014/971/638/non_2x/food-logo-design-template-restaurant-free-png.png"
          alt=""
        />
      </Link>
      <Link to={"/cart"}>
        <FaBoxTissue className={cx("cart")} />
      </Link>
    </header>
  );
};

export default Header;
