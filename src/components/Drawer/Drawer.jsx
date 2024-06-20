import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useAuthStore from "../../store/auth";

export default function TemporaryDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const { isLoggedIn } = useAuthStore();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/logout", {
        method: "POST",
        // credentials: "include",
        // headers: {
        //   "Content-Type": "application/json",
        // },
      });

      if (response.ok) {
        localStorage.clear();
        window.location.href = "/";
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {/* {["Home", "About", "Contact"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
        <ListItem key="Register" disablePadding>
          <ListItemButton>
            <Link to="/register">
              <ListItemText primary="Register" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem key="Login" disablePadding>
          <ListItemButton>
            <Link to="/login">
              <ListItemText primary="Login" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {isLoggedIn ? (
        <List>
          <ListItem key="Profile" disablePadding>
            <ListItemButton>
              <Link to="/profile">
                <ListItemText primary="Profile" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem key="Settings" disablePadding>
            <ListItemButton>
              <Link to="/settings">
                <ListItemText primary="Settings" />
              </Link>
            </ListItemButton>
          </ListItem>
          <ListItem key="Logout" disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : null}

      {/* <List>
        {["Profile", "Settings", "Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <Grid>
      <Button onClick={toggleDrawer(true)}>
        <MenuRoundedIcon />
      </Button>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </Grid>
  );
}
