import React, { useState, useEffect } from "react";
import CustomSnackbar from "../../components/CustomSnackbar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TextField,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  Alert,
} from "@mui/material";
import CategoryService from "../../service/admin/CategoryService";

const columns = [
  { id: "categoryId", label: "Id", minWidth: 100 },
  { id: "categoryName", label: "Name", minWidth: 170 },
  { id: "action", label: "Action", minWidth: 100 },
];

const Categories = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await CategoryService.getALlCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleAddClick = async () => {
    const category = {
      categoryName: categoryName,
    };

    try {
      const response = await CategoryService.addCategory(category);

      console.log("Response from backend:", response);

      setCategories([...categories, response]);

      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Category updated successfully!");

      handleAddDialogClose();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddCategory = (category) => {
    setSelectedCategory(category);
    setOpenAddDialog(true);
  };
  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setOpenEditDialog(true);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
  };

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditDialogSave = async () => {
    const category = {
      categoryId: selectedCategory.categoryId,
      categoryName: categoryName,
    };

    try {
      await CategoryService.updateCategory(category);

      const updatedCategories = categories.map((category) =>
        category.categoryId === selectedCategory.categoryId
          ? { ...category, categoryName: categoryName }
          : category
      );
      setCategories(updatedCategories);

      setOpenEditDialog(false);
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Category updated successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteDialogConfirm = async () => {
    try {
      await CategoryService.deleteCategory(selectedCategory.categoryId);
      const updatedCategories = categories.filter(
        (category) => category.categoryId !== selectedCategory.categoryId
      );
      setCategories(updatedCategories);
      setOpenDeleteDialog(false);
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Category deleted successfully!");
    } catch (error) {
      setError(error.message);
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
        <Button variant="contained" onClick={handleAddCategory}>
          <AddCircleIcon />
          Add Category
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
              {categories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((category) => (
                  <TableRow
                    key={category.categoryId}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell key={column.id} align="center">
                          {column.id === "action" ? (
                            <>
                              <IconButton
                                onClick={() => handleEditCategory(category)}
                                color="primary"
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleDeleteCategory(category)}
                                color="secondary"
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </>
                          ) : (
                            category[column.id]
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
          count={categories.length}
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
        <DialogTitle>Add Category</DialogTitle>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={handleInputChange}
          />
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
        <DialogTitle>Edit Category</DialogTitle>
        {error && (
          <Alert severity="error" sx={{ mt: 2, width: "100%" }}>
            {error}
          </Alert>
        )}
        <DialogContent>
          <TextField
            placeholder={selectedCategory ? selectedCategory.categoryName : ""}
            autoFocus
            margin="dense"
            id="categoryName"
            label="Category Name"
            type="text"
            fullWidth
            value={categoryName}
            onChange={handleInputChange}
          />
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
          Are you sure you want to delete this category?
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
    </>
  );
};

export default Categories;
