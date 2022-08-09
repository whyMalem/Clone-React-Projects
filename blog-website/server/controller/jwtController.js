import jwt from "jsonwebtoken";

export const verify = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ msg: "Token is missing" });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ msg: "Invalid Token" });
    }
    req.user = user;
    next();
  });
};
