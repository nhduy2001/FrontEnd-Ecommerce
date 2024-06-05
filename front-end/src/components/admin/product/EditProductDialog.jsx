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
  Typography,
} from "@mui/material";
import ColorButton from "../color/ColorButton";

const EditProductDialog = ({
  open,
  onClose,
  product,
  categories,
  brands,
  handleInputChange,
  handleEditDialogSave,
  handleColorButtonClick,
  handleColorId,
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Edit Product</DialogTitle>
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
      <Typography variant="subtitle1">Colors:</Typography>
      <div key="showColor">
        {product.colorDTOs.map((color) => (
          <div key={color.colorId}>
            <span>{color.colorName}</span>
            <Button onClick={() => handleColorId(color.colorId)}>
              Edit Color
            </Button>
          </div>
        ))}
      </div>
      <ColorButton onClick={handleColorButtonClick} />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={handleEditDialogSave} color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default EditProductDialog;
