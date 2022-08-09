import express from "express";
import {
  deleteComment,
  getAllComments,
  newComment,
} from "../controller/commentController.js";
import { verify } from "../controller/jwtController.js";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
} from "../controller/postController.js";
import { uploadImage, getImage } from "../controller/uploadController.js";
import { loginUser, signUpUser } from "../controller/userController.js";
import upload from "../utils/upload.js";
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
router.post("/create", verify, createPost);
router.get("/posts", verify, getAllPosts);
router.get("/post/:id", verify, getPostById);
router.put("/update/:id", verify, updatePost);
router.delete("/delete/:id", verify, deletePost);
router.post("/comment/new", verify, newComment);
router.get("/comments/:id", verify, getAllComments);
router.delete("/comment/delete/:id", verify, deleteComment);

export default router;
