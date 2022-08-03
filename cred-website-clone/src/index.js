import React from "react";
import ReactDOM from "react-dom/client";
import "./commonStyles/variables.css";
import "./commonStyles/commonClasses.css";
import "./commonStyles/animation.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
