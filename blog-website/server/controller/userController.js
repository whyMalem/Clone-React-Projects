import UserModel from "../model/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import token from "../model/tokenSchema.js";

/////////////// SIGNUP ///////////////////////
export const signUpUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newUser = new UserModel(req.body);
    await newUser.save();
    return res.status(200).json({ msg: "Signup successfully" });
  } catch (error) {
    res.status(404).json({ msg: "Error while signup" });
  }
};

/////////////// LOGIN ///////////////////////
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // console.log(req.body);
    const user = await UserModel.findOne({ username });
    // console.log(user);
    if (!user) return res.status(400).json({ msg: "User didn't exist!!" });

    let comparePassword = await bcrypt.compare(password, user.password);
    // console.log(comparePassword);
    if (!comparePassword) {
      return res.status(400).json({ msg: "Invalid login!!" });
    }

    const accessToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { username: user.username, id: user._id },
      process.env.REFRESH_SECRET_KEY
    );

    const newToken = new token({ token: refreshToken });
    await newToken.save();

    return res.status(200).json({
      accessToken,
      refreshToken,
      name: user.name,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error while signup" });
  }
};
