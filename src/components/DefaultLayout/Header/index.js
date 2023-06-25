import React from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { FaBoxTissue, FaArtstation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(style);

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const table = sessionStorage.getItem("table");
    navigate(`/home/${table}`);
  };

  return (
    <header>
      {/* <Sidebar className={cx("sidebar")} /> */}
      {/* <FaArtstation className={cx("cart")} onClick={click} /> */}
      <img
        src="https://static.vecteezy.com/system/resources/previews/014/971/638/non_2x/food-logo-design-template-restaurant-free-png.png"
        alt=""
        onClick={handleClick}
      />
      {/* <FaBoxTissue className={cx("cart")} /> */}
    </header>
  );
};

export default Header;
