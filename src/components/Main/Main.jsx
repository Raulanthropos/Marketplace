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
  maxWidth: '100%',
  wordWrap: 'break-word',
}));

const TypographyItem = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),

}));

const TypographyTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  width: '250px',
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

const Main = () => {
  const [productsData, setProductsData] = useState();
  const [productData, setProductData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);

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

  return (
    <>
      <Title>Main Content</Title>
      <Subtitle>Subtitle</Subtitle>
      <MainContainer justifyContent="center" alignItems="center">
        <CardContainer container spacing={2} justify="center">
          {productsData?.map((product) => (
            <Grid item xs={8} sm={6} md={4} lg={3} key={product.id}>
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
              {productData?.reviews?.map(
                (review) => `${review.rate}, ${review.comment}`
              )}
            </TypographyItem>
          </CardContentItem>
        </CardItem>
      </ModalContent>
    </>
  );
};

export default Main;
