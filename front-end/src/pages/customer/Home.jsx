import React from "react";
import Box from "@mui/material/Box";
import DisplayFeaturedProducts from "../../components/customer/product/DisplayFeaturedProducts";

const Home = () => {
  return (
    <Box>
      <Box sx={{ mt: 1 }}>
        <DisplayFeaturedProducts />
      </Box>
    </Box>
  );
};

export default Home;
