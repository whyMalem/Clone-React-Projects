import { Box, styled, Typography } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API } from "../../api/api";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import Comments from "./Comments";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  fontsize: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
  word-break: break-word;
`;

const EditIcon = styled(Edit)`
  margin-right: 5px;
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  font-size: 30px;
  cursor: pointer;
`;

const DeleteIcon = styled(Delete)`
  padding: 5px;
  border: 1px solid #878787;
  border-radius: 10px;
  font-size: 30px;
  cursor: pointer;
`;

const Author = styled(Box)`
  color: #878787;
  margin: 20px 0;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
`;

const Description = styled(Typography)`
  word-break: break-word;
  padding: 0 10px;
`;

const Detail = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();
  const { admin } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getPostById(id);
      if (response?.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, [id]);

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const deleteBlog = async () => {
    let res = await API.deletePost(post._id);
    if (res.isSuccess) {
      navigate("/");
    }
  };

  return (
    <Container>
      <Image src={url} alt="thumbnail" />
      <Box style={{ float: "right", padding: "0 10px" }}>
        {admin.username === post.username && (
          <>
            <Link to={`/update/${post._id}`}>
              <EditIcon color="primary" />
            </Link>

            <DeleteIcon onClick={deleteBlog} color="error" />
          </>
        )}
      </Box>
      <Heading>{post.title}</Heading>

      <Author>
        <Typography>
          {" "}
          Author:{" "}
          <Box component="span" style={{ fontWeight: 600 }}>
            {" "}
            {post.username}
          </Box>{" "}
        </Typography>
        <Typography>{new Date(post.createdDate).toDateString()}</Typography>
      </Author>
      <Description>{post.description}</Description>
      <Comments post={post} />
    </Container>
  );
};

export default Detail;
