import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import ProfileCard from "../../components/ProfileSide/ProfileCard/ProfileCard";
import RightSide from "../../components/RightSide/RightSide";
import "./profile.css";
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />

      <div className="Profile-center">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>

      <RightSide />
    </div>
  );
};

export default Profile;
