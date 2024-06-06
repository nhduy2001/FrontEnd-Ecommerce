import React, { useState, useEffect } from "react";
import CustomSnackbar from "../../components/CustomSnackbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import ProductService from "../../service/admin/ProductService";
import AddDialog from "../../components/admin/product/AddDialog";
import EditDialog from "../../components/admin/product/EditDialog";
import DeleteDialog from "../../components/admin/product/DeleteDialog";

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
    fetchData();
  }, []);

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

  const handleProductChanged = () => {
    fetchData();
  };

  const getCategoryNames = (categoryIds) => {
    // Create an array of category name by categoryIds
    const categoryNames = categoryIds.map((categoryId) => {
      // Find the category based on categoryId
      const category = categories.find((cat) => cat.categoryId === categoryId);

      // Return the name of category if found
      return category ? category.categoryName : null;
    });

    // Filter out null value and return the category name type string, separated by commas and spaces 
    return categoryNames.filter((name) => name !== null).join(", ");
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
      <AddDialog
        open={openAddDialog}
        handleClose={handleAddDialogClose}
        onProductAdded={handleProductChanged}
      />
      {/* Edit Dialog */}
      <EditDialog
        open={openEditDialog}
        handleClose={handleEditDialogClose}
        product={selectedProduct}
        onProductUpdated={handleProductChanged}
      />
      {/* Delete Dialog */}
      <DeleteDialog open={openDeleteDialog}
        handleClose={handleDeleteDialogClose}
        selectedProduct={selectedProduct}
        onProductDeleted={handleProductChanged} />
    </>
  );
};

export default Products;
