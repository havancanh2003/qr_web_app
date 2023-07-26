import React from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
// import { FaBoxTissue, FaArtstation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
  


const cx = classNames.bind(style);

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = sessionStorage.getItem("token");
    navigate(`/home/${token}`);
  };

  return (
    <header>

      <img
        src="https://static.vecteezy.com/system/resources/previews/014/971/638/non_2x/food-logo-design-template-restaurant-free-png.png"
        alt="Logo"
        onClick={handleClick}
      />
      
    </header>
  );
};

export default Header;
