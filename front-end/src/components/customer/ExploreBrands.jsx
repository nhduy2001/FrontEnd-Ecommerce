import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import { brand_list } from "../../components/assets/assets";
import Typography from "@mui/material/Typography";

const ExploreBrands = () => {
  return (
    <>
      <Box sx={{ minWidth: 275, mt: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Explore our brands
            </Typography>
            <Grid container spacing={2}>
              {brand_list.map((item, index) => (
                <Grid item xs={3} sm={3} md={1.5} key={index}>
                  <Card variant="outlined" sx={{ height: "100%" }}>
                    <Box
                      sx={{
                        width: "100%",
                        height: 50,
                        borderRadius: 1,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.brand_image}
                        alt={`Brand ${index}`}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                        }}
                      />
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

export default ExploreBrands;
