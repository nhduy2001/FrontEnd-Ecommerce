import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Box, Typography, TextField, Button } from "@mui/material";
import ProfileService from "../../service/customer/ProfileService";
import CustomSnackbar from "../../components/CustomSnackbar";

const Profile = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await ProfileService.getUserProfile();
        setUserData(response);
      } catch (error) {
        throw error;
      }
    };
    fetchUserProfile();
  }, []);

  const handleSignUp = async () => {
    try {
      await ProfileService.updateProfile(userData);
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Profile updated successfully!");
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevUserData) => ({ ...prevUserData, [name]: value }));
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ minWidth: 275, mt: 1 }}>
        <Card variant="outlined">
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "2px solid #ccc",
                borderRadius: "10px",
                padding: "20px",
                width: "50%",
                margin: "auto",
              }}
            >
              <Typography component="h1" variant="h5">
                User Profile
              </Typography>
              <Box component="form" onSubmit={handleSignUp} sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Username"
                  name="username"
                  value={userData.username}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Blank if not change"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={userData.phoneNumber}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleSignUp}
                >
                  Update
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
      <CustomSnackbar
        open={snackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
        handleClose={handleCloseSnackbar}
      />
    </>
  );
};

export default Profile;
