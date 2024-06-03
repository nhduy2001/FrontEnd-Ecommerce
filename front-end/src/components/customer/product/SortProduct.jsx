import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid, IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const SortProduct = ({ sortDir, onSortChange }) => {
  const handleSort = (direction) => {
    if (sortDir === direction) {
      onSortChange(""); // Hủy sắp xếp nếu người dùng bấm lại nút hiện đang được chọn
    } else {
      onSortChange(direction);
    }
  };
  return (
    <>
      <Box sx={{ minWidth: 275, mt: 1, mb: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Sort products
            </Typography>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body1">Price</Typography>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => handleSort("asc")}
                  color={sortDir === "asc" ? "primary" : "default"}
                >
                  <ArrowUpward />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={() => handleSort("desc")}
                  color={sortDir === "desc" ? "primary" : "default"}
                >
                  <ArrowDownward />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default SortProduct;
