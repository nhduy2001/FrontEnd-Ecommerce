import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductService from "../../../service/customer/ProductService";
import ProductItem from "./ProductItem";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import FilterProduct from "./FilterProduct";
import SortProduct from "./SortProduct";

const DisplayAllProducts = () => {
  const [productList, setProductList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const [filters, setFilters] = useState({
    ram: query.get("ram") || "",
    storage: query.get("storage") || "",
    screen_size: query.get("screen_size") || "",
    keyword: query.get("keyword") || "",
  });
  const [sortDir, setSortDir] = useState(query.get("sortDir") || "");

  const buildQueryString = (params) => {
    const query = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      if (params[key]) query.append(key, params[key]);
    });
    return query.toString();
  };

  const fetchProducts = useCallback(() => {
    const queryString = buildQueryString({ ...filters, page, sortDir });
    ProductService.getAllProducts(queryString)
      .then((data) => {
        setProductList(data.content);
        setTotalProducts(data.totalElements);
      })
      .catch((error) => {
        console.error("Cannot get products:", error.message);
      });
  }, [filters, page, sortDir]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Xử lý sự kiện khi từ khóa tìm kiếm thay đổi
  useEffect(() => {
    const keyword = new URLSearchParams(location.search).get("keyword") || "";
    setFilters((prevFilters) => ({
      ...prevFilters,
      keyword: keyword,
    }));
  }, [location.search]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    const queryString = buildQueryString({ ...newFilters, sortDir, page: 1 });
    navigate(`/products?${queryString}`);
  };

  const handleSortChange = (newSortDir) => {
    setSortDir(newSortDir);
    const queryString = buildQueryString({
      ...filters,
      sortDir: newSortDir,
      page: 1,
    }); // Reset về trang 1 khi thay đổi sắp xếp
    navigate(`/products?${queryString}`);
  };

  return (
    <div>
      <FilterProduct onFilterChange={handleFilterChange} />
      <SortProduct sortDir={sortDir} onSortChange={handleSortChange} />

      <Box sx={{ minWidth: 275 }}>
        <Card variant="outlined">
          <CardContent>
            <ProductItem productList={productList} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "1.5vw",
              }}
            >
              <Pagination
                page={page}
                count={Math.ceil(totalProducts / 10)}
                variant="outlined"
                color="primary"
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/products${
                      item.page === 1 ? "" : `?page=${item.page}`
                    }`}
                    {...item}
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default DisplayAllProducts;
