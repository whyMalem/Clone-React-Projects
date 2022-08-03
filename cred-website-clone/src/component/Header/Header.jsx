import React, { useState } from "react";
import "./header.css";
import Menu from "../../assets/hamburger.png";
const Header = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const logo =
    "https://web-images.credcdn.in/_next/assets/images/home-page/cred-logo.png";
  return (
    <div className="max-width header absolute-center">
      <div className="brand-logo">
        <img src={logo} alt="logo" className="logo-image" />
      </div>

      <div className="non-mobile-view header-navLinks absolute-center ">
        <h4 className="header-navLink">credit score check</h4>
        <h4 className="header-navLink">credit card bill payment</h4>
      </div>

      <div className="mobile-view header-mobile">
        <div className="hamburger" onClick={handleSidebar}>
          <img src={Menu} alt="hamburger" className="hamburger-menu" />
        </div>

        <div className={showSidebar ? `sidebar show-sidebar` : `sidebar`}>
          <div className="sidebar-navLinks">
            <div className="sidebar-navLink">credit score check</div>
            <div className="sidebar-navLink">credit card bill payment</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
