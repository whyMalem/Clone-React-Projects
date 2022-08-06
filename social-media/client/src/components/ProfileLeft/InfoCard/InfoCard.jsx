import React from "react";
import "./infoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import { useState } from "react";
import ProfileModal from "./ProfileModal/ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import * as userApi from "../../../api/userRequests";
import { logout } from "../../../actions/authActions";

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const profileUserId = id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        const User = await userApi.getUser(profileUserId);
        setProfileUser(User);
      }
    };
    fetchProfileUser();
  }, [user]);

  const handleLogOut = () => {
    dispatch(logout());
  };

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <>
            <UilPen
              width="1.2rem"
              style={{ cursor: "pointer" }}
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>

      <button className="btn logout-btn" onClick={handleLogOut}>
        Logout
      </button>
    </div>
  );
};

export default InfoCard;
