import React, { useContext, useState } from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { API } from "../../api/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)(({ theme }) => ({
  width: "400px",
  margin: "auto",
  boxShadow: "1px 2px 5px 2px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    width: "270px",
  },
}));

const Image = styled("img")(({ theme }) => ({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
  [theme.breakpoints.down("sm")]: {
    padding: "30px 0 0",
  },
}));

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const SignUpButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  letterSpacing: "1px",
  backgroundColor: "#fb641b",
  height: "40px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
  },
}));

const Login = ({ setIsLogin }) => {
  const [account, setAccount] = useState("login");
  const [userData, setUserData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [loginUser, setLoginUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setAdmin } = useContext(DataContext);
  const navigate = useNavigate();

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  const onInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    // console.log(userData);
  };

  const signUpUser = async () => {
    let response = await API.userSignUp(userData);
    if (response?.isSuccess) {
      setUserData({
        name: "",
        username: "",
        password: "",
      });
      setError(" ");
      setAccount("login");
    } else {
      setError("Something went wrong please try again later");
    }
    // const { data } = await userSignUp(userData);
    // if (data) {
    //   console.log(data);
    // } else {
    //   setError("Something went wrong!! Please signin later");
    // }
  };

  const onValueChange = (e) => {
    setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const response = await API.userLogin(loginUser);
    // console.log(response);
    if (response?.isSuccess) {
      setError(" ");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAdmin({
        username: response.data.username,
        name: response.data.name,
      });

      setIsLogin(true);
      navigate("/");
    } else setError("Something went wrong please try again later");
  };

  return (
    <Component>
      <Image src={imageURL} alt="login" />
      {account === "login" ? (
        <Wrapper>
          <TextField
            variant="standard"
            onChange={onValueChange}
            name="username"
            value={loginUser.username}
            label="Enter username"
          />
          <TextField
            variant="standard"
            onChange={onValueChange}
            name="password"
            value={loginUser.password}
            type="password"
            label="Enter password"
          />
          {error && (
            <Typography sx={{ fontSize: "12px", color: "red" }}>
              {error}
            </Typography>
          )}
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              letterSpacing: "1px",
              backgroundColor: "#fb641b",
              height: "40px",
            }}
            className="login"
            onClick={login}
          >
            Login
          </Button>

          <Typography alignSelf="center">OR</Typography>

          <Button
            sx={{ boxShadow: "0 4px 8px rgba(0,0,0,.2)" }}
            onClick={() => setAccount("signup")}
          >
            Create an account
          </Button>
        </Wrapper>
      ) : (
        <Wrapper>
          <TextField
            variant="standard"
            onChange={onInputChange}
            value={userData.name}
            type="text"
            name="name"
            label="Enter name"
          />
          <TextField
            variant="standard"
            onChange={onInputChange}
            value={userData.username}
            type="text"
            name="username"
            label="Enter username"
          />
          <TextField
            variant="standard"
            onChange={onInputChange}
            value={userData.password}
            type="password"
            name="password"
            label="Enter password"
          />

          {error && (
            <Typography sx={{ fontSize: "12px", color: "red" }}>
              {error}
            </Typography>
          )}
          <Button
            sx={{ boxShadow: "0 4px 8px rgba(0,0,0,.2)" }}
            onClick={signUpUser}
          >
            Signup
          </Button>

          <Typography alignSelf="center">OR</Typography>

          <SignUpButton variant="contained" onClick={() => setAccount("login")}>
            Already have an account
          </SignUpButton>
        </Wrapper>
      )}
    </Component>
  );
};

export default Login;
