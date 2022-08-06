import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  LightbulbOutlined as Lightbulb,
  ArchiveOutlined as Archive,
  DeleteOutline as Delete,
} from "@mui/icons-material";
const NavList = ({ open }) => {
  const navList = [
    { id: 1, name: "Notes", icon: <Lightbulb />, route: "/" },
    { id: 2, name: "Archive", icon: <Archive />, route: "/archive" },
    { id: 3, name: "Delete", icon: <Delete />, route: "/delete" },
  ];

  return (
    <List>
      {navList.map((list) => (
        <ListItemButton
          key={list.id}
          sx={{
            minHeight: 48,
            // alignItems: "center",
            justifyContent: open ? "initial" : "start",
            px: 2.5,
          }}
        >
          <Link
            to={list.route}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                display: "flex",
                // justifyContent: "center",
                alignItems: "center",
              }}
            >
              {list.icon}
              {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>

            <ListItemText primary={list.name} sx={{ opacity: open ? 1 : 0 }} />
          </Link>
        </ListItemButton>
      ))}
    </List>
  );
};

export default NavList;
