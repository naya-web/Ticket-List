import React from "react";
import "./NavbarStyle.css";
import search from "../../../assets/icons/search.svg";
import filter from "../../../assets/icons/filter.svg";
import notification from "../../../assets/icons/notification.svg";
import user from "../../../assets/icons/user.svg";

function Navbar() {
  return (
    <>
      <div className="nav-bar">
        <div className="left-nav">
          <h1 className="nav-title">Ticket List</h1>
          <div className="search-filte-container">
            <div className="search">
              <input type="search" placeholder="Search" />
              <img src={search} alt="" />
            </div>
            <div className="filter">
              <img src={filter} alt="" />
            </div>
          </div>
        </div>
        <div className="nav-right">
          <div className="notification">
            <img src={notification} alt="" />
          </div>
          <div className="user">
            <img src={user} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
