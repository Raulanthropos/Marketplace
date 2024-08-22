import React from "react";
import { styled } from "@mui/system";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import useCartStore from "../../store/Cart";
import { useNavigate } from "react-router-dom";
import createTheme from "../../theme";
import ModalWindow from "../../hooks/ModalWindow";

const MainContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  padding: "1rem",
  minHeight: "calc(100vh - 3rem)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  maxWidth: "100%",
}));

const Title = styled("h1")(({ theme }) => ({}));

const Subtitle = styled("h2")(({ theme }) => ({}));

const CardContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100%",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const CardContentItem = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
  width: "100%",
  wordWrap: "break-word",
  gap: theme.spacing(2),
}));

const TypographyItem = styled(Typography)(({ theme }) => ({}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  whiteSpace: "wrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "125px",
}));

const ButtonBack = styled(Button)(() => ({
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketmoss,
  },
}));

const ButtonClear = styled(Button)(() => ({
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketred,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketblue,
  },
}));

const Cart = () => {
  const navigate = useNavigate();
  const { cart, resetCart } = useCartStore();
  const [showClearCartModal, setShowClearCartModal] = React.useState(false);

  const handleClearCartRequest = () => {
    setShowClearCartModal(true);
  };

  const handleClearCartConfirm = () => {
    resetCart();
    setShowClearCartModal(false);
  };
  return (
    <MainContainer>
      <Title>Cart</Title>
      <Subtitle>Items in your cart:</Subtitle>
      <CardContainer>
        {cart.map((product) => (
          <Card
            key={product._id}
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardContentItem>
              <TypographyTitle variant="h5">{product.name}</TypographyTitle>
              <TypographyItem variant="h6" color="text.secondary">
                Category: {product.category}
              </TypographyItem>
              <TypographyItem variant="h6" color="text.secondary">
                Price: {product.price}
              </TypographyItem>
              <TypographyItem variant="h6" color="text.secondary">
                Quantity: {product.quantity}
              </TypographyItem>
            </CardContentItem>
          </Card>
        ))}
      </CardContainer>
      <CardContainer>
        <TypographyItem>
          Cart Items: ({cart.reduce((total, item) => total + item.quantity, 0)})
        </TypographyItem>
        <TypographyItem>
          Cart Total:{" "}
          {cart.reduce((total, item) => total + item.price * item.quantity, 0)}$
        </TypographyItem>
      </CardContainer>
      <ButtonBack variant="contained" onClick={() => navigate(`/`)}>
        Back to Main
      </ButtonBack>
      {cart.length > 0 ? (
        <ButtonClear variant="contained" onClick={handleClearCartRequest}>
          Clear Cart
        </ButtonClear>
      ) : (
        <TypographyItem color="textSecondary">
          The cart is empty!
        </TypographyItem>
      )}
      <ModalWindow
        isOpen={showClearCartModal}
        onClose={() => setShowClearCartModal(false)}
        onConfirm={handleClearCartConfirm}
      />
    </MainContainer>
  );
};

export default Cart;
