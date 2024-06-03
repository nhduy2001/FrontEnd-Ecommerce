import React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Box from "@mui/material/Box";

const TrackingOrder = () => {
  return (
    <IconButton size="large" aria-label="show tracking order" color="inherit">
      <LocalShippingIcon />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          ml: 1,
        }}
      >
        <Typography variant="caption" component="div">
          Tracking
        </Typography>
        <Typography variant="caption" component="div">
          Order
        </Typography>
      </Box>
    </IconButton>
  );
};

export default TrackingOrder;
