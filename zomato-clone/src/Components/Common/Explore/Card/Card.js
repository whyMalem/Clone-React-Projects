import React from "react";
import "./card.css";
const Card = ({ restaurant }) => {
  const name = restaurant?.info?.name ?? "";
  const coverImg = restaurant?.info?.image?.url;
  const deliveryTime = restaurant?.order?.deliveryTime;
  const rating = restaurant?.info?.rating?.rating_text;
  const approxPrice = restaurant?.info?.cfo?.text;
  const offers = restaurant?.bulkOffers ?? [];
  const cuisines = restaurant?.info?.cuisine
    ?.map((item) => item.name)
    .slice(0, 3);
  const bottomContainers = restaurant?.bottomContainers;
  const goldOffers = restaurant?.gold?.text;
  const proOffers = offers.length > 1 ? offers[0].text : null;
  // const discount = offers.length > 1 ? offers[1].text : offers[0].text;
  const discount =
    offers.length > 1
      ? offers[1].text
      : offers.length === 1
      ? offers[0].text
      : null;

  return (
    <div className="explore-card cur-po">
      <div className="explore-card-cover">
        <img src={coverImg} alt={name} className="explore-card-image" />
        <span className="delivery-time">{deliveryTime}</span>
        {proOffers && <span className="pro-off">{proOffers}</span>}
        {goldOffers && <span className="gold-off">{goldOffers}</span>}
        {discount && <span className="discount">{discount}</span>}
      </div>

      <div className="res-row">
        <div className="res-name">{name}</div>
        {rating && (
          <div className="res-rating">
            {rating} <i className="fa-solid fa-star absolute-center"></i>
          </div>
        )}
      </div>

      <div className="res-row">
        {cuisines.length && (
          <div className="res-cuisine">
            {cuisines.map((item, i) => {
              return (
                <span className="res-cuisine-tag" key={i}>
                  {item}
                  {i !== cuisines.length - 1 && ","}
                </span>
              );
            })}
          </div>
        )}
        {approxPrice && <div className="res-price">{approxPrice}</div>}
      </div>

      {bottomContainers.length > 0 && (
        <div>
          <div className="card-seprator"></div>
          <div className="explore-bottom">
            <img
              src={bottomContainers[0]?.image?.url}
              alt={bottomContainers[0]?.text}
              style={{ height: "16px" }}
            />
            <p className="res-bottom-text">{bottomContainers[0]?.text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
