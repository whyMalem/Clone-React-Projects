import React from "react";
import "./postShare.css";
// import ProfileImage from "../../../img/profileImg.jpg";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
} from "@iconscout/react-unicons";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../../actions/uploadAction";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const desc = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { uploading } = useSelector((state) => state.uploadReducer);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // console.log(user._id);

  function onImageChange(e) {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      // setImage({
      //   image: URL.createObjectURL(img),
      // });
      setImage(img);
    }
  }

  function reset() {
    setImage(null);
    desc.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newPost = {
      userId: user._id,
      caption: desc.current.value,
    };

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newPost.image = filename;
      console.log(newPost);
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(uploadPost(newPost));
    reset();
  }

  return (
    <div className="PostShare">
      <img
        src={
          user?.profilePicture
            ? serverPublic + user.profilePicture
            : serverPublic + "defaultProfile.png"
        }
        alt="profile"
      />
      <div>
        <input type="text" placeholder="What's happening" ref={desc} required />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery /> Photo
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle /> Video
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint /> Location
          </div>
          <div className="option" style={{ color: "var(--shedule)" }}>
            <UilSchedule /> Schedule
          </div>
          <button
            className="btn s-btn"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="post" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostShare;
