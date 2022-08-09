import Comment from "../model/commentSchema.js";

export const newComment = async (req, res) => {
  try {
    const comment = await new Comment(req.body);
    // console.log(comment);
    await comment.save();
    res.status(200).json({ msg: "Comment saved successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};

///////////// GET ALL COMMENTS ///////////////////////
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    // console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
};

///////////// DELETE COMMENT ///////////////////////
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    await comment.delete();
    // console.log(comments);
    res.status(200).json("Comment deleted successfully");
  } catch (error) {
    res.status(500).json(error);
  }
};
