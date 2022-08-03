import React from "react";
import { Button } from "../Common/Button/Button";
import "./appRating.css";

const getIosPrefix = () => {
  return (
    <img
      src="https://web-images.credcdn.in/_next/assets/images/home-page/apple-store-logo.png"
      alt="app store"
      className="app-rating-icon"
    />
  );
};

const getAndroidPrefix = () => {
  return (
    <img
      src="https://web-images.credcdn.in/_next/assets/images/home-page/play-store-logo.png"
      alt="playstore"
      className="app-rating-icon"
    />
  );
};
const AppRating = () => {
  return (
    <div className="max-width app-rating flex">
      <div className="flex app-rating-block">
        <div className="flex">
          <div className="app-rating-value flex">
            4.8
            <img
              src="https://web-images.credcdn.in/_next/assets/images/home-page/rating-ios.png"
              alt="rating"
              className="app-rating-stars"
            />
          </div>
          <div className="app-rating-platform">
            app <br /> store
          </div>
        </div>
        <div className="non-mobile-view">
          <Button
            prefix={getIosPrefix()}
            text="Download the app"
            customClass="app-rating-button"
          />
        </div>
      </div>
      <div className="flex app-rating-block">
        <div className="flex">
          <div className="app-rating-value flex">
            4.7
            <img
              src="https://web-images.credcdn.in/_next/assets/images/home-page/rating-android.png"
              alt="rating"
              className="app-rating-stars"
            />
          </div>
          <div className="app-rating-platform">
            play <br /> store
          </div>
        </div>
        <div className="non-mobile-view">
          <Button
            prefix={getAndroidPrefix()}
            text="Download the app"
            customClass="app-rating-button"
          />
        </div>
      </div>
      <div className="mobile-view">
        <Button text="Download the app" />
      </div>
    </div>
  );
};

export default AppRating;
