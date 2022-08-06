import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/userRequests";
import "./Conversation.css";

const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);

  return (
    <>
      <div className="follower conversation">
        <div>
          {online && <div className="online-dot"></div>}
          <img
            src={
              userData?.profilePicture
                ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
            }
            alt="profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="name" style={{ fontSize: ".8rem" }}>
            <span>
              {userData?.firstname} {userData?.lastname}
            </span>
            {online ? <span>Online</span> : <span>Offline</span>}
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: ".1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
