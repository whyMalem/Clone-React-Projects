import React from "react";
import { restaurants } from "../../../data/restaurant";
import Explore from "../../Common/Explore/Explore";
import Filter from "../../Common/Filter/Filter";
import DeliveryCollection from "./DeliveryCollection/DeliveryCollection";
import TopBrands from "./TopBrands/TopBrands";

const deliveryFilters = [
  {
    id: 1,
    icon: <i className="fa-solid fa-sliders"></i>,
    title: "Filters",
  },
  {
    id: 2,
    title: "Rating: 4.0+",
  },
  {
    id: 3,
    title: "Safe and Hygienic",
  },
  {
    id: 4,
    title: "Pure Veg",
  },
  {
    id: 5,
    title: "Delivery Time",
    icon: <i className="fi fi-rr-apps-sort absolute-center"></i>,
  },
  {
    id: 6,
    title: "Great Offers",
  },
];

const restaurantList = restaurants;

const Delivery = () => {
  return (
    <div>
      <div className="max-width">
        <Filter filterList={deliveryFilters} />
      </div>
      <DeliveryCollection />
      <TopBrands />
      <Explore
        list={restaurantList}
        collectionName="Delivery Restaurants in Bangalore"
      />
    </div>
  );
};

export default Delivery;
