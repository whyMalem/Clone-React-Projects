import UserModal from "../modals/userModal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    // const { username, password, firstname, lastname } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPass;
    const { username } = req.body;

    // const newUser = new UserModal({
    //   username,
    //   password: hashedPass,
    //   firstname,
    //   lastname,
    // });

    const oldUser = await UserModal.findOne({ username });
    if (oldUser)
      return res.status(400).json({ message: "username is already exists!!" });

    const newUser = new UserModal(req.body);
    const user = await newUser.save();

    // const token = jwt.sign({ username: user.username, id: user._id }, process.env.JWT_KEY, {
    //   expiresIn: "1h",
    // });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModal.findOne({ username });

    if (user) {
      const validity = await bcrypt.compare(password, user.password);

      // validity
      //   ? res.status(200).json(user)
      //   : res.status(400).json("Invalid user or password");
      if (!validity) {
        res.status(400).json("Wrong Password");
      } else {
        const token = jwt.sign(
          { username: user.username, id: user._id },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.status(200).json({ user, token });
      }
    } else {
      res.status(400).json("User doesn't exists");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
