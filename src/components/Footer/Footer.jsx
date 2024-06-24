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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Title = styled("h5")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const Paragraph = styled("p")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
}))

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
        <ColumnHalf item xs={6}>
          <Title>Footer Content</Title>
          <Paragraph>This mock eshop was created by Ioannis Psychias.</Paragraph>
        </ColumnHalf>
        <ColumnHalf item xs={6}>
          <Title>Links</Title>
          <List>
            <Paragraph>
              <a
                href={`mailto:${process.env.REACT_APP_EMAIL}`}
              >
                Email
              </a>
            </Paragraph>
            <Paragraph>
              <a
                href="https://www.linkedin.com/in/ioannis-psychias"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Paragraph>
            <Paragraph>
              <a
                href="https://github.com/raulanthropos"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Paragraph>
          </List>
        </ColumnHalf>
      </ContentWrapper>
    </FooterContainer>
  );
}

export default Footer;
