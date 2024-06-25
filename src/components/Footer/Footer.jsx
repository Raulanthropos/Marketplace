import React from "react";
import { Link, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import createTheme from "../../theme";

// Define styled components
const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  padding: "1rem",
  maxHeight: "100px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ContentWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "3rem",
  [theme.breakpoints.down("xs")]: {
    gap: "1rem",
  },
}));

const Title = styled("h5")(({ theme }) => ({
  marginBottom: theme.spacing(1),
  paddingBottom: theme.spacing(1),
}));

const Paragraph = styled(Typography)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
}));

const List = styled("ul")(() => ({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
}));

const ListItem = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "inherit",
  "&:hover": {
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

function Footer() {
  const [screenWidth, setScreenWidth] = React.useState(window.innerWidth);
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

  const footerHeightMobile = "50px";
  const footerHeightTwoLines = "75px";
  return (
    <FooterContainer>
      <ContentWrapper container justify="center">
        <Title>This mock eshop was created by Ioannis Psychias.</Title>
        <List>
          <ListItem>
            <a href={`mailto:${process.env.REACT_APP_EMAIL}`}>Email</a>
          </ListItem>
          <ListItem>
            <a
              href="https://www.linkedin.com/in/ioannis-psychias"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </ListItem>
          <ListItem>
            <a
              href="https://github.com/raulanthropos"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </ListItem>
        </List>
      </ContentWrapper>
    </FooterContainer>
  );
}

export default Footer;
