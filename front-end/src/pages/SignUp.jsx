import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";
import AuthService from "../service/AuthService";

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    role: "user",
    confirmed: true,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await AuthService.signUp(userData);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const val = type === "checkbox" ? checked : value;
    setUserData({ ...userData, [name]: val });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        {error && ( 
          <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={userData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={userData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="fullName"
            label="Full Name"
            name="fullName"
            autoComplete="fullName"
            value={userData.fullName}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            autoComplete="address"
            value={userData.address}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to="/login">Already have an account? Login</Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
