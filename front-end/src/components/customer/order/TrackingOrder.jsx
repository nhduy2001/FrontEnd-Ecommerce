import React from "react";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Box from "@mui/material/Box";

const TrackingOrder = () => {
  return (
    <Link to="/order">
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
    </Link>
  );
};

export default TrackingOrder;
