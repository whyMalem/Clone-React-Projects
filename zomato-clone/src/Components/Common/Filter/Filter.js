import React from "react";
import "./filter.css";

const Filter = ({ filterList }) => {
  return (
    <div className="filter">
      {filterList &&
        filterList.map((filter) => {
          return (
            <div key={filter.id} className="filter-item">
              {filter.icon && filter.icon}
              <p className="filter-name">{filter.title}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Filter;
