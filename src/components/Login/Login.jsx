import React, { useState } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  TextField,
  CircularProgress,
  Snackbar,
  SnackbarContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import useAuthStore from "../../store/auth";
import createTheme from "../../theme";

const MainContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  padding: "1rem",
  minHeight: "calc(100vh - 3rem)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const CardContentItem = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "100%",
  wordWrap: "break-word",
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "250px",
}));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const { setIsLoggedIn } = useAuthStore.getState();
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        setLoading(false);
        setIsLoggedIn(true);
        setSnackbarMessage("User logged in successfully!");
        setSnackbarType("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        localStorage.setItem(
          "auth",
          JSON.stringify({ accessToken: data.accessToken })
        );
        localStorage.setItem("user", JSON.stringify(data.user));
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
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <MainContainer>
      <CardContainer container>
        <Card sx={{ maxWidth: 345 }}>
          <CardContentItem>
            <TypographyTitle variant="h5" component="div">
              Login
            </TypographyTitle>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </CardContentItem>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Login"}
          </Button>
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
        </Card>
      </CardContainer>
    </MainContainer>
  );
};

export default Login;
