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
          <Link to="/star/create" className="nav-link">
            Create a Star
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/planet/create" className="nav-link">
            Create a Planet
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/moon/create" className="nav-link">
            Create a Moon
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
