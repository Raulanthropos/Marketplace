import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Modal } from "@mui/material";
import { Link } from "react-router-dom";

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
  maxWidth: 345,
  height: 350,
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary,
  color: theme.palette.primary,
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
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const ModalReviews = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.background,
  border: "2px solid #000",
  padding: theme.spacing(2, 4, 3),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const Main = () => {
  const [productsData, setProductsData] = useState();
  const [productData, setProductData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [reviewDataWithUserNames, setReviewDataWithUserNames] = useState([]);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => {
        response.json().then((data) => {
          setProductsData(data.products);
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const fetchProduct = async (product) => {
    const response = await fetch(
      `http://localhost:3001/products/${product._id}`
    );
    const data = await response.json();
    fetchComments(product);
    fetchReviewData(product);
    setProductData(data);
    setButtonClicked(true);
    return data;
  };

  const fetchComments = async (product) => {
    const response = await fetch(
      `http://localhost:3001/products/${product._id}/reviews`
    );
    const data = await response.json();
    setButtonClicked(true);
    return data;
  };

  const postReview = async (product) => {
    // Retrieve the token from localStorage
    const storedAuth = localStorage.getItem("auth");
    const token = storedAuth ? JSON.parse(storedAuth).accessToken : null;

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3001/products/${product._id}/reviews`,
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

  // Define a function to fetch user name synchronously
  const fetchUserNameSync = async (userId) => {
    try {
      const storedAuth = localStorage.getItem("auth");
      const auth = storedAuth ? JSON.parse(storedAuth) : null;
      const token = auth ? auth.accessToken : null;

      if (!token) {
        console.error("No token found");
        return null;
      }

      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the Bearer token here
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userData = await response.json();
      console.log("userData", userData);

      if (userData && userData.name) {
        return userData.name;
      } else {
        console.error("Unexpected response format:", userData);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const fetchReviewData = async () => {
    const updatedReviews = [];
    for (const review of productData?.reviews ?? []) {
      const userName = await fetchUserNameSync(review.userId);
      console.log("Review", review)
      if (userName) {
        updatedReviews.push(`${userName}: ${review.rate}, ${review.comment}`);
      }
    }
    console.log("Updated reviews", updatedReviews);
    setReviewDataWithUserNames(updatedReviews[0]);
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
          {productsData?.map((product) => (
            <Grid item xs={8} sm={6} md={4} lg={3} key={product._id}>
              <CardItem>
                <CardMediaItem
                  component="img"
                  alt={product.name}
                  image={product.imageUrl}
                />
                <CardContentItem>
                  <TypographyTitle variant="h5">{product.name}</TypographyTitle>
                  <TypographyItem variant="body2" color="textSecondary">
                    {product.description}
                  </TypographyItem>
                  <Button onClick={() => fetchProduct(product)}>
                    View Details
                  </Button>
                  <Button onClick={() => openReviewModal(product)}>
                    Leave a review!
                  </Button>
                </CardContentItem>
                <CardContentItem>
                  <TypographyItem variant="h5">{product.price}</TypographyItem>
                </CardContentItem>
              </CardItem>
            </Grid>
          ))}
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
            <TypographyItem variant="h5">{productData.price}</TypographyItem>
          </CardContentItem>
          <CardContentItem>
            <TypographyItem variant="body2" color="textSecondary">
              {productData?.reviews?.map((review) => {
                return `${review.name}: ${review.rate}, ${review.comment}`;
              })}
            </TypographyItem>
          </CardContentItem>
        </CardItem>
      </ModalContent>
      <ModalReviews open={open} onClose={() => setOpen(false)}>
        <form onSubmit={(e) => e.preventDefault()}>
          <TypographyItem variant="h5">Leave a review</TypographyItem>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="0/200"
            maxLength="200"
            rows="5"
            required
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
      </ModalReviews>
    </>
  );
};

export default Main;
