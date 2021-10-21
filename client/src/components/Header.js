import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../modules/authManager";

const Header = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-info">
      <Link to="/" className="navbar-brand">
       Celestial
      </Link>
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link"
            onClick={logout}>Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
