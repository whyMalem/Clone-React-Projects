import React from "react";
// import { PostsData } from "../../../data/PostsData";
import Post from "./Post/Post";
import "./posts.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getTimelinePosts } from "../../../actions/postActions";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.uploadReducer);
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts) return "NO POSTS";

  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post key={id} post={post} />;
          })}
    </div>
  );
};

export default Posts;
