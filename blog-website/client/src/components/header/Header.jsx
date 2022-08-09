import { AppBar, styled, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Component = styled(AppBar)`
  background: #ffffff;
  color: #000;
`;

const Container = styled(Toolbar)`
  justify-content: center;
`;

const Menu = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
}));

const Header = () => {
  return (
    <Component>
      <Container>
        <Link to="/">
          <Menu sx={{ padding: { sm: "16px", xs: "12px" } }}>Home</Menu>
        </Link>

        <Link to="/about">
          <Menu sx={{ padding: { sm: "16px", xs: "12px" } }}>About</Menu>
        </Link>

        <Link to="/contact">
          <Menu sx={{ padding: { sm: "16px", xs: "12px" } }}>Contact</Menu>
        </Link>

        <Link to="/login">
          <Menu sx={{ padding: { sm: "16px", xs: "12px" } }}>Logout</Menu>
        </Link>
      </Container>
    </Component>
  );
};

export default Header;
