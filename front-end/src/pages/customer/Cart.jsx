import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import CartService from "../../service/customer/CartService";
import ProductService from "../../service/customer/ProductService";
import StorageInfo from "../../components/customer/product/StorageInfo";

function formatPrice(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const Cart = () => {
  const [detailedCartList, setDetailedCartList] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const isLogin = JSON.parse(localStorage.getItem("user"));
    const fetchCartAndProductDetails = async () => {
      try {
        // Fetch cart items
        const carts = await CartService.getCart();
        console.log("Cart items:", carts);

        // Extract product IDs from cart items
        const productIds = carts.map((cart) => cart.productId);

        // Fetch product details for each productId
        const productPromises = productIds.map((id) =>
          ProductService.getProductById(id)
        );
        const products = await Promise.all(productPromises);

        // Combine cart items with product details and corresponding color info
        const detailedCartItems = carts.map((cartItem) => {
          const product = products.find(
            (p) => p.productId === cartItem.productId
          );
          const color = product.colorDTOs.find(
            (c) => c.colorId === cartItem.colorId
          );
          return { ...cartItem, product, color };
        });

        setDetailedCartList(detailedCartItems);
        console.log("Detailed Cart items:", detailedCartItems);
      } catch (error) {
        console.error("Error when get all products from cart:", error.message);
      }
    };
    if (isLogin) {
      fetchCartAndProductDetails();
    }
  }, []);

  const handleUpdateQuantity = (cartDetailId, newQuantity) => {
    try {
      // Lấy chi tiết sản phẩm từ giỏ hàng dựa trên cartDetailId
      const updatedCartList = detailedCartList.map((item) => {
        if (item.cartDetailId === cartDetailId) {
          // Cập nhật số lượng sản phẩm
          return { ...item, quantity: parseInt(newQuantity) };
        }
        return item;
      });

      // Cập nhật giỏ hàng với số lượng sản phẩm mới
      setDetailedCartList(updatedCartList);
    } catch (error) {
      console.error(
        `Lỗi khi cập nhật số lượng cho sản phẩm có cartDetailId ${cartDetailId}: ${error.message}`
      );
    }
  };

  const handleRemoveProduct = (cartDetailId) => {
    // Xử lý xoá sản phẩm ở đây
    console.log(`Xoá sản phẩm có cartDetailId ${cartDetailId}`);
  };

  const handleCheckout = async () => {
    try {
      const response = await CartService.updateCart(detailedCartList);
      console.log("Update cart successfully:", response);
    } catch (error) {
      console.error("Error update cart:", error.message);
    }
  };

  return (
    <Box sx={{ minWidth: 275, mt: 1 }}>
      <Card variant="outlined">
        <CardContent>
          {detailedCartList.map((item, index) => (
            <Grid container spacing={2} alignItems="center" key={index}>
              <Grid item xs={2}>
                <Box
                  sx={{
                    width: 170,
                    height: 170,
                    borderRadius: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={`/products/${item.color.colorImage}`}
                    alt={`${item.product.name} - ${item.color.colorName}`}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </Box>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body1">{item.product.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2" color="text.secondary">
                  {item.color.colorName}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography variant="body2" color="text.secondary">
                  <StorageInfo internalStorage={item.product.internalStorage} />
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="body2">
                  {formatPrice(item.quantity * item.product.price)}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  defaultValue={item.quantity}
                  onChange={(e) =>
                    handleUpdateQuantity(item.cartDetailId, e.target.value)
                  }
                  inputProps={{ min: 1 }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  color="secondary"
                  onClick={() => handleRemoveProduct(item.cartDetailId)}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Link to="/checkout">
            <Grid container justifyContent="center">
              {user && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleCheckout()}
                >
                  Proceed to checkout
                </Button>
              )}
            </Grid>
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Cart;
