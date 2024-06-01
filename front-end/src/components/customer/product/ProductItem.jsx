import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";
import StorageInfo from "./StorageInfo";

function formatPrice(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const ProductItem = ({ productList }) => {
  const imagePath = "/products/";

  return (
    <Grid container spacing={2}>
      {productList.map((product, index) => (
        <Grid item xs={12} sm={6} md={2.4} lg={2.4} key={index}>
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardMedia
              component="img"
              image={imagePath + product.colorDTOs[0].colorImage}
              alt=""
            />
            <CardContent>
              <Box sx={{ height: "5vh", overflow: "hidden" }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {product.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" align="center">
                {product.screenSize} inches
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                {product.ram} GB RAM -{" "}
                <StorageInfo internalStorage={product.internalStorage} />
              </Typography>
              <Box display="flex" justifyContent="center">
                <Rating
                  name="read-only"
                  value={product.averageRating}
                  readOnly
                />
              </Box>
              <Typography variant="body2" color="text.secondary" align="center">
                {formatPrice(product.price)} VND
              </Typography>
            </CardContent>
            <Box textAlign="center" sx={{ mb: 2 }}>
              <Button variant="contained">Add to cart</Button>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
export default ProductItem;
