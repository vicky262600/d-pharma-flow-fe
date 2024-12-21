import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import "./Navbar.css";

const Navbar = () => {
  const { logout, user } = usePrivy();

  const handleLogout = () => {
    logout();
    console.log("User logged out");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>D-Pharma</h1>
      </div>
      <div className="navbar-links">
        {user ? (
          <>
            <span className="navbar-user">Welcome, {user.email || "User"}</span>
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <span className="navbar-login-prompt">Not logged in</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
