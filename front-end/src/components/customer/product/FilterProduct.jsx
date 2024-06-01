import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import StorageInfo from "./StorageInfo";

const FilterProduct = ({ onFilterChange }) => {
  const [ram, setRam] = useState("");
  const [storage, setStorage] = useState("");
  const [screenSize, setScreenSize] = useState("");

  const handleRamChange = (event) => {
    const newRam = event.target.value;
    setRam(newRam);
    onFilterChange({ ram: newRam, storage, screen_size: screenSize });
  };

  const handleStorageChange = (event) => {
    const newStorage = event.target.value;
    setStorage(newStorage);
    onFilterChange({ ram, storage: newStorage, screen_size: screenSize });
  };

  const handleScreenSizeChange = (event) => {
    const newScreenSize = event.target.value;
    setScreenSize(newScreenSize);
    onFilterChange({ ram, storage, screen_size: newScreenSize });
  };

  return (
    <>
      <Box sx={{ minWidth: 275, mt: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Filter products
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="ram-select-label">RAM</InputLabel>
                  <Select
                    labelId="ram-select-label"
                    value={ram}
                    onChange={handleRamChange}
                    label="RAM"
                    endAdornment={
                      ram && (
                        <IconButton
                          aria-label="clear selection"
                          onClick={() => {
                            setRam("");
                            onFilterChange({
                              ram: "",
                              storage,
                              screen_size: screenSize,
                            });
                          }}
                          edge="end"
                        >
                          <ClearIcon />
                        </IconButton>
                      )
                    }
                  >
                    {[2, 4, 8, 16].map((value) => (
                      <MenuItem key={value} value={value}>
                        {value} GB
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="storage-select-label">Storage</InputLabel>
                  <Select
                    labelId="storage-select-label"
                    value={storage}
                    onChange={handleStorageChange}
                    label="Storage"
                    endAdornment={
                      storage && (
                        <IconButton
                          aria-label="clear selection"
                          onClick={() => {
                            setStorage("");
                            onFilterChange({
                              ram,
                              storage: "",
                              screen_size: screenSize,
                            });
                          }}
                          edge="end"
                        >
                          <ClearIcon />
                        </IconButton>
                      )
                    }
                  >
                    {[1, 32, 64, 128, 256, 512].map((value) => (
                      <MenuItem key={value} value={value}>
                        <StorageInfo internalStorage={value} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={2.4} lg={2.4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="screen-size-select-label">
                    Screen size
                  </InputLabel>
                  <Select
                    labelId="screen-size-select-label"
                    value={screenSize}
                    onChange={handleScreenSizeChange}
                    label="Screen size"
                    endAdornment={
                      screenSize && (
                        <IconButton
                          aria-label="clear selection"
                          onClick={() => {
                            setScreenSize("");
                            onFilterChange({ ram, storage, screen_size: "" });
                          }}
                          edge="end"
                        >
                          <ClearIcon />
                        </IconButton>
                      )
                    }
                  >
                    <MenuItem value="duoi-6.5-inch">Less than 6.5 inch</MenuItem>
                    <MenuItem value="tren-6.5-inch">Larger than 6.5 inch</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
export default FilterProduct;
