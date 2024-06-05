import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Grid,
} from "@mui/material";

const OrderCard = ({ order, index }) => {
  if (!order) {
    return <CircularProgress />;
  }

  if (!order.orderDetailsDTOs) {
    return <CircularProgress />;
  }

  function formatPrice(n) {
    return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Order {index + 1}: {order.status}
        </Typography>
        {order.orderDetailsDTOs.map((detail) => (
          <Paper
            key={detail.orderDetailId}
            sx={{ display: "flex", mb: 2, p: 2 }}
          >
            <CardMedia
              component="img"
              sx={{ width: 151 }}
              image={`/products/${detail.color.colorImage}`}
              alt={detail.productName}
            />
            <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
              <Typography component="div" variant="h6">
                {detail.product.name}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Color: {detail.color.colorName}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Quantity: {detail.quantity}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Price: {formatPrice(detail.product.price)} VND
              </Typography>
            </Box>
          </Paper>
        ))}
        <Grid container direction="column" alignItems="flex-end">
          <Typography variant="body1" component="div">
            Address: {order.address}
          </Typography>
          <Typography variant="body1" component="div">
            Phone number: {order.phoneNumber}
          </Typography>
          <Typography variant="h6" component="div">
            Total: {formatPrice(order.totalPrice)} VND
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
