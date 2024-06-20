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
          <p>
            You can use rows and columns here to organize your footer content.
          </p>
        </ColumnHalf>
        <ColumnHalf item xs={6}>
          <Title>Links</Title>
          <List>
            <ListItem to="#">Link 1</ListItem>
            <ListItem to="#">Link 2</ListItem>
            <ListItem to="#">Link 3</ListItem>
            <ListItem to="#">Link 4</ListItem>
          </List>
        </ColumnHalf>
      </ContentWrapper>
    </FooterContainer>
  );
}

export default Footer;
