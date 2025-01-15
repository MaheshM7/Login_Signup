import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

const Header = () => {
  const loggedInUser = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
  const username = loggedInUser ? loggedInUser.username : "Guest";

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="logo">ReviewApp</h1>

        <nav className="nav">
          <Link to="/reviews" className="nav-link">
            All Reviews
          </Link>
          <Link to="/profile" className="nav-link">
            Profile
          </Link>
        </nav>

        <div className="user-info">
          <span>Welcome, {username}!</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
