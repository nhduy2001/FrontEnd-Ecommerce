import React from "react";
import { Box } from "@mui/material";
import DisplayAllProducts from "../../components/customer/product/DisplayAllProducts";

const Products = () => {
  return (
    <Box>
      <Box sx={{ mt: 1 }}>
        <DisplayAllProducts />
      </Box>
    </Box>
  );
};

export default Products;
