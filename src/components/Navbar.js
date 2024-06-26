import React from "react";
import { Link, useLocation } from "react-router-dom";
// import {useNavigate} from "react-router-dom"
export default function Navbar() {
  const location = useLocation();
  // const isAuthenticated = localStorage.getItem("token");
  // let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary ">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
             <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {}
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/home" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
            </ul>

               

              {
                localStorage.getItem("token")===null?<div className="d-flex">
                <div className="mx-3">
                  <Link className="btn btn-primary" to="/" role="button">
                    Login-In
                  </Link>
                </div>
                <Link className="btn btn-primary" to="/signup" role="button">
                  Sign-Up
                </Link>
              </div>:<Link className="btn btn-primary" to="/" onClick={handleLogout}role="button">
                  Log-out
                </Link>
              }
            
          </div>
        </div>
      </nav>
    </>
  );
}
