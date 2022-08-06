import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../../../actions/uploadAction";
import { updateUser } from "../../../../actions/userAction";
const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      e.target.name === "profilePicture"
        ? setProfilePicture(img)
        : setCoverPicture(img);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = formData;
    if (profilePicture) {
      const data = new FormData();
      const filename = Date.now() + profilePicture.name;
      data.append("name", filename);
      data.append("file", profilePicture);
      userData.profilePicture = filename;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverPicture) {
      const data = new FormData();
      const fileName = Date.now() + coverPicture.name;
      data.append("name", fileName);
      data.append("file", coverPicture);
      userData.coverPicture = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser(params.id, userData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={handleChange}
            value={formData.firstname}
          />
          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={handleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={handleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="livesin"
            placeholder="Lives in"
            onChange={handleChange}
            value={formData.livesin}
          />
          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            placeholder="RelationShip Status"
            onChange={handleChange}
            value={formData.relationship}
            name="relationship"
          />
        </div>

        <div>
          Profile Image
          <input
            type="file"
            onChange={onImageChange}
            name="profilePicture"
            style={{ cursor: "pointer" }}
          />
          Cover Image
          <input
            type="file"
            onChange={onImageChange}
            name="coverPicture"
            style={{ cursor: "pointer" }}
          />
        </div>

        <button className="btn info-btn" onClick={handleSubmit}>
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
