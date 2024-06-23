import * as React from "react";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { createTheme } from "@mui/material";

const DRAWER_WIDTH = 250; // Default drawer width
const MOBILE_DRAWER_WIDTH = 150; // Mobile drawer width

const MainContainer = styled(Grid)(
  ({ theme, isDrawerOpenNormal, isDrawerOpenMobile }) => ({
    backgroundColor: "lightgray",
    color: theme.palette.secondary,
    padding: "1rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: isDrawerOpenNormal ? `${DRAWER_WIDTH}px` : "0",
    [theme.breakpoints.down("xs")]: {
      marginLeft: isDrawerOpenMobile ? `${MOBILE_DRAWER_WIDTH}px` : "0",
    },
  })
);

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
    toast("Hello, world! This is a toast message.");
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
        toast.error(` Error logging out - ${response.status}`, {
          position: "top-left",
        });
        console.error("Logout failed:", response.status);
      }
    } catch (error) {
      toast.info(`Network error:, ${error}`, {
        position: "bottom-center",
      });
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
            <ToastContainer position="top-right" autoClose={1000} />
          </List>
        ) : (
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
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );

  const isDrawerOpenNormal = 250;
  const isDrawerOpenMobile = 150;

  return (
    <MainContainer>
      <Button onClick={toggleDrawer(true)}>
        <MenuRoundedIcon />
      </Button>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {list}
      </Drawer>
    </MainContainer>
  );
}
