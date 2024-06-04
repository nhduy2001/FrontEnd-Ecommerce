import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField } from "@mui/material";

const ShippingInfo = ({ user, onUserChange }) => {
  const [changeInfo, setChangeInfo] = useState({
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (user) {
      setChangeInfo({
        fullName: user.fullName,
        email: user.email,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    onUserChange({
      ...changeInfo,
      [name]: value,
    });
  };

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Grid item xs={12} md={5}>
      <Typography variant="h5" gutterBottom>
        Customer Information
      </Typography>
      <TextField
        fullWidth
        label="Full Name"
        name="fullName"
        value={changeInfo.fullName}
        margin="normal"
        required
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={changeInfo.email}
        margin="normal"
        required
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={changeInfo.address}
        margin="normal"
        required
        onChange={handleChange}
      />
      <TextField
        fullWidth
        label="Phone Number"
        name="phoneNumber"
        value={changeInfo.phoneNumber}
        margin="normal"
        required
        onChange={handleChange}
      />
    </Grid>
  );
};

export default ShippingInfo;
