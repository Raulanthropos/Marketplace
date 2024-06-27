import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Typography, Snackbar, SnackbarContent } from "@mui/material";
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
import useCartStore from "../../store/Cart";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import createTheme from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/redux/actions";

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
  width: "100%",
  color: createTheme.palette.common.marketblue,
  textDecoration: "none",
}));

const ListItemButtonStyle = styled(ListItemButton)(({ theme }) => ({
  width: "100%",
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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const userName = JSON.parse(localStorage.getItem("user"))?.name;
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState("");
  const [snackbarType, setSnackbarType] = React.useState("");

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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleLogout = async () => {
    dispatch(logout())
      .then(() => {
        localStorage.setItem("cart", []);
        setSnackbarMessage("User logged out successfully!");
        setSnackbarType("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        setSnackbarMessage(
          "Login failed. Please check your email and password."
        );
        setSnackbarType("error");
        setSnackbarOpen(true);
      });
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
              <ListItemButtonStyle>
                <Link to="/">
                  <LinkItem primary="Main" />
                </Link>
              </ListItemButtonStyle>
            </ListItem>
            <ListItem key="Cart" disablePadding>
              <ListItemButtonStyle>
                <Link to="/cart">
                  <ListItemText primary="Cart" />
                </Link>
              </ListItemButtonStyle>
            </ListItem>
            <ListItem key="Logout" disablePadding>
              <ListItemButtonStyle onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItemButtonStyle>
            </ListItem>
          </List>
        ) : (
          <List>
            <ListItem key="Register" disablePadding>
              <ListItemButtonStyle>
                <Link to="/register">
                  <LinkItem primary="Register" />
                </Link>
              </ListItemButtonStyle>
            </ListItem>
            <ListItem key="Login" disablePadding>
              <ListItemButtonStyle>
                <Link to="/login">
                  <LinkItem primary="Login" />
                </Link>
              </ListItemButtonStyle>
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <SnackbarContent
            message={snackbarMessage}
            style={
              snackbarType === "success"
                ? {
                    backgroundColor: createTheme.palette.common.marketgreen,
                    color: createTheme.palette.common.marketwhite,
                  }
                : {
                    backgroundColor: createTheme.palette.common.marketred,
                    color: createTheme.palette.common.marketwhite,
                  }
            }
          />
        </Snackbar>
      </MainContainer>
    </>
  );
}
