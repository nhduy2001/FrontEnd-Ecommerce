import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
  Alert,
} from "@mui/material";
import ColorButton from "../color/ColorButton";
import ColorDialog from "../color/ColorDialog";
import CustomSnackbar from "../../CustomSnackbar";
import ProductService from "../../../service/admin/ProductService";

const AddDialog = ({ open, handleClose, onProductAdded }) => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    averageRating: 0,
    screenSize: 0,
    ram: 0,
    internalStorage: 0,
    price: 0,
    categoryIds: [],
    brandId: "",
    colorDTOs: [],
  });
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);

  // Fetch categories and brands when the component mounts
  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const [categoryResponse, brandResponse] = await Promise.all([
          ProductService.getAllCategories(),
          ProductService.getAllBrands(),
        ]);
        setCategories(categoryResponse);
        setBrands(brandResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCategoriesAndBrands();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleColorButtonClick = () => {
    setOpenColorDialog(true);
  };

  const handleCloseColorDialog = () => {
    setOpenColorDialog(false);
  };

  const handleColorUpload = (uploadedImages) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      colorDTOs: [...prevProduct.colorDTOs, ...uploadedImages],
    }));
  };

  const handleAddClick = async () => {
    try {
      await ProductService.addProduct(product);
      handleClose();
      onProductAdded();
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Product added successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Product</DialogTitle>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Product Name"
            type="text"
            fullWidth
            value={product.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={product.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="screenSize"
            name="screenSize"
            label="Screen Size"
            type="number"
            fullWidth
            value={product.screenSize}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="ram"
            name="ram"
            label="RAM"
            type="number"
            fullWidth
            value={product.ram}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="internalStorage"
            name="internalStorage"
            label="Internal Storage"
            type="number"
            fullWidth
            value={product.internalStorage}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={product.price}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="categoryIds-label">Category</InputLabel>
            <Select
              labelId="categoryIds-label"
              id="categoryIds"
              name="categoryIds"
              multiple
              value={product.categoryIds}
              onChange={handleInputChange}
              input={<Input />}
              renderValue={(selected) =>
                selected
                  .map(
                    (id) =>
                      categories.find((cat) => cat.categoryId === id)
                        ?.categoryName
                  )
                  .join(", ")
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="brandId-label">Brand</InputLabel>
            <Select
              labelId="brandId-label"
              id="brandId"
              name="brandId"
              value={product.brandId}
              onChange={handleInputChange}
            >
              {brands.map((brand) => (
                <MenuItem key={brand.brandId} value={brand.brandId}>
                  {brand.brandName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <ColorButton onClick={handleColorButtonClick} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddClick} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
      <ColorDialog
        open={openColorDialog}
        onClose={handleCloseColorDialog}
        onUpload={handleColorUpload}
      />
      <CustomSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default AddDialog;
