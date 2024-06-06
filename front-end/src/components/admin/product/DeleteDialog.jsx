import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import CustomSnackbar from "../../CustomSnackbar";
import ProductService from "../../../service/admin/ProductService";

const DeleteDialog = ({
  open,
  handleClose,
  selectedProduct,
  onProductDeleted,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleDeleteDialogConfirm = async () => {
    try {
      await ProductService.deleteProduct(selectedProduct.productId);
      onProductDeleted(selectedProduct.productId);
      handleClose();
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Product deleted successfully!");
      onProductDeleted();
    } catch (error) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Product deleted failed!");
      onProductDeleted();
    }
  };

  const handleCloseSnackbar = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteDialogConfirm} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <CustomSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default DeleteDialog;
