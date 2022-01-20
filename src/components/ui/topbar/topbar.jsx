import React from "react";

const TopBar = () => {
  return (
    <>
      <div className="header">
        <div className="header-left">
          <a href="index.html" className="logo">
            {/* <img src="assets/img/logo.png" alt="Logo" /> */}
            Logo
          </a>
        </div>

        <a href="javascript:void(0);" id="toggle_btn">
          <i className="fas fa-bars"></i>
        </a>
        <a className="mobile_btn" id="mobile_btn">
          <i className="fas fa-bars"></i>
        </a>

        <ul className="nav nav-tabs user-menu">
          <li className="nav-item dropdown has-arrow flag-nav">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
            >
              {/* <img src="assets/img/flags/us.png" alt="" height="20" /> */}
              <span>English</span>
            </a>
          </li>

          <li className="nav-item dropdown has-arrow main-drop">
            <a
              href="#"
              className="dropdown-toggle nav-link"
              data-bs-toggle="dropdown"
            >
              <span className="user-img">
                {/* <img src="assets/img/profiles/avatar-01.jpg" alt="" /> */}
                <span className="status online"></span>
              </span>
              <span>Admin</span>
            </a>
            <div className="dropdown-menu">
              <a className="dropdown-item" href="profile.html">
                <i data-feather="user" className="me-1"></i> Profile
              </a>
              <a className="dropdown-item" href="settings.html">
                <i data-feather="settings" className="me-1"></i> Settings
              </a>
              <a className="dropdown-item" href="login.html">
                <i data-feather="log-out" className="me-1"></i> Logout
              </a>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};
export default TopBar;
