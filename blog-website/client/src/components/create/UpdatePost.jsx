import {
  Box,
  FormControl,
  styled,
  InputBase,
  Button,
  TextareaAutosize,
} from "@mui/material";
import { AddCircle } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataProvider";
import { API } from "../../api/api";

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

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: "0 10px",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
  word-break: break-word;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  margin-top: 50px;
  font-size: 14px;
  border: none;
  outline: none;
  padding: 0 10px;
`;

const UpdatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    categories: "",
    picture: "",
    username: "",
    createdDate: new Date(),
  });
  const [file, setFile] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { admin } = useContext(DataContext);
  const { id } = useParams();
  // console.log(location);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        // API CALL
        const response = await API.uploadFile(data);
        // console.log(response);
        post.picture = response.data;
      }
    };
    getImage();
    post.categories = location.search?.split("=")[1] || "All";
    post.username = admin.username;
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const uploadBlogPost = async () => {
    const res = await API.updatePost(post);
    if (res?.isSuccess) {
      navigate(`/details/${id}`);
    }
  };

  const url = post.picture
    ? post.picture
    : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          {" "}
          <AddCircle cursor="pointer" fontSize="large" color="action" />{" "}
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField
          placeholder="Title"
          onChange={handleChange}
          value={post.title}
          name="title"
        />
        <Button variant="contained" onClick={uploadBlogPost}>
          Update
        </Button>
      </StyledFormControl>

      <Textarea
        minRows={5}
        placeholder="Tell your story..."
        onChange={handleChange}
        name="description"
        value={post.description}
      />
    </Container>
  );
};

export default UpdatePost;
