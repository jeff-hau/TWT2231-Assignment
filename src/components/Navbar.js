import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import ReorderIcon from '@mui/icons-material/Reorder';
import "../styles/Navbar.css";

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const location = useLocation();

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar">
      <div className="leftSide" id={openLinks ? "open" : "close"}>
        <img src={Logo} alt="Logo" />
        <div className="hiddenLinks">
          <Link to="/TWT2231-Assignment/" className={isActive("/TWT-Assignment/") ? "active" : ""}> Home </Link>
          <Link to="/map" className={isActive("/map") ? "active" : ""}> Map </Link>
          <Link to="/awareness" className={isActive("/awareness") ? "active" : ""}> Awareness </Link>
          <Link to="/news" className={isActive("/news") ? "active" : ""}> News </Link>
          <Link to="/contact" className={isActive("/contact") ? "active" : ""}> Contact </Link>
        </div>
      </div>
      <div className="rightSide">
        <Link to="/TWT2231-Assignment/" className={isActive("/TWT-Assignment/") ? "active" : ""}> Home </Link>
        <Link to="/TWT2231-Assignment/map" className={isActive("/TWT-Assignment/map") ? "active" : ""}> Map </Link>
        <Link to="/TWT2231-Assignment/awareness" className={isActive("/TWT-Assignment/awareness") ? "active" : ""}> Awareness </Link>
        <Link to="/TWT2231-Assignment/news" className={isActive("/TWT-Assignment/news") ? "active" : ""}> News </Link>
        <Link to="/TWT2231-Assignment/contact" className={isActive("/TWT-Assignment/contact") ? "active" : ""}> Contact </Link>
        <button onClick={toggleNavbar}>
          <ReorderIcon />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
