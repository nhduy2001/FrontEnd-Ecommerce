import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CategoryIcon from "@mui/icons-material/Category";
import ReceiptIcon from "@mui/icons-material/Receipt";
import DevicesOtherTwoToneIcon from "@mui/icons-material/DevicesOtherTwoTone";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { deepOrange } from "@mui/material/colors";

const drawerWidth = 240;

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AdminNavbar = ({ open, setOpen }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

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
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search here…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                flexGrow: 0,
                mr: 2,
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={handleOpenUserMenu}
            >
              <Tooltip title="Open settings">
                <IconButton sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepOrange[500] }}>A</Avatar>
                </IconButton>
              </Tooltip>
              <Typography variant="h6" component="div" sx={{ ml: 1 }}>
                Admin
              </Typography>
            </Box>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Box sx={{ display: "flex" }}>
            <img
              src={assets.logo}
              alt="Logo"
              style={{ maxWidth: "180px", width: "100%" }}
            />

            <IconButton onClick={handleDrawerClose}>
              <MenuOpenIcon />
            </IconButton>
          </Box>
        </DrawerHeader>
        <Divider />
        <List>
          <Link
            to="/admin"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              onClick={() => handleListItemClick(0)}
              sx={{
                ...(selectedIndex === 0 && {
                  backgroundColor: "#00FFFF",
                  color: "#1976d2",
                }),
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </Link>

          <Link
            to="/admin/categories"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              onClick={() => handleListItemClick(1)}
              sx={{
                ...(selectedIndex === 1 && {
                  backgroundColor: "#00FFFF",
                  color: "#1976d2",
                }),
              }}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItemButton>
          </Link>

          <Link
            to="/admin/products"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              onClick={() => handleListItemClick(2)}
              sx={{
                ...(selectedIndex === 2 && {
                  backgroundColor: "#00FFFF",
                  color: "#1976d2",
                }),
              }}
            >
              <ListItemIcon>
                <DevicesOtherTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Products" />
            </ListItemButton>
          </Link>

          <Link
            to="/admin/orders"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              onClick={() => handleListItemClick(3)}
              sx={{
                ...(selectedIndex === 3 && {
                  backgroundColor: "#00FFFF",
                  color: "#1976d2",
                }),
              }}
            >
              <ListItemIcon>
                <ReceiptIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItemButton>
          </Link>

          <Link
            to="/admin/accounts"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton
              onClick={() => handleListItemClick(4)}
              sx={{
                ...(selectedIndex === 4 && {
                  backgroundColor: "#00FFFF",
                  color: "#1976d2",
                }),
              }}
            >
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Accounts" />
            </ListItemButton>
          </Link>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
};

export default AdminNavbar;
