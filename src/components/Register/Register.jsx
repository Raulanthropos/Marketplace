import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import createTheme from "../../theme";
import { SET_IS_LOGGED_IN } from "../../store/redux/actions";
import { register } from "../../store/redux/actions";

const MainContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  padding: "1rem",
  minHeight: "calc(100vh - 3rem)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

// const Title = styled("h1")(({ theme }) => ({
//   marginBottom: theme.spacing(1),
// }));

// const Subtitle = styled("h2")(({ theme }) => ({
//   marginBottom: theme.spacing(1),
// }));

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

// const TypographyItem = styled(Typography)(({ theme }) => ({
//   marginBottom: theme.spacing(1),
// }));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "250px",
}));

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const handleRegister = () => {
    setLoading(true);
    dispatch(register(name, email, password))
      .then(() => {
        setLoading(false);
        setSnackbarMessage("User registered successfully!");
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
          "Registration failed. Please check the credentials you tried registering with."
        );
        setSnackbarType("error");
        setSnackbarOpen(true);
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleRegister();
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
              Register
            </TypographyTitle>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
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
            {loading ? <CircularProgress size={24} /> : "Register"}
          </Button>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
            message="User created successfully!"
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

export default Register;
