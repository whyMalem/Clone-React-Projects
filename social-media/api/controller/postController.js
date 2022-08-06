import mongoose from "mongoose";
import PostModal from "../modals/postModal.js";
import UserModal from "../modals/userModal.js";

// create new post
export const createPost = async (req, res) => {
  const newPost = new PostModal(req.body);
  try {
    const newData = await newPost.save();
    res.status(200).json(newData);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get a post
export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await PostModal.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModal.findById(postId);
    if (userId === post.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete post
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModal.findById(id);
    if (userId === post.userId) {
      await post.deleteOne();
      res.status(200).json("Post has been deleted");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like/dislike a post
export const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModal.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked!");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get timeline posts
export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentUserPost = await PostModal.find({ userId });
    const followingPosts = await UserModal.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPost
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
