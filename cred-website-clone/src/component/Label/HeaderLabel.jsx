import React from "react";
import "./headerLabel.css";
const HeaderLabel = () => {
  return (
    <div className="header-label absolute-center">
      <span className="label">
        pay credit card bill, earn guranteed ₹200 back.
      </span>
      <span className="claim-anchor aboslute-center">
        claim now
        <img
          src="https://web-images.credcdn.in/_next/assets/images/home-page/arrow.png"
          alt="arrow"
          className="claim-arrow"
        />
      </span>
    </div>
  );
};

export default HeaderLabel;
