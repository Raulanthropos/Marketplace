//Create a simple cart, styled with MUI

import React, { useState } from "react";
import { styled } from "@mui/system";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/auth";
import useCartStore from "../../store/Cart";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Modal } from "@mui/material";
import { CircularProgress } from "@mui/material";

const MainContainer = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  padding: "1rem",
  minHeight: "calc(100vh - 3rem)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Title = styled("h1")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const Subtitle = styled("h2")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}));

const CardContentItem = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "100%",
  wordWrap: "break-word",
}));

const TypographyItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "250px",
}));

const LinkItem = styled(Link)(({ theme }) => ({
  color: theme.palette.secondary,
  textDecoration: "none",
}));

const ModalContent = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.background,
  border: "2px solid #000",
  padding: theme.spacing(2, 4, 3),
}));

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { cart } = useCartStore();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <MainContainer>
      <Title>Cart</Title>
      <Subtitle>Items in your cart:</Subtitle>
      <CardContainer>
        {cart.map((product) => (
          <Card
            key={product._id}
            sx={{
              width: 300,
              height: 300,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardContentItem>
              <CardMedia
                component="img"
                height="200"
                image={product.imageUrl}
                alt={product.title}
              />
              <TypographyTitle variant="h5" component="div">
                {product.title}
              </TypographyTitle>
              <TypographyItem variant="body2" color="text.secondary">
                {product.category}
              </TypographyItem>
              <TypographyItem variant="body2" color="text.secondary">
                Price: ${product.price * product.quantity}
              </TypographyItem>
              <TypographyItem variant="body2" color="text.secondary">
                Quantity: {product.quantity}
              </TypographyItem>
            </CardContentItem>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/products/${product.id}`)}
            >
              View Product
            </Button>
          </Card>
        ))}
      </CardContainer>
    </MainContainer>
  );
};

export default Cart;
