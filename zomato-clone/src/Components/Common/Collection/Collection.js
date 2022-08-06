import React from "react";
import "./Collection.css";
import Slider from "react-slick";
import NextArrow from "../Carousel/NextArrow";
import PrevArrow from "../Carousel/PrevArrow";

const settings = {
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const Collection = ({ list }) => {
  return (
    <div className="collection-wrapper">
      <div className="max-width collection">
        <h1 className="collection-title">Collections</h1>
        <div className="collection-subtitle-row">
          <p className="collection-subtitle-text">
            Explore curated lists of top restaurants, cafes, pubs, and bars in
            Bengaluru, based on trends
          </p>
          <div className="collection-location">
            <p>All Collections in Bangalore</p>
            <i className="fa-solid fa-caret-right"></i>
          </div>
        </div>

        <Slider {...settings}>
          {list.map((item) => {
            return (
              <div key={item.id}>
                <div className="collection-cover">
                  <img
                    src={item.cover}
                    alt={list.title}
                    className="collection-image"
                  />
                  <div className="gradient-bg"></div>
                  <h3 className="collection-card-title">{item.title}</h3>
                  <div className="collection-card-subtitle">
                    <p>{item.places}</p>
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default Collection;
