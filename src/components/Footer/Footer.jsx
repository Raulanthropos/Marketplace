import React from "react";
import { Link, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import MailIcon from "@mui/icons-material/Mail";

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
  marginBottom: theme.spacing(2),
  paddingBottom: theme.spacing(2),
}));

// const Paragraph = styled(Typography)(({ theme }) => ({
//   display: "flex",
//   flexDirection: "row",
//   justifyContent: "center",
//   alignItems: "center",
//   gap: "1rem",
// }));

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
  return (
    <FooterContainer>
      <ContentWrapper container justify="center">
        <Title>This eshop project was created by Ioannis Psychias.</Title>
        <List>
          <ListItem>
            <a href={`mailto:${process.env.REACT_APP_EMAIL}`}>
              <MailIcon />
            </a>
          </ListItem>
          <ListItem>
            <a
              href="https://www.linkedin.com/in/ioannis-psychias"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon />
            </a>
          </ListItem>
          <ListItem>
            <a
              href="https://github.com/raulanthropos"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </ListItem>
        </List>
      </ContentWrapper>
    </FooterContainer>
  );
}

export default Footer;

/* 
        <div className="flex mb-5">
          <a
            href="https://www.github.com/Raulanthropos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl mx-3"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ioannis-psychias/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl mx-3"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:ipsichias@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl mx-3"
          >
            <i className="far fa-envelope"></i>
          </a>
        </div>
*/
