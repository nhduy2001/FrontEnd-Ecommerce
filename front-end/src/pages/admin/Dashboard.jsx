import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import CustomSnackbar from "../../components/CustomSnackbar";
import DashboardService from "../../service/admin/DashboardService";

function formatPrice(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
}

const columns = [
  { id: "featured", label: "Featured", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "averageRating", label: "Average Rating", minWidth: 100 },
  { id: "ram", label: "Ram", minWidth: 100 },
  { id: "internalStorage", label: "Internal Storage", minWidth: 100 },
  { id: "screenSize", label: "Screen Size", minWidth: 100 },
  { id: "price", label: "Price", minWidth: 100, format: formatPrice },
];

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await DashboardService.getAllProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckboxChange = async (productId, newFeaturedValue) => {
    try {
      await DashboardService.updateProduct(
        productId,
        newFeaturedValue,
        products,
        setProducts,
        setSnackbarOpen,
        setSnackbarSeverity,
        setSnackbarMessage
      );
    }catch (error) {
      console.error("Error updating product:", error);
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
              {products
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                          {column.id === "featured" ? (
                            <Checkbox
                              checked={value}
                              onChange={(event) =>
                                handleCheckboxChange(
                                  product.productId,
                                  event.target.checked
                                )
                              }
                            />
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
    </>
  );
};

export default Dashboard;
