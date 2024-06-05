import React, { useState, useEffect } from "react";
import CustomSnackbar from "../../components/CustomSnackbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ColorButton from "../../components/admin/color/ColorButton";
import ColorDialog from "../../components/admin/color/ColorDialog";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  Input,
  MenuItem,
} from "@mui/material";
import ProductService from "../../service/admin/ProductService";

function formatPrice(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const columns = [
  { id: "colorDTOs", label: "Image", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "categoryIds", label: "Category", minWidth: 100 },
  { id: "ram", label: "Ram", minWidth: 100 },
  { id: "internalStorage", label: "Internal Storage", minWidth: 100 },
  { id: "screenSize", label: "Screen Size", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100, format: formatPrice },
  { id: "createdAt", label: "Create On", minWidth: 100, format: formatPrice },
  {
    id: "lastModified",
    label: "Last Updated On",
    minWidth: 100,
    format: formatPrice,
  },
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productResponse, categoryResponse, brandResponse] =
          await Promise.all([
            ProductService.getAllProducts(),
            ProductService.getAllCategories(),
            ProductService.getAllBrands(),
          ]);

        setProducts(productResponse);
        setCategories(categoryResponse);
        setBrands(brandResponse);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getCategoryNames = (categoryIds) => {
    // Sử dụng map để tạo một mảng các tên danh mục từ categoryIds
    const categoryNames = categoryIds.map((categoryId) => {
      // Tìm kiếm danh mục tương ứng với categoryId trong danh sách categories
      const category = categories.find((cat) => cat.categoryId === categoryId);

      // Trả về tên của danh mục nếu tìm thấy
      return category ? category.categoryName : null;
    });

    // Lọc bỏ các giá trị null và trả về chuỗi kết hợp các tên danh mục, ngăn cách bằng dấu phẩy và khoảng trắng
    return categoryNames.filter((name) => name !== null).join(", ");
  };

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
      const response = ProductService.addProduct(product);
      setProducts([...products, response]);
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
      ProductService.updateProduct(product);

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
      ProductService.deleteProduct(selectedProduct.productId);
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
                          {column.id === "categoryIds" ? (
                            getCategoryNames(value)
                          ) : column.id === "colorDTOs" && value.length > 0 ? (
                            <img
                              src={`/products/${value[0].colorImage}`}
                              alt=""
                              style={{ width: "100px", height: "100px" }}
                            />
                          ) : column.id === "action" ? (
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
          {product.colorDTOs.map((color) => (
            <div key={color.colorId}>
              <span>{color.colorName}</span>
              {/* <Button onClick={() => handleEditColor(color.colorId)}> */}
              <Button onClick={() => handleColorId(color.colorId)}>
                Edit Color
              </Button>
            </div>
          ))}
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
