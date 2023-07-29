import React from "react";
import style from "./Header.module.scss";
import classNames from "classnames/bind";
// import { FaBoxTissue, FaArtstation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/image/logo192.png"


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
        src={logo}
        alt="Logo"
        onClick={handleClick}
      />
      
    </header>
  );
};

export default Header;
