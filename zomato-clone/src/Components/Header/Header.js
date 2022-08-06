import React from "react";
import "./header.css";
const Header = () => {
  return (
    <div className="max-width header">
      <img
        src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
        alt="Zomato-logo"
        className="header-logo"
      />

      <div className="header-right">
        <div className="header-loction-search-container">
          <div className="location-wrapper absolute-center">
            <div className="location-icon-name">
              <i className="fa-solid fa-location-dot location-icon"></i>
              <p className="location-name">Bangalore</p>
            </div>
            <i className="fa-solid fa-caret-down"></i>
          </div>

          <div className="location-search-separator"></div>

          <div className="search-wrapper absolute-center">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              type="text"
              placeholder="Search for restaurant, cusine or a dish"
              className="search-input"
            />
          </div>
        </div>

        <div className="profile-wrapper absolute-center">
          <img
            src="https://b.zmtcdn.com/images/user_avatars/mug_2x.png?fit=around%7C100%3A100&crop=100%3A100%3B%2A%2C%2A"
            alt="Profile"
            className="header-profile-image"
          />
          <span className="header-username">Lorem</span>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
