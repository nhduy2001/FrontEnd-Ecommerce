import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

const DeleteProductDialog = ({ open, onClose, onConfirm }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm Delete</DialogTitle>
    <DialogContent>Are you sure you want to delete this product?</DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default DeleteProductDialog;
