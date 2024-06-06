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
  Typography,
  Alert,
} from "@mui/material";
import ProductService from "../../../service/admin/ProductService";
import CustomSnackbar from "../../CustomSnackbar";
import ColorButton from "../color/ColorButton";
import ColorDialog from "../color/ColorDialog";

const EditDialog = ({ open, handleClose, product, onProductUpdated }) => {
  const [editedProduct, setEditedProduct] = useState({
    productId: product?.productId || "",
    name: product?.name || "",
    description: product?.description || "",
    screenSize: product?.screenSize || 0,
    ram: product?.ram || 0,
    internalStorage: product?.internalStorage || 0,
    price: product?.price || 0,
    categoryIds: product?.categoryIds || [],
    brandId: product?.brandId || "",
    colorDTOs: product?.colorDTOs || [],
  });
  const [selectedColorId, setSelectedColorId] = useState(0);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);

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

  useEffect(() => {
    setEditedProduct({
      productId: product?.productId || "",
      name: product?.name || "",
      description: product?.description || "",
      screenSize: product?.screenSize || 0,
      ram: product?.ram || 0,
      internalStorage: product?.internalStorage || 0,
      price: product?.price || 0,
      categoryIds: product?.categoryIds || [],
      brandId: brands.some((brand) => brand.brandId === product?.brandId)
        ? product?.brandId
        : "",
      colorDTOs: product?.colorDTOs || [],
    });
  }, [product, brands]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  console.log(editedProduct);

  const handleColorButtonClick = (colorId) => {
    setSelectedColorId(colorId);
    setOpenColorDialog(true);
  };

  const handleCloseColorDialog = () => {
    setOpenColorDialog(false);
  };

  const handleColorUpload = (uploadedImages) => {
    if (selectedColorId !== 0) {
      // Nếu đã chọn màu để sửa
      const updatedColors = editedProduct.colorDTOs.map((color) => {
        if (color.colorId === selectedColorId) {
          return {
            ...color,
            colorName: uploadedImages[0].colorName,
            colorImage: uploadedImages[0].colorImage,
          };
        }
        return color;
      });
  
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        colorDTOs: updatedColors,
      }));
    } else {
      // Nếu không có màu nào được chọn để sửa, tức là thêm màu mới
      const newColorId = editedProduct.colorDTOs.length + 1; // Tạo id mới cho màu
      const newColor = { ...uploadedImages[0], colorId: newColorId }; // Thêm id vào màu mới
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        colorDTOs: [...prevProduct.colorDTOs, newColor],
      }));
    }
  };

  const handleSaveClick = async () => {
    try {
      await ProductService.updateProduct(editedProduct);
      handleClose();
      onProductUpdated();
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Product updated successfully!");
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
        <DialogTitle>Edit Product</DialogTitle>
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
            value={editedProduct.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editedProduct.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="screenSize"
            name="screenSize"
            label="Screen Size"
            type="number"
            fullWidth
            value={editedProduct.screenSize}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="ram"
            name="ram"
            label="RAM"
            type="number"
            fullWidth
            value={editedProduct.ram}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="internalStorage"
            name="internalStorage"
            label="Internal Storage"
            type="number"
            fullWidth
            value={editedProduct.internalStorage}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="price"
            name="price"
            label="Price"
            type="number"
            fullWidth
            value={editedProduct.price}
            onChange={handleInputChange}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="categoryIds-label">Category</InputLabel>
            <Select
              labelId="categoryIds-label"
              id="categoryIds"
              name="categoryIds"
              multiple
              value={editedProduct.categoryIds}
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
              value={editedProduct.brandId}
              onChange={handleInputChange}
            >
              {brands.map((brand) => (
                <MenuItem key={brand.brandId} value={brand.brandId}>
                  {brand.brandName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="subtitle1">Colors:</Typography>
          {(editedProduct.colorDTOs || []).map((color) => (
            <div key={color.colorId}>
              <span>{color.colorName}</span>
              <Button onClick={() => handleColorButtonClick(color.colorId)}>
                Edit Color
              </Button>
            </div>
          ))}
          <ColorButton onClick={handleColorButtonClick} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
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

export default EditDialog;
