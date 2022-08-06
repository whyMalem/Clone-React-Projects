import expres from "express";
import { loginUser, registerUser } from "../controller/authController.js";
const router = expres.Router();

// router.get("/", (req, res) => {
//   res.send("Auth route");
// });
router.post("/register", registerUser);
router.post("/login", loginUser);
export default router;
