import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductService from "../../../service/customer/ProductService";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ProductItem from "./ProductItem";
import { Button } from "@mui/material";

const DisplayFeaturedProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // Gọi ProductService để lấy danh sách sản phẩm nổi bật từ backend khi component được mount
    ProductService.getFeaturedProducts()
      .then((products) => {
        setProductList(products);
      })
      .catch((error) => {
        console.error(
          "Đã xảy ra lỗi khi lấy danh sách sản phẩm:",
          error.message
        );
      });
  }, []);

  return (
    <div>
      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Featured Products
            </Typography>
            <ProductItem productList={productList} />
            <Link to="/products">
              <Box textAlign="center" sx={{ mt: 2 }}>
                <Button variant="contained">View all products</Button>
              </Box>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default DisplayFeaturedProducts;
