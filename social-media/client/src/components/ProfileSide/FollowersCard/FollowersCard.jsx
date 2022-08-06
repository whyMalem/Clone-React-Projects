import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../api/userRequests";
// import { Followers } from "../../../data/FollowersData";
import User from "../../User/User";
import "./followersCard.css";

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
      console.log(data);
    };

    fetchPersons();
  }, []);

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      {persons.map((person, ind) => {
        if (person._id !== user._id) {
          return <User person={person} key={ind} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
