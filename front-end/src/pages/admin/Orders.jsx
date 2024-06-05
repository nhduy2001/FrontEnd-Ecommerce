import React, { useState, useEffect } from "react";
import CustomSnackbar from "../../components/CustomSnackbar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
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
  Grid,
} from "@mui/material";
import OrderService from "../../service/admin/OrderService";
import AccountService from "../../service/admin/AccountService";

const columns = [
  {
    id: "userId",
    label: "Username",
    maxWidth: 100,
  },
  { id: "fullName", label: "Full name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "phoneNumber", label: "Phone number", minWidth: 170 },
  { id: "totalPrice", label: "Total price", minWidth: 100 },
  { id: "status", label: "Status", minWidth: 170 },
  { id: "payType", label: "Pay type", minWidth: 100 },
  { id: "action", label: "Action", minWidth: 210 },
];

const Orders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getAllOrders();
        setOrders(response);

        const usernamesTemp = {};
        for (const order of response) {
          const username = await AccountService.getUserByUserId(order.userId);
          usernamesTemp[order.userId] = username;
        }
        setUsernames(usernamesTemp);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdateStatus = async (order) => {
    try {
      const updatedOrder = await OrderService.updateStatus(order.orderId);
      setOrders((prevOrders) =>
        prevOrders.map((o) => (o.orderId === order.orderId ? updatedOrder : o))
      );
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Order status updated successfully!");
    } catch (error) {
      console.error("Error updating order status:", error);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error updating order status.");
    }
  };

  const handleDeleteOrder = (order) => {
    setSelectedOrder(order);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogConfirm = async () => {
    try {
      await OrderService.deleteOrder(selectedOrder.orderId);
      const updatedOrders = orders.filter(
        (order) => order.orderId !== selectedOrder.orderId
      );
      setOrders(updatedOrders);
      setOpenDeleteDialog(false);
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Order deleted successfully!");
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage("Error to delete order!");
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
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order) => (
                  <TableRow
                    key={order.orderId}
                    hover
                    role="checkbox"
                    tabIndex={-1}
                  >
                    {columns.map((column) => {
                      const value = order[column.id];
                      return (
                        <TableCell key={column.id} align="center">
                          {column.id === "action" ? (
                            <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                <Button
                                  variant="contained"
                                  onClick={() => handleUpdateStatus(order)}
                                  disabled={order.status === "COMPLETED"}
                                >
                                  <TaskAltIcon />
                                  Update
                                </Button>
                              </Grid>
                              <Grid item>
                                <IconButton
                                  onClick={() => handleDeleteOrder(order)}
                                  color="error"
                                >
                                  <DeleteForeverIcon />
                                </IconButton>
                              </Grid>
                            </Grid>
                          ) : column.id === "userId" ? (
                            usernames[value]
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
          count={orders.length}
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
      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this order?
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

export default Orders;
