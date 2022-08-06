import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    caption: String,
    likes: [],
    image: String,
  },
  { timestamps: true }
);

const PostModal = mongoose.model("post", postSchema);

export default PostModal;
