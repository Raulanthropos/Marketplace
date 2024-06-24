import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import useAuthStore from "../../store/auth";
import useCartStore from "../../store/Cart";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import createTheme from "../../theme";

const MainContainer = styled(Grid)(() => ({
  backgroundColor: createTheme.palette.common.marketlightgrey,
  color: createTheme.palette.secondary,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "fixed",
  width: "100%",
  marginTop: "-72px",
  zIndex: 100,
}));

const TypographyItem = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const LinkItem = styled(ListItemText)(({ theme }) => ({
  color: createTheme.palette.common.marketblue,
  textDecoration: "none",
}));

const DrawerContainerStyle = styled(Box)(({ theme }) => ({
  padding: "1rem",
  backgroundColor: createTheme.palette.common.marketlightgrey,
  color: createTheme.palette.common.marketblue,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  height: "100%",
}));

export default function TemporaryDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const { isLoggedIn } = useAuthStore();
  const { setIsLoggedIn } = useAuthStore.getState();
  const baseUrl = process.env.REACT_APP_API_URL;
  const userName = JSON.parse(localStorage.getItem("user"))?.name;
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const { cart } = useCartStore();
  const navigate = useNavigate();

  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  React.useEffect(() => {
    const handleResize = debounce(() => setScreenWidth(window.innerWidth), 100);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawerWidth = 250;
  const dynamicWidth = "150px";

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
        sx={{ width: screenWidth <= 600 ? dynamicWidth : drawerWidth }}
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

  return (
    <>
      <div style={{ height: "72px" }}></div>
      <MainContainer>
        <Button onClick={toggleDrawer(true)}>
          <MenuRoundedIcon />
        </Button>

        <TypographyItem>
          Cart Items: ({cart.reduce((total, item) => total + item.quantity, 0)})
          <ShoppingCartOutlined
            sx={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => navigate("/cart")}
          />
        </TypographyItem>
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
    </>
  );
}
