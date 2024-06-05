import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const ProductTable = ({
  products,
  columns,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleEditProduct,
  handleDeleteProduct,
}) => {
  return (
    <Paper>
      <TableContainer>
        <Table>
          {/* Table Header */}
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          {/* Table Body */}
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow key={product.productId}>
                  {columns.map((column) => (
                    <TableCell key={column.id}>
                      {column.id === "action" ? (
                        <>
                          <IconButton
                            onClick={() => handleEditProduct(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteProduct(product)}
                          >
                            <DeleteForeverIcon />
                          </IconButton>
                        </>
                      ) : (
                        product[column.id]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default ProductTable;
