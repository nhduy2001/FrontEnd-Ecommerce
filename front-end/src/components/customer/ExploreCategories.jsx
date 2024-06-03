import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const ExploreCategories = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCategoryClick = (category) => {
    navigate(`/products?keyword=${category}`); // Navigate to the products page with the selected brand
  };

  const category_list = [
    {
      category_name: "gaming",
    },
    {
      category_name: "foldable",
    },
    {
      category_name: "photography",
    },
  ];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <>
      <Box sx={{ minWidth: 275, mt: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Explore based on needs
            </Typography>
            <Grid container spacing={2}>
              {category_list.map((item, index) => (
                <Grid item xs={3} sm={3} md={1.5} key={index}>
                  <Card
                    variant="outlined"
                    sx={{ height: "100%" }}
                    onClick={() => handleCategoryClick(item.category_name)}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: 50,
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                      {capitalizeFirstLetter(item.category_name)}
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ExploreCategories;
