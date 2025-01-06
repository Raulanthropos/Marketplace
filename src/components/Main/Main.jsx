import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { styled } from "@mui/system";
import Divider from "@mui/material/Divider";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Snackbar,
  SnackbarContent,
  TextField,
} from "@mui/material";
import { Modal } from "@mui/material";
import useCartStore from "../../store/Cart";
import createTheme from "../../theme";
import {
  ShoppingCart,
  Details,
  Reviews,
  Delete,
  Edit,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import CategoryFilter from "../../hooks/filters/CategoryFilters";
import SortOptions from "../../hooks/filters/SortFilters";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const MainGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: 0,
}));

const FilteringGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // width: "100%",
  margin: theme.spacing(1),
}));
const MainContainer = styled(Grid)(({ theme }) => ({
  color: theme.palette.secondary,
  padding: "1rem",
  minHeight: "calc(100vh - 3rem)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const HeadContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: theme.spacing(1),
  backgroundImage: `url("https://images.pexels.com/photos/3799830/pexels-photo-3799830.jpeg")`,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const Title = styled("h1")(({ theme }) => ({
  marginBottom: 0,
}));

const Subtitle = styled("h2")(({ theme }) => ({
  marginTop: 0,
  marginBottom: theme.spacing(1),
}));

const CardContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
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
}));

const ReviewCardItem = styled(Card)(({ theme }) => ({
  maxWidth: 600,
  position: "relative",
  width: "100%",
  height: "80vh",
  margin: theme.spacing(1),
  paddingTop: theme.spacing(2),
  backgroundColor: createTheme.palette.secondary,
  color: createTheme.palette.primary,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  overflowY: "scroll",
  scrollbarWidth: "thin",
}));

const TheTextField = styled(TextField)(({ theme }) => ({
  "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
    {
      "-webkit-appearance": "none",
      margin: 0,
    },
  "& input[type=number]": {
    "-moz-appearance": "textfield", // Firefox
  },
}));

const NumericInputContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  width: "100px",
});

const NumericButton = styled(IconButton)(({ theme }) => ({
  padding: "0",
  width: "32px",
  height: "36px",
  backgroundColor: createTheme.palette.common.marketlightgrey,
  color: "#fff",
  "&:hover": {
    backgroundColor: createTheme.palette.common.marketgrey,
  },
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

const TypographyTitleItem = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: 0,
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

const ModalContent = styled(Modal)(({ theme }) => ({
  backgroundColor: createTheme.palette.background,
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "80%",
  maxWidth: 400,
  height: "auto",
  // maxHeight: "auto",
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

const ButtonContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: theme.spacing(1),
  gap: theme.spacing(1),
}));

const CardActionsContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const ButtonQuantityItem = styled(Button)(() => ({
  width: 64,
  height: 36,
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketdarkblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketblack,
    backgroundColor: createTheme.palette.common.marketlightgrey,
  },
}));

const ButtonPaginationItem = styled(Button)(() => ({
  width: 96,
  height: 36,
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  color: createTheme.palette.common.marketgrey,
  backgroundColor: createTheme.palette.common.marketwhite,
}));

const PaginationContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  margin: theme.spacing(1),
  gap: theme.spacing(1),
}));

const ButtonReviewItem = styled(Button)(() => ({
  width: 64,
  height: 36,
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketgreen,
  },
}));

const ButtonAddItem = styled(Button)(({ theme }) => ({
  width: 64,
  height: 36,
  marginTop: createTheme.spacing(2),
  marginBottom: createTheme.spacing(2),
  backgroundColor: createTheme.palette.common.marketblue,
  color: createTheme.palette.common.marketwhite,
  "&:hover": {
    color: createTheme.palette.common.marketwhite,
    backgroundColor: createTheme.palette.common.marketgreen,
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
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [totalPages, setTotalPages] = useState(0);
  const xsBreakpoint = 600;
  const [isSmallScreen, setIsSmallScreen] = useState(
    window.innerWidth <= xsBreakpoint
  );
  const userName = JSON.parse(localStorage.getItem("user"))?.name;
  const [reviewId, setReviewId] = useState(null);

  // Debounce function to limit updates
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  useEffect(() => {
    // Handler to call on window resize
    const handleResize = debounce(() => {
      setIsSmallScreen(window.innerWidth <= xsBreakpoint);
    }, 250); // Adjust debounce time as needed

    // Set up resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = (index) => {
    setSelectedIndex(index);
    setRate(index + 1);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndex(null);
    setRate(null);
    setComment("");
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

  const handleQuantityChange = (product, newQuantity) => {
    const quantity = Math.max(0, Number(newQuantity)); // Ensure the quantity is at least 0
    const productInCart = cart.find((item) => item._id === product._id);

    if (productInCart) {
      if (quantity > productInCart.quantity) {
        increaseQuantity(product);
      } else if (quantity < productInCart.quantity) {
        decreaseQuantity(product);
      }
    } else if (quantity > 0) {
      addToCart(product);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${baseUrl}/products/${productData._id}/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete review");
      }

      // Update the reviews in the state after successful deletion
      const updatedReviews = productData.reviews.filter(
        (review) => review._id !== reviewId
      );
      setProductData({ ...productData, reviews: updatedReviews });

      // Optional: Show a success message
      setSnackbarMessage("Review deleted successfully!");
      setSnackbarType("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error:", error);
      setSnackbarMessage("Failed to delete the review.");
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  const loadReviewForEditing = (product, review) => {
    setProductData(product);
    setComment(review.comment);
    setRate(review.rate);
    setReviewId(review._id);
    setOpen(true);
  };

  //   if (reviewToEdit) {
  //     // Set the comment and rate states to the current review's values
  //     setComment(reviewToEdit.comment);
  //     setRate(reviewToEdit.rate);

  //     // Open the modal for editing
  //     setOpen(true);
  //   }
  // };

  const handleEditReview = async (productId, reviewId) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${baseUrl}/products/${productId}/reviews/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            comment,
            rate,
          }),
        }
      );

      if (response.ok) {
        const updatedReview = await response.json();
        // Update the review in the state to avoid duplicates
        const updatedReviews = productData.reviews.map((review) =>
          review._id === reviewId ? updatedReview : review
        );
        setProductData({ ...productData, reviews: updatedReviews });

        // Show success message
        setSnackbarMessage("Review updated successfully!");
        setSnackbarType("success");
        setSnackbarOpen(true);
        setIsLoading(false);
        setOpen(false);
      } else {
        throw new Error("Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
      setSnackbarMessage("Error updating review");
      setSnackbarType("error");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    const fetchProducts = async (page = 1) => {
      try {
        setIsLoading(true);
        const queryString = `?category=${selectedCategory}&sortBy=price&sortOrder=${sortOrder}&page=${page}`;
        const response = await fetch(`${baseUrl}/products${queryString}`);
        const data = await response.json();
        setProductsData(data.products);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
    //eslint-disable-next-line
  }, [selectedCategory, sortOrder]);

  useEffect(() => {
    const totalItems = productsData?.length;
    const pages = Math.ceil(totalItems / itemsPerPage);
    setTotalPages(pages);
    //eslint-disable-next-line
  }, [productsData]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = productsData?.slice(indexOfFirstItem, indexOfLastItem);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

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
    const token = localStorage.getItem("accessToken");
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
            Authorization: `Bearer ${token}`,
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
      console.log("Review data", data);
  
      // Update the reviews with the new review
      setProductData((prevProductData) => ({
        ...prevProductData,
        reviews: [...prevProductData.reviews, data],
      }));
  
      setSnackbarMessage("Review was posted successfully!");
      setSnackbarType("success");
      setSnackbarOpen(true);
  
      setTimeout(() => {
        setOpen(false);
      }, 1500);
  
    } catch (error) {
      setSnackbarMessage("Error posting review!");
      setSnackbarType("error");
      setSnackbarOpen(true);
      console.error("Error posting review:", error);
    } finally {
      setIsLoading(false); // Make sure loading state is reset even in case of error
    }
  };
  

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Assuming you store the review ID when a user is editing a review
    if (reviewId) {
      // Edit existing review
      handleEditReview(productData._id, reviewId);
    } else {
      // Post a new review
      postReview(productData);
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
    <MainGrid>
      <HeadContainer>
        <Title>Marketplace</Title>
        <Subtitle>Fullstack Eshop Project</Subtitle>
        <FilteringGrid>
          <CategoryFilter onSelectCategory={handleCategoryChange} />
          <SortOptions onSelectSort={handleSortChange} />
        </FilteringGrid>
      </HeadContainer>
      <MainContainer container spacing={2}>
        {isLoading ? (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "100vh" }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <CardContainer
            container
            spacing={2}
            justifyContent={isSmallScreen ? "center" : "flex-start"}
          >
            {currentItems?.map((product) => {
              const cartItem = cart.find((item) => item._id === product._id);
              const quantity = cartItem ? cartItem.quantity : 0;
              return (
                <Grid item xs={10} sm={6} md={4} lg={3} key={product._id}>
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
                      <ButtonContainer>
                        {isLoggedIn ? (
                          <>
                            <ButtonReviewItem
                              onClick={() => fetchProduct(product)}
                            >
                              <Details />
                            </ButtonReviewItem>
                            <ButtonReviewItem
                              onClick={() => openReviewModal(product)}
                            >
                              <Reviews />
                            </ButtonReviewItem>
                            {quantity > 0 ? (
                              <CardActionsContainer>
                                <NumericInputContainer>
                                  <NumericButton
                                    onClick={() =>
                                      handleQuantityChange(
                                        product,
                                        quantity - 1
                                      )
                                    }
                                  >
                                    <ArrowDropDownIcon fontSize="small" />
                                  </NumericButton>
                                  <TheTextField
                                    type="number"
                                    value={quantity}
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        product,
                                        e.target.value
                                      )
                                    }
                                    inputProps={{ min: 0 }}
                                    variant="outlined"
                                    size="small"
                                  />
                                  <NumericButton
                                    onClick={() =>
                                      handleQuantityChange(
                                        product,
                                        quantity + 1
                                      )
                                    }
                                  >
                                    <ArrowDropUpIcon fontSize="small" />
                                  </NumericButton>
                                </NumericInputContainer>
                              </CardActionsContainer>
                            ) : (
                              <ButtonAddItem
                                size="small"
                                color="primary"
                                onClick={() => addToCart(product)}
                              >
                                <ShoppingCart />
                              </ButtonAddItem>
                            )}
                          </>
                        ) : (
                          <>
                          <Tippy content="View details">
                            <ButtonReviewItem
                              onClick={() => fetchProduct(product)}
                              >
                              <Details />
                            </ButtonReviewItem>
                              </Tippy>
                            <>
                              <Tippy content="Login to review">
                                <div>
                                  <ButtonReviewItem disabled>
                                    <Reviews />
                                  </ButtonReviewItem>
                                </div>
                              </Tippy>
                              <Tippy content="Login to add to cart">
                                <div>
                                  <ButtonAddItem disabled>
                                    <ShoppingCart />
                                  </ButtonAddItem>
                                </div>
                              </Tippy>
                            </>
                          </>
                        )}
                      </ButtonContainer>
                      <TypographyItem variant="h5">
                        {product.price}$
                      </TypographyItem>
                    </CardContentItem>
                  </CardItem>
                </Grid>
              );
            })}
          </CardContainer>
        )}
        <PaginationContainer>
          <ButtonPaginationItem
            onClick={() =>
              setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1))
            }
            disabled={currentPage === 1}
          >
            Previous
          </ButtonPaginationItem>
          <span>{currentPage}</span>
          <ButtonPaginationItem
            onClick={() =>
              setCurrentPage((prevPage) =>
                prevPage < totalPages ? prevPage + 1 : totalPages
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </ButtonPaginationItem>
        </PaginationContainer>
      </MainContainer>
      <ModalContent
        open={buttonClicked}
        justifyContent="center"
        alignItems="center"
      >
        <ReviewCardItem>
          <IconButton
            style={{
              position: "absolute",
              right: "10px",
              top: "10px",
              color: "grey",
            }}
            onClick={() => setButtonClicked(false)}
          >
            <CloseIcon />
          </IconButton>
          <CardContentItem>
            <TypographyTitleItem variant="h5">
              {productData.name}
            </TypographyTitleItem>
          </CardContentItem>
          <CardMediaItem
            component="img"
            alt={productData.name}
            image={productData.imageUrl}
          />
          <CardContentItem>
            <TypographyTitleItem variant="h6">
              {productData.description}
            </TypographyTitleItem>
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
                    {review.username || "Anonymous"}
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
                  {userName && userName === review.username && (
                    <div>
                      <IconButton
                        style={{
                          color: createTheme.palette.common.marketwarning,
                        }}
                        onClick={() =>
                          loadReviewForEditing(productData, review)
                        }
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        style={{
                          color: createTheme.palette.common.marketred,
                        }}
                        onClick={() => handleDeleteReview(review._id)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  )}
                  <Divider style={{ width: "100%", margin: "1rem 0" }} />
                </Grid>
              );
            })}
          </CardContentItem>
        </ReviewCardItem>
      </ModalContent>
      <ModalReviews open={open}>
        <FormItem
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
          <CardMediaItem
            component="img"
            alt={productData.name}
            image={productData.imageUrl}
          />
          <TypographyItem variant="h5">{productData.name}</TypographyItem>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="0/200"
            maxLength="200"
            rows="5"
            required
            style={{ width: "80%", height: "20%", marginBottom: "10px" }}
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
                  className={`${
                    isSelected ? "star-image-important" : "star-image-white"
                  }`}
                  onClick={() => handleClick(index)}
                >
                  ★
                </Star>
              );
            })}
          </Grid>
          <ButtonAddItem type="submit" onClick={handleReviewSubmit}>
            {isLoading ? <CircularProgress color="inherit" /> : "Submit"}
          </ButtonAddItem>
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
    </MainGrid>
  );
};

export default Main;
