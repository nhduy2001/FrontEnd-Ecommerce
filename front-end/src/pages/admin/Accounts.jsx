import React, { useState, useEffect } from "react";
import CustomSnackbar from "../../components/CustomSnackbar";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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
} from "@mui/material";
import AccountService from "../../service/admin/AccountService";

const columns = [
  { id: "username", label: "Username", minWidth: 100 },
  { id: "fullName", label: "Full name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "phoneNumber", label: "Phone number", minWidth: 170 },
  { id: "createdAt", label: "Created On", minWidth: 170 },
  { id: "lastModified", label: "Last Updated On", minWidth: 170 },
  { id: "action", label: "Delete", minWidth: 100 },
];

const Accounts = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await AccountService.getAllAccounts();
        setAccounts(response);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleDeleteAccount = (account) => {
    setSelectedAccount(account);
    setOpenDeleteDialog(true);
  };

  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleDeleteDialogConfirm = async () => {
    try {
      await AccountService.deleteAccount(selectedAccount.userId);
      const updatedAccounts = accounts.filter(
        (account) => account.userId !== selectedAccount.userId
      );
      setAccounts(updatedAccounts);
      setOpenDeleteDialog(false);
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Account deleted successfully!");
    } catch (error) {
      console.error("Error deleting account:", error);
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
              {accounts
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((account) => (
                  <TableRow
                    key={account.userId}
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
                                onClick={() => handleDeleteAccount(account)}
                                color="error"
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </>
                          ) : (
                            account[column.id]
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
          count={accounts.length}
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
          Are you sure you want to delete this account?
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

export default Accounts;
