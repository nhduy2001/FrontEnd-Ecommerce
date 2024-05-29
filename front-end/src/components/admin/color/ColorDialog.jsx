import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const ColorDialog = ({ open, onClose }) => {
  const [color, setColor] = useState("");
  const [image, setImage] = useState(null);

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = () => {
    // Handle image upload logic here
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chọn màu và ảnh</DialogTitle>
      <DialogContent>
        <TextField
          label="Màu"
          variant="outlined"
          value={color}
          onChange={handleColorChange}
          fullWidth
          margin="normal"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={handleUpload}
          color="primary"
          disabled={!color || !image}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorDialog;
