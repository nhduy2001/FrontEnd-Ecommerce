import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Cart = ({ numberCart }) => {
  return (
    <Link to="/cart">
      <IconButton
        size="large"
        aria-label="show 17 new notifications"
        color="inherit"
        sx={{ ml: 1 }}
      >
        <Badge badgeContent={numberCart} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Link>
  );
};

export default Cart;
