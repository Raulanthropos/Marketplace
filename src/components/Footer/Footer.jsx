import React from "react";
import { Link, Grid } from "@mui/material";
import { styled } from "@mui/system";

// Define styled components
const FooterContainer = styled("footer")(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  padding: "1rem",
  maxHeight: "100px",
}));

const ContentWrapper = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ColumnHalf = styled(Grid)(({ theme }) => ({
  flex: 1,
}));

const Title = styled("h5")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const List = styled("ul")(() => ({
  listStyle: "none",
  padding: 0,
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
        <ColumnHalf item xs={6}>
          <Title>Footer Content</Title>
          <p>This mock eshop was created by Ioannis Psichias.</p>
        </ColumnHalf>
        <ColumnHalf item xs={6}>
          <Title>Links</Title>
          <List>
            {/* Link 1: Send Email */}
            <ListItem>
              <a
                href={`mailto:${process.env.REACT_APP_EMAIL}`}
              >
                Link 1
              </a>
            </ListItem>
            {/* Link 2: LinkedIn */}
            <ListItem>
              <a
                href="https://www.linkedin.com/in/ioannis-psychias"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </ListItem>
            {/* Link 3: GitHub */}
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
        </ColumnHalf>
      </ContentWrapper>
    </FooterContainer>
  );
}

export default Footer;
