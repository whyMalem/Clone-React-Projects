import * as React from "react";
import { styled } from "@mui/material/styles";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { width } from "@mui/system";

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`;

const Heading = styled(Typography)`
  color: #5f6368;
  font-size: 24px;
  margin-left: 16px;
`;

const HeaderBar = ({ open, handleDrawerOpen }) => {
  const logo =
    "https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png";

  return (
    <Header open={open}>
      <Toolbar>
        <IconButton
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{
            marginRight: 5,
          }}
        >
          <MenuIcon />
        </IconButton>

        <img src={logo} alt="logo" style={{ width: 30 }} />

        <Heading>Keep</Heading>
      </Toolbar>
    </Header>
  );
};

export default HeaderBar;
