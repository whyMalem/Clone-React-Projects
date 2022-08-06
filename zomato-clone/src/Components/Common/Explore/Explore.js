import React from "react";
import Card from "./Card/Card";
import "./explore.css";
const Explore = ({ list, collectionName }) => {
  return (
    <div className="max-width explore-section">
      <p className="collection-title">{collectionName}</p>
      <div className="explore-grid">
        {list.map((restaurant, ind) => {
          return <Card key={ind} restaurant={restaurant} />;
        })}
      </div>
    </div>
  );
};

export default Explore;
