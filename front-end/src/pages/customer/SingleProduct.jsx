import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Grid, Rating } from "@mui/material";
import { useParams, Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import ProductService from "../../service/customer/ProductService";
import Button from "@mui/material/Button";
import StorageInfo from "../../components/customer/product/StorageInfo";
import Feedback from "../../components/customer/feedback/Feedback";
import CartService from "../../service/customer/CartService";
import CustomSnackbar from "../../components/CustomSnackbar";

const SingleProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const existUser = localStorage.getItem("user");
  let username = "";

  if (existUser) {
    username = existUser.replace(/"/g, "");
  }

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const updateProductRating = async () => {
    try {
      const data = await ProductService.getProductById(productId);
      setProduct(data);
    } catch (error) {
      console.error(
        "Đã xảy ra lỗi khi cập nhật thông tin sản phẩm:",
        error.message
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getProductById(productId);
        setProduct(data);
        setSelectedColor(data.colorDTOs[0]);
        const relatedData = await ProductService.getAllProducts(
          `name=${data.name}`
        );
        const filteredRelatedProducts = relatedData.content.filter(
          (p) => p.productId !== parseInt(productId, 10)
        );
        setRelatedProducts([data, ...filteredRelatedProducts]);
      } catch (error) {
        console.error(
          "Đã xảy ra lỗi khi lấy thông tin sản phẩm:",
          error.message
        );
      }
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const isStorageActive = (relatedProduct) => {
    return relatedProduct.productId === parseInt(productId, 10);
  };

  function formatPrice(n) {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  const handleAddToCart = (productId) => {
    CartService.addToCart(productId, selectedColor.colorId, quantity)
      .then(() => {
        window.location.reload();
        setSnackbarSeverity("success");
        setSnackbarMessage("Product added to cart successfully!");
        setSnackbarOpen(true);
      })
      .catch((error) => {
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to add product to cart.");
        setSnackbarOpen(true);
        console.error("Error adding product to cart:", error);
      });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ minWidth: 275, mt: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" component="span">
                {product.name} - {product.ram} GB RAM -{" "}
                <StorageInfo internalStorage={product.internalStorage} />
              </Typography>
              <Rating
                sx={{ ml: "0.5vw" }}
                name="read-only"
                precision={0.5}
                value={product.averageRating}
                readOnly
              />
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardMedia
                    component="img"
                    image={`/products/${selectedColor.colorImage}`}
                    alt={product.name}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card variant="outlined" sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography variant="h6">Storage Options</Typography>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      {relatedProducts.map((relatedProduct) => (
                        <Link
                          key={relatedProduct.productId}
                          to={`/products/${relatedProduct.productId}`}
                        >
                          <Button
                            variant={
                              isStorageActive(relatedProduct)
                                ? "contained"
                                : "outlined"
                            }
                            className={`custom-button`}
                          >
                            <Box display="flex" flexDirection="column">
                              <StorageInfo
                                internalStorage={relatedProduct.internalStorage}
                              />
                              <Typography variant="body2">
                                {formatPrice(relatedProduct.price)} vnd
                              </Typography>
                            </Box>
                          </Button>
                        </Link>
                      ))}
                    </Box>
                    <Typography variant="h6">Colors</Typography>
                    <Box display="flex" gap={2}>
                      {product.colorDTOs.map((color, index) => (
                        <Button
                          key={index}
                          variant={`${
                            color === selectedColor ? "contained" : "outlined"
                          }`}
                          className={`custom-button`}
                          onClick={() => handleColorClick(color)}
                        >
                          {color.colorName}
                        </Button>
                      ))}
                    </Box>
                    <Box display="flex" gap={2} sx={{ mt: "1vw" }}>
                      <TextField
                        type="number"
                        label="Quantity"
                        value={quantity}
                        onChange={handleQuantityChange}
                        inputProps={{ min: 1 }}
                        sx={{ maxWidth: 80 }}
                      />
                    </Box>

                    <Box display="flex" sx={{ mt: "1vw" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ flexGrow: 1 }}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent triggering the Card's onClick event
                          handleAddToCart(product.productId);
                        }}
                      >
                        Add to cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Feedback
          productId={product.productId}
          username={username}
          updateProductRating={updateProductRating}
        />
      </Box>
      <CustomSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default SingleProduct;
