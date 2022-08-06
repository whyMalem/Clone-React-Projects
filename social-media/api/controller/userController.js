import UserModal from "../modals/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// get All user
export const getAllUser = async (req, res) => {
  try {
    let users = await UserModal.find();
    users = users.map((user) => {
      const { password, ...others } = user._doc;
      return others;
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a user
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModal.findById(id);

    if (user) {
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } else {
      res.status(404).json("User doesn't exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;

  if (id === _id || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModal.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      // const { password, ...others } = user._doc;
      const token = jwt.sign(
        { username: user.username, id: user._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied!! You can only update your account");
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModal.findByIdAndDelete(id);
      res.status(200).json("Sucessfully deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied!! You can only update your account");
  }
};

//Follow a user
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action forbiddden");
  } else {
    try {
      const followUser = await UserModal.findById(id);
      const followingUser = await UserModal.findById(_id);

      if (!followUser.followers.includes(_id)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("User is already followed");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//Unfollow a user
export const UnfollowUser = async (req, res) => {
  const id = req.params.id;
  const { _id } = req.body;

  if (_id === id) {
    res.status(403).json("Action forbiddden");
  } else {
    try {
      const followUser = await UserModal.findById(id);
      const followingUser = await UserModal.findById(_id);

      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User is unfollowed");
      } else {
        res.status(403).json("User is not followed");
      }
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
};
