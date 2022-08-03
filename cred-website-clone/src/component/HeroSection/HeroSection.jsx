import React from "react";
import { Button } from "../Common/Button/Button";
import "./HeroSection.css";
const HeroSection = () => {
  return (
    <div className="hero-section absolute-center max-width">
      <h1 className="hero-heading">rewards for paying credit card bills</h1>
      <h4 className="hero-subheading">
        join 7.5M+ members who win rewards and cashbacks everyday
      </h4>
      <Button text="Download Cred" />
    </div>
  );
};

export default HeroSection;
