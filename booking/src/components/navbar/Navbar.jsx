import React, { useContext } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const logoutHandler = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo"> Booking</span>
        </Link>

        <div className="navItems">
          {!user ? (
            <button className="navButton">Register</button>
          ) : (
            user.username
          )}
          {user ? (
            <Link to="/">
              <button className="navButton" onClick={logoutHandler}>
                Logout
              </button>
            </Link>
          ) : (
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
