import React from "react";
import { Button } from "../Common/Button/Button";
import "./FeelSpecial.css";

const FeelSpecial = () => {
  return (
    <div className="feel-special photo-section">
      <div className="max-width">
        <div className="photo-section-child">
          <div className="photo-section-top">
            <h1 className="photo-section-heading">feel special more often.</h1>
            <h3 className="photo-section-subheading">
              exclusive rewards for paying your bills
            </h3>
          </div>

          <div className="photo-section-bottom">
            <p className="photo-section-description">
              every time you pay your credit card bills on CRED, you receive
              CRED coins. you can use these to win exclusive rewards or get
              special access to curated products and experiences. on CRED, good
              begets good.
            </p>
          </div>

          <div className="photo-section-button">
            <Button text="Explore rewards" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeelSpecial;
