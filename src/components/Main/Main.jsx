import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { Modal } from "@mui/material";
import { Link } from "react-router-dom";
import useCartStore from "../../store/Cart";
import useAuthStore from "../../store/auth";
import createTheme from "../../theme";
import { ShoppingCart } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";

const MainContainer = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary,
  color: theme.palette.secondary,
  padding: "1rem",
  minHeight: "calc(100vh - 3rem)",
  display: "flex",
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
}));

const CardItem = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  width: "100%",
  height: "100%",
  margin: theme.spacing(1),
  backgroundColor: createTheme.palette.secondary,
  color: createTheme.palette.primary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "scroll",
  flexShrink: 1,
}));

const CardMediaItem = styled(CardMedia)(({ theme }) => ({
  height: 140,
}));

const FormItem = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  maxWidth: 600,
  margin: theme.spacing(1),
  backgroundColor: createTheme.palette.secondary,
  color: createTheme.palette.primary,
  overflow: "hidden",
  flexShrink: 1,
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const ReviewTypographyItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  wordWrap: "nowrap",
}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "250px",
}));

// const LinkItem = styled(Link)(({ theme }) => ({
//   color: theme.palette.secondary,
//   textDecoration: "none",
// }));

const ModalContent = styled(Modal)(({ theme }) => ({
  backgroundColor: createTheme.palette.background,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  maxWidth: 400,
  maxHeight: "auto",
  margin: "auto",
}));

const ModalReviews = styled(Modal)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  maxWidth: 400,
  maxHeight: "auto",
  margin: "auto",
}));

const ButtonItem = styled(Button)(() => ({
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketdarkblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketblack,
    backgroundColor: createTheme.palette.common.marketlightgrey,
  },
}));

const ButtonReviewItem = styled(Button)(() => ({
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketgreen,
  },
}));

const ButtonAddItem = styled(Button)(() => ({
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketmoss,
  },
}));

const Star = styled(Button)(({ theme }) => ({
  fontSize: "24px",
  cursor: "pointer",
  "&:hover": {
    color: createTheme.palette.common.marketmoss,
  },
  "&.star-image-important": {
    color: createTheme.palette.common.marketwarning,
  },
  "&.star-image-white": {
    color: createTheme.palette.common.marketwhite,
  },
}));

const Main = () => {
  const { isLoggedIn } = useAuthStore();
  const [productsData, setProductsData] = useState();
  const [productData, setProductData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarType, setSnackbarType] = useState("");

  const handleClick = (index) => {
    setSelectedIndex(index);
    setRate(index + 1);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(null);
    setRate(null);
  };

  const { cart } = useCartStore();

  const { addToCart, increaseQuantity, decreaseQuantity } = useCartStore(
    (state) => ({
      addToCart: state.addToCart,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
    })
  );
  const baseUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${baseUrl}/products`);
        const data = await response.json();
        setProductsData(data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    //eslint-disable-next-line
  }, []);

  const fetchProduct = async (product) => {
    const response = await fetch(`${baseUrl}/products/${product._id}`);
    const data = await response.json();
    fetchComments(product);
    setProductData(data);
    setButtonClicked(true);
    return data;
  };

  const fetchComments = async (product) => {
    const response = await fetch(`${baseUrl}/products/${product._id}/reviews`);
    const data = await response.json();
    setButtonClicked(true);
    return data;
  };

  const postReview = async (product) => {
    const storedAuth = localStorage.getItem("auth");
    const token = storedAuth ? JSON.parse(storedAuth).accessToken : null;

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `${baseUrl}/products/${product._id}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Attach token with Bearer prefix
          },
          body: JSON.stringify({
            comment,
            rate,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setSnackbarMessage("Review was posted successfully!");
      setSnackbarType("success");
      setSnackbarOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
      return data;
    } catch (error) {
      setSnackbarMessage("Error posting review!");
      setSnackbarType("error");
      setSnackbarOpen(true);
      console.error("Error posting review:", error);
      // Handle error as needed
    }
  };

  const openReviewModal = (product) => {
    setProductData(product);
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Title>Marketplace</Title>
      <Subtitle>Garments and electronics</Subtitle>
      <MainContainer justifyContent="center" alignItems="center">
        <CardContainer container spacing={2} justify="center">
          {isLoading ? (
            <CircularProgress />
          ) : (
            productsData?.map((product) => {
              const cartItem = cart.find((item) => item._id === product._id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <Grid item xs={8} sm={6} md={4} lg={3} key={product._id}>
                  <CardItem>
                    <CardMediaItem
                      component="img"
                      alt={product.name}
                      image={product.imageUrl}
                    />
                    <CardContentItem>
                      <TypographyTitle variant="h5">
                        {product.name}
                      </TypographyTitle>
                      <TypographyItem variant="body2" color="textSecondary">
                        {product.description}
                      </TypographyItem>
                      <ButtonItem onClick={() => fetchProduct(product)}>
                        View Details
                      </ButtonItem>
                      {isLoggedIn ? (
                        <ButtonReviewItem
                          onClick={() => openReviewModal(product)}
                        >
                          Leave a review!
                        </ButtonReviewItem>
                      ) : (
                        <TypographyItem variant="body2">
                          Sign in to leave a review
                        </TypographyItem>
                      )}
                      <CardActions>
                        {isLoggedIn ? (
                          quantity > 0 ? (
                            <>
                              <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={() => increaseQuantity(product)}
                              >
                                +
                              </Button>
                              <Typography variant="h6">{quantity}</Typography>
                              <Button
                                size="small"
                                color="primary"
                                variant="contained"
                                onClick={() => decreaseQuantity(product)}
                              >
                                -
                              </Button>
                            </>
                          ) : (
                            <ButtonAddItem
                              size="small"
                              color="primary"
                              onClick={() => addToCart(product)}
                            >
                              Add to Cart <ShoppingCart />
                            </ButtonAddItem>
                          )
                        ) : (
                          <TypographyItem variant="body2">
                            Sign in to add to cart
                          </TypographyItem>
                        )}
                      </CardActions>

                      <TypographyItem variant="h5">
                        {product.price}$
                      </TypographyItem>
                    </CardContentItem>
                  </CardItem>
                </Grid>
              );
            })
          )}
        </CardContainer>
      </MainContainer>
      <ModalContent
        open={buttonClicked}
        justifyContent="center"
        alignItems="center"
      >
        <CardItem>
          <IconButton
            style={{
              position: "absolute",
              right: "30px",
              top: "35px",
              color: "grey",
            }}
            onClick={() => setButtonClicked(false)}
          >
            <CloseIcon />
          </IconButton>
          <CardMediaItem
            component="img"
            alt={productData.name}
            image={productData.imageUrl}
          />
          <CardContentItem>
            <TypographyItem variant="h5">{productData.name}</TypographyItem>
            <TypographyItem variant="body2" color="textSecondary">
              {productData.description}
            </TypographyItem>
          </CardContentItem>
          <CardContentItem>
            <TypographyItem variant="h5">{productData.price}$</TypographyItem>
          </CardContentItem>
          <CardContentItem>
            {productData?.reviews?.map((review) => {
              const formattedDate = new Date(review.createdAt).toLocaleString(
                "en-UK"
              );
              return (
                <Grid container key={review._id}>
                  <ReviewTypographyItem variant="body2" color="textSecondary">
                    <b style={{ marginRight: "0.5rem" }}>Posted By: </b>{" "}
                    Anonymous
                  </ReviewTypographyItem>
                  <ReviewTypographyItem variant="body2" color="textSecondary">
                    <b style={{ marginRight: "0.5rem" }}>Date Posted: </b>{" "}
                    {formattedDate}
                  </ReviewTypographyItem>
                  <ReviewTypographyItem variant="body2" color="textSecondary">
                    <b style={{ marginRight: "0.5rem" }}>Rate: </b>{" "}
                    {review.rate}
                  </ReviewTypographyItem>
                  <ReviewTypographyItem variant="body2" color="textSecondary">
                    <b style={{ marginRight: "0.5rem" }}>Comment: </b>
                    {review.comment}
                  </ReviewTypographyItem>
                  <Divider style={{ width: "100%", margin: "1rem 0" }} />
                </Grid>
              );
            })}
          </CardContentItem>
        </CardItem>
      </ModalContent>
      <ModalReviews open={open}>
        <FormItem>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <IconButton
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                color: "white",
              }}
              onClick={() => handleClose()}
            >
              <CloseIcon />
            </IconButton>
            <TypographyItem variant="h6">Leave a review for</TypographyItem>
            <TypographyItem variant="h5">{productData.name}</TypographyItem>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="0/200"
              maxLength="200"
              rows="10"
              required
              style={{ width: "100%", height: "100%", marginBottom: "10px" }}
            />
            <Grid
              container
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "nowrap",
              }}
            >
              {[...Array(5)].map((_, index) => {
                const isSelected =
                  selectedIndex !== null && index <= selectedIndex;

                return (
                  <Star
                    key={index}
                    className={`${isSelected ? "star-image-important" : "star-image-white"}`}
                    onClick={() => handleClick(index)}
                  >
                    ★
                  </Star>
                );
              })}
            </Grid>
            <ButtonAddItem
              type="submit"
              onClick={() => postReview(productData)}
            >
              Submit
            </ButtonAddItem>
          </form>
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
        </FormItem>
      </ModalReviews>
    </>
  );
};

export default Main;
