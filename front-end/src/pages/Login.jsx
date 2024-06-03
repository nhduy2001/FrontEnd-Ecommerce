import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make a POST request to your backend API for authentication
      const response = await axios.post(
        "http://localhost:8080/api/v1/public/signIn",
        {
          username,
          password,
        }
      );

      console.log(localStorage.getItem("token"));

      const token = response.data.token;
      const refreshToken = response.data.refreshToken;
      const user = jwtDecode(token);

      // Store the token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user.sub)); 

      // Redirect or perform any action upon successful login
      navigate("/");
      console.log("Login successful");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Link to="/signup">
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              Don't have an account? Sign Up
            </Box>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
