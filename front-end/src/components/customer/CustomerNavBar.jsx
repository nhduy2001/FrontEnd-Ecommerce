import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import TrackingOrder from "./order/TrackingOrder";
import Cart from "./cart/Cart";
import LoginCheck from "./loginCheck/LoginCheck";
import CartService from "../../service/customer/CartService";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "26.3vw",
    },
  },
}));

const CustomerNavBar = () => {
  const [numberCart, setNumberCart] = useState(0); // State to store the number of items in the cart
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCartDetails() {
      try {
        const cartDetails = await CartService.getCart();
        setNumberCart(cartDetails.length); // Set the number of items in the cart
      } catch (error) {
        console.error("Failed to fetch cart details", error);
      }
    }
    fetchCartDetails();
  }, []); // Fetch cart details on component mount

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/products?keyword=${searchTerm}`);
    }
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ p: "0 !important" }}>
          <Link to="/">
            <Box sx={{ display: "flex" }}>
              <img
                src={assets.logo}
                alt="Logo"
                style={{ maxWidth: "180px", width: "100%" }}
              />
            </Box>
          </Link>
          <Link to="/products">
            <IconButton size="large" color="inherit">
              <DevicesOtherIcon />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  ml: 1,
                }}
              >
                <Typography variant="subtitle1" component="div">
                  Product
                </Typography>
              </Box>
            </IconButton>
          </Link>
          <Search sx={{ flexGrow: 1 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search here…"
              inputProps={{ "aria-label": "search" }}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
          </Search>
          <Box
            sx={{ display: { xs: "flex", md: "flex", alignItems: "center" } }}
          >
            <TrackingOrder />
            <Cart numberCart={numberCart} />{" "}
            {/* Render the cart component with the number of items */}
            <LoginCheck />
          </Box>
        </Toolbar>
      </Box>
    </div>
  );
};
export default CustomerNavBar;
