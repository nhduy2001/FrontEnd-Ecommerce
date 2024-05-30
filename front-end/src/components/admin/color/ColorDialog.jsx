import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

const ColorDialog = ({ open, onClose, onUpload }) => {
  const [colorImagePairs, setColorImagePairs] = useState([{ color: '', image: null }]);

  const handleColorChange = (index, e) => {
    const newPairs = [...colorImagePairs];
    newPairs[index].color = e.target.value;
    setColorImagePairs(newPairs);
  };

  const handleImageChange = (index, e) => {
    const newPairs = [...colorImagePairs];
    newPairs[index].image = e.target.files[0];
    setColorImagePairs(newPairs);
  };

  const handleAddColorImagePair = () => {
    setColorImagePairs([...colorImagePairs, { color: '', image: null }]);
  };

  const handleUpload = async () => {
    const uploadedImages = [];

    for (const pair of colorImagePairs) {
      const formData = new FormData();
      formData.append("file", pair.image);

      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/admin/products/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", response.data);
        uploadedImages.push({ colorName: pair.color, colorImage: response.data });
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    onUpload(uploadedImages);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chọn màu và ảnh</DialogTitle>
      <DialogContent>
        {colorImagePairs.map((pair, index) => (
          <div key={index}>
            <TextField
              label="Màu"
              variant="outlined"
              value={pair.color}
              onChange={(e) => handleColorChange(index, e)}
              fullWidth
              margin="normal"
            />
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => handleImageChange(index, e)}
            />
          </div>
        ))}
        <Button onClick={handleAddColorImagePair} color="primary">
          Thêm màu và ảnh
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button
          onClick={handleUpload}
          color="primary"
          disabled={colorImagePairs.some(pair => !pair.color || !pair.image)}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorDialog;
