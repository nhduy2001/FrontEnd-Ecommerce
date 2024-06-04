import React, { useState, useEffect } from "react";
import { Grid, Typography, Divider, Button, FormControl } from "@mui/material";
import CheckoutService from "../../../service/customer/CheckoutService";

const FinalCartInfo = ({ detailedCartList, shippingInfo }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = detailedCartList.reduce((accumulator, item) => {
        return accumulator + item.quantity * item.product.price;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [detailedCartList]);

  const addOrder = async () => {
    try {
      await CheckoutService.addOrder(shippingInfo, totalPrice);
      console.log("Order confirmed!");
    } catch (error) {
      console.error("Failed to confirm order:", error);
    }
  };

  if (!detailedCartList) {
    return <Typography>Loading...</Typography>;
  }

  function formatPrice(n) {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <Grid item xs={12} md={7}>
      <Typography variant="h5" gutterBottom>
        Cart Information
      </Typography>
      {detailedCartList.map((item, index) => (
        <Grid container spacing={2} key={index} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <Typography variant="body1">{item.product.name}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1">
              Color: {item.color.colorName}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">Quantity: {item.quantity}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">
              {formatPrice(item.quantity * item.product.price)}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold">
            Total price:
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Pay Type
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1" fontWeight="bold" align="right">
            {formatPrice(totalPrice)}
          </Typography>
          <Typography variant="body1" fontWeight="bold" align="right">
            Cash On Delivery
          </Typography>
        </Grid>
      </Grid>
      <FormControl fullWidth sx={{ mt: 2 }}></FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={addOrder}
      >
        Confirm
      </Button>
    </Grid>
  );
};

export default FinalCartInfo;
