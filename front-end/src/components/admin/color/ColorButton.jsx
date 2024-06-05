import React from "react";
import Button from "@mui/material/Button";
import ColorLensIcon from "@mui/icons-material/ColorLens";

const ColorButton = ({ onClick }) => {
  return (
    <Button
      variant="contained"
      color="success"
      startIcon={<ColorLensIcon />}
      onClick={onClick}
    >
      Select Collor
    </Button>
  );
};

export default ColorButton;
