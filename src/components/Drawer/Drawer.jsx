import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useAuthStore from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import createTheme from "../../theme";

const DRAWER_WIDTH = 250; // Default drawer width
const MOBILE_DRAWER_WIDTH = 150; // Mobile drawer width

const MainContainer = styled(Grid)(
  ({ isDrawerOpenNormal, isDrawerOpenMobile }) => ({
    backgroundColor: createTheme.palette.common.marketlightgrey,
    color: createTheme.palette.secondary,
    padding: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: isDrawerOpenNormal ? `${DRAWER_WIDTH}px` : "0",
    [createTheme.breakpoints.down("xs")]: {
      marginLeft: isDrawerOpenMobile ? `${MOBILE_DRAWER_WIDTH}px` : "0",
    },
  })
);

const TypographyItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const LinkItem = styled(ListItemText)(({ theme }) => ({
  color: "red",
  textDecoration: "none",
}));

const DrawerContainerStyle = styled(Box)(({ theme }) => ({
  width: 250,
  padding: "1rem",
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("xs")]: {
    width: "150px",
  },
}));

export default function TemporaryDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { setIsLoggedIn } = useAuthStore.getState();
  const baseUrl = process.env.REACT_APP_API_URL;
  const userName = JSON.parse(localStorage.getItem("user"))?.name;
  const screenWidth = window.innerWidth || document.documentElement.clientWidth;
  const drawerWidth = screenWidth <= 600 ? MOBILE_DRAWER_WIDTH : DRAWER_WIDTH;
  const dynamicWidth = isDrawerOpen ? `calc(100% - ${drawerWidth}px` : "100%";

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
      const response = await fetch(`${baseUrl}/users/logout`, {
        method: "POST",
      });

      if (response.ok) {
        localStorage.clear();
        setIsLoggedIn(false);
        window.location.href = "/";
      } else {
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const list = (
    <>
      <DrawerContainerStyle
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <Divider />
        {isLoggedIn ? (
          <List>
            <ListItem key={userName} disablePadding>
              <TypographyItem variant="h6">
                Welcome back, {userName}!
              </TypographyItem>
            </ListItem>
            <ListItem key="Main" disablePadding>
              <ListItemButton>
                <Link to="/">
                  <LinkItem primary="Main" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key="Cart" disablePadding>
              <ListItemButton>
                <Link to="/cart">
                  <ListItemText primary="Cart" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key="Logout" disablePadding>
              <ListItemButton onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem key="Register" disablePadding>
              <ListItemButton>
                <Link to="/register">
                  <LinkItem primary="Register" />
                </Link>
              </ListItemButton>
            </ListItem>
            <ListItem key="Login" disablePadding>
              <ListItemButton>
                <Link to="/login">
                  <LinkItem primary="Login" />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </DrawerContainerStyle>
    </>
  );

  const isDrawerOpenNormal = 250;
  const isDrawerOpenMobile = 150;

  return (
    <MainContainer>
      <Button onClick={toggleDrawer(true)}>
        <MenuRoundedIcon />
      </Button>
      <Drawer anchor="left" open={isDrawerOpen}>
        <IconButton
          style={{
            position: "absolute", // Adjust the position as needed
            right: "5px", // Right offset
            top: "5px", // Top offset
            color: "grey", // Icon color, you can customize it
          }}
          onClick={toggleDrawer(false)}
        >
          <CloseIcon />
        </IconButton>
        {list}
      </Drawer>
    </MainContainer>
  );
}
