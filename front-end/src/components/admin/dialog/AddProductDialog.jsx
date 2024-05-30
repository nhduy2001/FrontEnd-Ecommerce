import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import ImageUpload from "../ImageUpload";

const AddProductDialog = ({ open, onClose, onSave }) => {
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
    colorDTOs: {
      image: "",
      // other colorDTO fields...
    },
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const handleUpload = (imageName) => {
    setProduct({
      ...product,
      colorDTOs: { ...product.colorDTOs, image: imageName },
    });
  };

  const handleSave = () => {
    onSave(product);
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Product</DialogTitle>
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
            id="averageRating"
            name="averageRating"
            label="Average Rating"
            type="number"
            fullWidth
            value={product.averageRating}
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
          <ImageUpload onUpload={handleUpload} />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <ColorButton onClick={handleColorButtonClick} />
      <ColorDialog open={openColorDialog} onClose={handleCloseColorDialog} />
    </>
  );
};

export default AddProductDialog;
