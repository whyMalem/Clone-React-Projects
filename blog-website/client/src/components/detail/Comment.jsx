import { Typography, Box, styled } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { Delete } from "@mui/icons-material";
import { API } from "../../api/api";

const Component = styled(Box)`
  margin-top: 30px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
`;
const Container = styled(Box)`
  display: flex;
`;
const StyledDate = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;
const Name = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  margin-right: 20px;
`;

const Comment = ({ comment, setToggle }) => {
  const { admin } = useContext(DataContext);

  const removeComment = async () => {
    let res = await API.deleteComment(comment._id);
    if (res.isSuccess) {
      setToggle((prev) => !prev);
    }
  };

  return (
    <Component>
      <Container>
        <Name>{comment.name}</Name>
        <StyledDate>{new Date(comment.date).toDateString()}</StyledDate>
        {comment.name === admin.username && (
          <Delete
            style={{ marginLeft: "auto", cursor: "pointer" }}
            onClick={removeComment}
          />
        )}
      </Container>
      <Box>
        <Typography>{comment.comments}</Typography>
      </Box>
    </Component>
  );
};

export default Comment;
