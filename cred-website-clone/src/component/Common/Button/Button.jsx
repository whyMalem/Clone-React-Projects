import "./button.css";

export const Button = ({ prefix, text }) => (
  <button className="btn absolute-center">
    {prefix} {text}{" "}
  </button>
);
