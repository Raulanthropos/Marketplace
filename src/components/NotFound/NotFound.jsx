//Create a simple not found component, styled with MUI
import React from "react";
import { Typography, Grid } from "@mui/material";
import createTheme from "../../theme";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const StyledTypography = styled(Typography)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: theme.spacing(1),
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
}));

const StyledButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketblue,
}));

const NotFound = () => {
    return (
        <StyledGrid>
            <StyledTypography variant="h1" gutterBottom>
                404
            </StyledTypography>
            <StyledTypography variant="h3" gutterBottom>
                Page Not Found
            </StyledTypography>
            <StyledTypography variant="body1" gutterBottom>
                The page you are looking for does not exist.
            </StyledTypography>
            <Link to="/">
                <StyledButton variant="contained">
                    Back
                </StyledButton>
            </Link>
        </StyledGrid>
    );
};

export default NotFound;