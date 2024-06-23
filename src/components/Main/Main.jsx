import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Modal } from "@mui/material";
import { Link } from "react-router-dom";
import useCartStore from "../../store/Cart";
import useAuthStore from "../../store/auth";
import createTheme from "../../theme";

// Define styled components
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
  overflow: "hidden",
  flexShrink: 1,
}));

const CardMediaItem = styled(CardMedia)(({ theme }) => ({
  height: 140,
}));

const FormItem = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%', // Ensure the form fills the width of its parent (ModalContent)
  maxWidth: 600, // Example maximum width for responsiveness
  margin: theme.spacing(1),
  backgroundColor: createTheme.palette.secondary,
  color: createTheme.palette.primary,
  overflow: 'hidden',
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
  backgroundColor: createTheme.palette.background,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  maxWidth: 400,
  maxHeight: 500,
  margin: "auto",
}));

const ModalReviews = styled(Modal)(({ theme }) => ({
  backgroundColor: "white",
  padding: theme.spacing(4),
  border: "2px solid #000",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  maxWidth: 400,
  maxHeight: 500,
  margin: "auto",
}));

const ButtonItem = styled(Button)(() => ({
  marginTop: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketdarkblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketdarkblue,
    backgroundColor: createTheme.palette.common.marketwhite,
  },
}));

const Main = () => {
  const { isLoggedIn } = useAuthStore();
  const [productsData, setProductsData] = useState();
  const [productData, setProductData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(null);
  const { cart, addToCart, increaseQuantity, decreaseQuantity } = useCartStore(
    (state) => ({
      cart: state.cart,
      addToCart: state.addToCart,
      increaseQuantity: state.increaseQuantity,
      decreaseQuantity: state.decreaseQuantity,
    })
  );
  const baseUrl = process.env.REACT_APP_API_URL;

  // console.log("Cart", cart);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`${baseUrl}/products`);
      const data = await response.json();
      setProductsData(data.products);
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
      console.log("Data review", data);
      setOpen(false);
      return data;
    } catch (error) {
      console.error("Error posting review:", error);
      // Handle error as needed
    }
  };

  const openReviewModal = (product) => {
    setProductData(product);
    setOpen(true);
  };

  return (
    <>
      <Title>Main Content</Title>
      <Subtitle>Subtitle</Subtitle>
      <MainContainer justifyContent="center" alignItems="center">
        <CardContainer container spacing={2} justify="center">
          {productsData?.map((product) => {
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
                      <Button onClick={() => openReviewModal(product)}>
                        Leave a review!
                      </Button>
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
                              onClick={() => decreaseQuantity(product)}
                            >
                              -
                            </Button>
                            <Typography variant="h6">{quantity}</Typography>
                            <Button
                              size="small"
                              color="primary"
                              variant="contained"
                              onClick={() => increaseQuantity(product)}
                            >
                              +
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => addToCart(product)}
                          >
                            Add to Cart
                          </Button>
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
          })}
        </CardContainer>
      </MainContainer>
      <ModalContent
        open={buttonClicked}
        onClose={() => setButtonClicked(false)}
        justifyContent="center"
        alignItems="center"
      >
        <CardItem>
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
                <div key={review._id}>
                  <TypographyItem variant="h6" color="textSecondary">
                    Posted By: Anonymous
                    <br />
                    Date Posted: {formattedDate}
                    <br />
                    Rate: {review.rate}
                    <br />
                    Comment: {review.comment}
                  </TypographyItem>
                </div>
              );
            })}
          </CardContentItem>
        </CardItem>
      </ModalContent>
      <ModalReviews open={open} onClose={() => setOpen(false)}>
        <FormItem>
        <form onSubmit={(e) => e.preventDefault()} style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
          <TypographyItem variant="h5">Leave a review</TypographyItem>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="0/200"
            maxLength="200"
            rows="10"
            required
            style={{ width: "100%", height: "100%", marginBottom: "10px" }}
          />
          <div>
            {[...Array(5)].map((_, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name="rate"
                  value={i + 1}
                  checked={rate === i + 1}
                  onChange={(e) => setRate(i + 1)}
                  required
                />
                ★
              </label>
            ))}
          </div>
          <Button type="submit" onClick={() => postReview(productData)}>
            Submit
          </Button>
        </form>
        </FormItem>
      </ModalReviews>
    </>
  );
};

export default Main;
