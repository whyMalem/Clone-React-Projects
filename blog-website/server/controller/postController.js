import Post from "../model/postSchema.js";

export const createPost = async (req, res) => {
  try {
    const post = await new Post(req.body);
    await post.save();
    return res.status(200).json("Post saved successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};

///////////// GET ALL POSTS ////////////////////
export const getAllPosts = async (req, res) => {
  const category = req.query.category;
  let posts;
  try {
    if (category) {
      posts = await Post.find({ categories: category });
    } else {
      posts = await Post.find({});
    }
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

///////////// GET POST BY ID ////////////////////
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

///////////// UPDATE POST ////////////////////
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });

    return res
      .status(200)
      .json({ message: "Post has been updated successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

///////////// DELETE POST ////////////////////
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    await post.delete();

    return res
      .status(200)
      .json({ message: "Post has been deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};
