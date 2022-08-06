import React, { useState } from "react";
import "./post.css";
import Comment from "../../../../img/comment.png";
import Share from "../../../../img/share.png";
import Heart from "../../../../img/like.png";
import NotLike from "../../../../img/notlike.png";
import { useSelector } from "react-redux";
import { likePost } from "../../../../api/postRequests";

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const [liked, setLiked] = useState(post.likes.includes(user._id));
  const [likes, setLikes] = useState(post.likes.length);
  const handleLike = () => {
    setLiked((prev) => !prev);
    likePost(post._id, user._id);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };
  return (
    <div className="Post">
      <img
        src={post.image ? process.env.REACT_APP_PUBLIC_FOLDER + post.image : ""}
        alt="post"
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt="reaction"
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img src={Comment} alt="reaction" />
        <img src={Share} alt="reaction" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} liked
      </span>

      <div className="detail">
        <span>
          <b>{post.name}</b>
        </span>
        <span> {post.caption}</span>
      </div>
    </div>
  );
};

export default Post;
