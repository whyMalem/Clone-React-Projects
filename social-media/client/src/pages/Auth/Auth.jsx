import React, { useState } from "react";
import "./auth.css";
import Logo from "../../img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logIn, signUp } from "../../actions/authActions";

const Auth = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authReducer);
  // const state = useSelector((state) => state.authReducer);
  // console.log(state);
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    cpassword: "",
  });

  const [confpassword, setConfpassword] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.cpassword
        ? dispatch(signUp(data))
        : setConfpassword(false);
      // if (data.password === data.cpassword) {
      //   setConfpassword(false);
      // } else {
      //   alert("You are successfully signin");
      // }
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfpassword(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      cpassword: "",
    });
  };

  return (
    <div className="Auth">
      {/* left side */}
      <div className="a-left">
        <img src={Logo} alt="logo" />
        <div className="webname">
          <h1>Demo Media</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3> {isSignUp ? "Sign up" : "Log In"} </h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirm Password"
                className="infoInput"
                name="cpassword"
                onChange={handleChange}
                value={data.cpassword}
              />
            )}
          </div>
          <span
            style={{
              display: confpassword ? "none" : "block",
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-start",
            }}
          >
            * Password didn't match
          </span>

          <div>
            <span
              className="sm-text"
              onClick={() => {
                setIsSignUp((prev) => !prev);
                resetForm();
              }}
            >
              {isSignUp
                ? "Already have an account. Login!"
                : "Don't have an account Sign up"}
            </span>
          </div>
          <button className="btn info-btn" type="submit" disabled={loading}>
            {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

// function LogIn() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3>Log In</h3>

//         <div>
//           <input
//             type="text"
//             placeholder="Username"
//             className="infoInput"
//             name="username"
//           />
//         </div>

//         <div>
//           <input
//             type="password"
//             className="infoInput"
//             placeholder="Password"
//             name="password"
//           />
//         </div>

//         <div>
//           <span className="sm-text">Don't have an account Sign up</span>
//           <button className="btn info-btn">Login</button>
//         </div>
//       </form>
//     </div>
//   );
// }

export default Auth;
