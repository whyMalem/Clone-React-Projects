import expres from "express";
import {
  deleteUser,
  followUser,
  getAllUser,
  getUser,
  UnfollowUser,
  updateUser,
} from "../controller/userController.js";
import authMiddleWare from "../middleware/authMiddleWare.js";
const router = expres.Router();

// router.get("/", (req, res) => {
//   res.send("Auth route");
// });
router.get("/", getAllUser);
router.get("/:id", getUser);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, UnfollowUser);
export default router;
