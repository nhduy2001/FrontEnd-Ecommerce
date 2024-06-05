import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import ColorButton from "../color/ColorButton";

const AddProductDialog = ({
  open,
  onClose,
  product,
  categories,
  brands,
  handleInputChange,
  handleAddClick,
  handleColorButtonClick,
}) => (
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
                  categories.find((cat) => cat.categoryId === id)?.categoryName
              )
              .join(", ")
          }
        >
          {categories &&
            categories.map((category) => (
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
          {brands &&
            brands.map((brand) => (
              <MenuItem key={brand.brandId} value={brand.brandId}>
                {brand.brandName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <ColorButton onClick={handleColorButtonClick} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleAddClick} color="primary">
        Add
      </Button>
    </DialogActions>
  </Dialog>
);

export default AddProductDialog;
