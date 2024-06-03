import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box, CssBaseline, AppBar, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminNavbar from "./admin/AdminNavbar";
import CustomerNavBar from "./customer/CustomerNavBar";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import AdminProducts from "../pages/admin/Products";
import Orders from "../pages/admin/Orders";
import Accounts from "../pages/admin/Accounts";
import Home from "../pages/customer/Home";
import CustomerProducts from "../pages/customer/Products";
import SingleProduct from "../pages/customer/SingleProduct";
import Cart from "../pages/customer/Cart";
import Header from "../components/customer/Header";
import ExploreBrands from "../components/customer/ExploreBrands";
import ExploreCategories from "./customer/ExploreCategories";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const [open, setOpen] = useState(true);

  return (
    <div className="app">
      {isAdminRoute ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AdminNavbar open={open} setOpen={setOpen} />
          <Main open={open}>
            <DrawerHeader />
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/categories" element={<Categories />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/accounts" element={<Accounts />} />
            </Routes>
          </Main>
        </Box>
      ) : (
        <>
          <AppBar position="static" sx={{ mb: 1 }}>
            <Container maxWidth="lg">
              <CustomerNavBar />
            </Container>
          </AppBar>
          <Container maxWidth="lg">
            <Header />
            <ExploreBrands />
            <ExploreCategories />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<CustomerProducts />} />
              <Route path="/products/:productId" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </Container>
        </>
      )}
    </div>
  );
};

export default MainLayout;
