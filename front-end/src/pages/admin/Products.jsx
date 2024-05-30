import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import CustomSnackbar from "../../components/admin/CustomSnackbar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import ColorButton from "../../components/admin/color/ColorButton";
import ColorDialog from "../../components/admin/color/ColorDialog";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Input from "@mui/material/Input";
import MenuItem from "@mui/material/MenuItem";

function formatPrice(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "averageRating", label: "Average Rating", minWidth: 100 },
  { id: "ram", label: "Ram", minWidth: 100 },
  { id: "internalStorage", label: "Internal Storage", minWidth: 100 },
  { id: "screenSize", label: "Screen Size", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100, format: formatPrice },
  { id: "action", label: "Action", minWidth: 100 },
];

const Products = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openColorDialog, setOpenColorDialog] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState(0);
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
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const baseURL = "http://localhost:8080/api/v1/admin";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse, brandResponse] =
          await Promise.all([
            axios.get(`${baseURL}/products/all`),
            axios.get(`${baseURL}/categories`),
            axios.get(`${baseURL}/brands`),
          ]);

        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setBrands(brandResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "categoryIds") {
      setProduct((prevProduct) => ({
        ...prevProduct,
        categoryIds: typeof value === "string" ? value.split(",") : value,
      }));
    } else if (name !== "colorDTOs") {
      // Bỏ qua nếu name là "colorDTOs"
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleColorUpload = (uploadedImages) => {
    const foundColor = product.colorDTOs.find(
      (color) => color.colorId === selectedColorId
    );

    if (foundColor) {
      const updatedColors = product.colorDTOs.map((color) => {
        if (color.colorId === selectedColorId) {
          // Nếu tìm thấy màu, thay thế colorName và colorImage của màu đó bằng thông tin từ uploadedImages
          return {
            ...color,
            colorName: uploadedImages[0].colorName,
            colorImage: uploadedImages[0].colorImage,
          };
        }
        return color;
      });

      // Cập nhật state với thông tin màu đã được thay đổi hoặc thêm mới
      setProduct((prevProduct) => ({
        ...prevProduct,
        colorDTOs: updatedColors,
      }));
    } else {
      // Tìm màu có colorId tương ứng trong colorDTOs
      setProduct({
        ...product,
        colorDTOs: [...product.colorDTOs, ...uploadedImages],
      });
    }
  };

  const handleColorButtonClick = () => {
    setOpenColorDialog(true);
  };

  // Close color dialog
  const handleCloseColorDialog = () => {
    setOpenColorDialog(false);
  };

  const handleAddClick = async () => {
    try {
      const response = await axios.post(`${baseURL}/products`, product);
      setProducts([...products, response.data]);
      handleAddDialogClose();
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error adding product!");
    }
  };

  const handleAddProduct = (product) => {
    setSelectedProduct(product);
    setOpenAddDialog(true);
  };
  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setProduct(product);
    setOpenEditDialog(true);
  };

  const handleColorId = (colorId) => {
    setSelectedColorId(colorId);
    setOpenColorDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditDialogSave = async () => {
    try {
      await axios.put(`${baseURL}/products`, product);

      const updatedProducts = products.map((p) =>
        p.productId === product.productId ? product : p
      );
      setProducts(updatedProducts);

      setOpenEditDialog(false);
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error updating product!");
    }
  };

  const handleDeleteDialogConfirm = async () => {
    try {
      await axios.delete(`${baseURL}/products/${selectedProduct.productId}`);
      const updatedProducts = products.filter(
        (product) => product.productId !== selectedProduct.productId
      );
      setProducts(updatedProducts);
      setOpenDeleteDialog(false);
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ mb: "1%" }}>
        <Button variant="contained" onClick={handleAddProduct}>
          <AddCircleIcon />
          Add Product
        </Button>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="center"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage + rowsPerPage
                )
                .map((product) => (
                  <TableRow
                    key={product.productId}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {columns.map((column) => {
                      const value = product[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {column.id === "action" ? (
                            <>
                              <IconButton
                                color="success"
                                onClick={() => handleEditProduct(product)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() => handleDeleteProduct(product)}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </>
                          ) : column.format ? (
                            column.format(value)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <CustomSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleAddDialogClose}>
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
          <Button onClick={handleAddDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddClick} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
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
          <Typography variant="subtitle1">Colors:</Typography>
          <div key="showColor">
            {product.colorDTOs.map((color) => (
              <div key={color.colorId}>
                <span>{color.colorName}</span>
                {/* <Button onClick={() => handleEditColor(color.colorId)}> */}
                <Button onClick={() => handleColorId(color.colorId)}>
                  Edit Color
                </Button>
              </div>
            ))}
          </div>
          <ColorButton onClick={handleColorButtonClick} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditDialogSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteDialogConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <ColorDialog
        open={openColorDialog}
        onClose={handleCloseColorDialog}
        onUpload={handleColorUpload}
      />
    </>
  );
};

export default Products;
