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
import Checkbox from "@mui/material/Checkbox";
import CustomSnackbar from "../../components/admin/CustomSnackbar";

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
        const response = await axios.get(
          "http://localhost:8080/api/v1/admin/products/all"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleCheckboxChange = async (productId, newFeaturedValue) => {
    try {
      // Kiểm tra số lượng sản phẩm featured trước khi cập nhật
      const featuredProductsCount = products.filter(
        (product) => product.featured
      ).length;
      if (newFeaturedValue && featuredProductsCount >= 5) {
        // Nếu đã đạt đến giới hạn, hiển thị thông báo hoặc thực hiện các hành động khác
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Exceeded the allowed number of featured products (5 products)!"
        );
        return;
      }

      // Gửi yêu cầu PUT tới endpoint backend để cập nhật sản phẩm
      await axios.put("http://localhost:8080/api/v1/admin/products", {
        ...products.find((product) => product.productId === productId),
        featured: newFeaturedValue,
      });

      // Cập nhật lại danh sách sản phẩm sau khi cập nhật thành công
      const updatedProducts = products.map((product) =>
        product.productId === productId
          ? { ...product, featured: newFeaturedValue }
          : product
      );
      setProducts(updatedProducts);
      // Hiển thị snack bar
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Update success!");
    } catch (error) {
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
