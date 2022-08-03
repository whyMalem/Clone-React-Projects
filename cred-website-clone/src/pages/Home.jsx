import React from "react";
import AppRating from "../component/AppRating/AppRating";
import BrandsLove from "../component/BrandsLove/BrandsLove";
import CredExperience from "../component/CredExperience/CredExperience";
import CredSecurity from "../component/CredSecurity/CredSecurity";
import CredStory from "../component/CredStory/CredStory";
import FeelSpecial from "../component/FeelSpecial/FeelSpecial";
import Footer from "../component/Footer/Footer";
import Header from "../component/Header/Header";
import HeroSection from "../component/HeroSection/HeroSection";
import HeaderLabel from "../component/Label/HeaderLabel";
import MobileScroll from "../component/MobileScroll/MobileScroll";
import ProductShowcase from "../component/ProductShowcase/ProductShowcase";
import WindowPeak from "../component/WindowPeak/WindowPeak";

const Home = () => {
  return (
    <>
      <Header />
      <HeaderLabel />
      <HeroSection />
      <ProductShowcase />
      <FeelSpecial />
      <BrandsLove />
      <CredExperience />
      <CredSecurity />
      <MobileScroll />
      <div className="non-mobile-view">
        <WindowPeak />
      </div>
      <CredStory />
      <AppRating />
      <Footer />
    </>
  );
};

export default Home;
