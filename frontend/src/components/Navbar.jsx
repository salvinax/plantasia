import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";

function Navbar({ toogleCart, itemNum }) {
  const location = useLocation();
  const navigateTo = useNavigate();
  const [tabName, setTabName] = useState("login");
  const [loggedIn, setLoggedIn] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);

  const handleShopClick = () => {
    if (location.pathname === "/shop") {
      navigateTo("/shop");
      // window.location.reload();
    }
  };

  useEffect(() => {
    if (location.pathname === "/checkout") {
      setHideNavbar(true);
    } else {
      setHideNavbar(false);
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setTabName("me");
      setLoggedIn(true);
    } else {
      setTabName("login");
      setLoggedIn(false);
    }
  });

  return (
    <>
      <nav className={hideNavbar ? "hide-navbar" : "navbar-container"}>
        <Link to="/" className="navbar-logo">
          PLANTASIA
        </Link>
        <Link to="/shop" onClick={handleShopClick} className="navbar-middle">
          shop
        </Link>

        <div className="navbar-right">
          <Link to={loggedIn ? "/account" : "/login"}>{tabName}</Link>
          <div onClick={toogleCart}>({itemNum})</div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
