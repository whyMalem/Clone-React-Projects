import { Box, Button, styled, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../api/api";
import Comment from "./Comment";

const Container = styled(Box)`
  margin-top: 100px;
  display: flex;
`;

const Image = styled("img")({
  width: "50px",
  height: "50px",
  borderRadius: "50%",
});

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
  height: "100px",
  width: "100%",
  margin: "0 20px",
  padding: "7px",
  [theme.breakpoints.down("sm")]: {
    height: "30px",
  },
}));

const Comments = ({ post }) => {
  const [comment, setComment] = useState({
    name: "",
    postId: "",
    comments: "",
    date: new Date(),
  });
  const [comments, setComments] = useState([]);
  const [toggle, setToggle] = useState(false);

  const { admin } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data);
      }
    };

    getData();
  }, [toggle, post]);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: admin.username,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const handleComment = async () => {
    const response = await API.newComment(comment);
    if (response.isSuccess) {
      setComment({
        name: "",
        postId: "",
        comments: "",
        date: new Date(),
      });
    }

    setToggle((prev) => !prev);
  };

  const url = "https://static.thenounproject.com/png/12017-200.png";
  return (
    <Box style={{ padding: "0 10px", marginBottom: "20px" }}>
      <Container>
        <Image src={url} alt="user-logo" />
        <StyledTextArea
          minRows={3}
          placeholder="What's on your mind?"
          onChange={handleChange}
          value={comment.comments}
        />
        <Button
          variant="contained"
          color="primary"
          size="medium"
          style={{ height: "40px" }}
          onClick={handleComment}
        >
          Post
        </Button>
      </Container>
      <Box>
        {comments?.length > 0 &&
          comments.map((item) => (
            <Comment comment={item} setToggle={setToggle} />
          ))}
      </Box>
    </Box>
  );
};

export default Comments;
