import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Grid } from "@mui/material";
import ShippingInfo from "../../components/customer/order/ShippingInfo";
import FinalCartInfo from "../../components/customer/order/FinalCartInfo";
import CheckoutService from "../../service/customer/CheckoutService";
import ProductService from "../../service/customer/ProductService";

const Checkout = () => {
  const [detailedCartList, setDetailedCartList] = useState([]);
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        // Fetch cart details
        const carts = await CheckoutService.getCart();
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
      } catch (error) {
        console.error("Failed to fetch cart details:", error);
      }
    };

    const fetchShippingInfo = async () => {
      try {
        // Fetch shipping information
        const userInfo = await CheckoutService.getShippingInfo();

        const filteredInfo = {
          fullName: userInfo.fullName || "",
          email: userInfo.email || "",
          address: userInfo.address || "",
          phoneNumber: userInfo.phoneNumber || "",
        };

        setShippingInfo(filteredInfo);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchCartDetails();
    fetchShippingInfo();
  }, []);

  // Function to update shipping information
  const handleShippingInfoChange = (newInfo) => {
    setShippingInfo(newInfo);
  };

  return (
    <Box sx={{ minWidth: 275, mt: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Grid container spacing={2}>
            <ShippingInfo
              user={shippingInfo}
              onUserChange={handleShippingInfoChange}
            />
            <FinalCartInfo
              detailedCartList={detailedCartList}
              shippingInfo={shippingInfo}
            />
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Checkout;
