import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Box, TextField, Button, Typography, Alert } from "@mui/material";
import AuthService from "../service/AuthService";
import ProfileService from "../service/customer/ProfileService";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await AuthService.signIn(username, password);
      const role = await ProfileService.getRole(username);

      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError("Incorrect username or password. Please try again.");
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
          border: "2px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        {error && ( // Hiển thị thông báo lỗi nếu có
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
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
