import React, {useState} from "react";
import { Box, Typography, Rating, Paper, Button } from "@mui/material";

const AllFeedbacks = ({ feedbacks }) => {
  const [showAll, setShowAll] = useState(false);

  const handleExpandClick = () => {
    setShowAll(!showAll);
  };

  const displayedFeedbacks = showAll ? feedbacks : feedbacks.slice(0, 3);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        All Feedbacks:
      </Typography>
      {displayedFeedbacks.map((feedback, index) => (
        <Paper
          key={index}
          sx={{
            mt: 1,
            p: 2,
            width: "60%",
            borderLeft: 4,
            borderColor: "primary.main",
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            User: {feedback.username}
          </Typography>
          <Rating value={feedback.rating} precision={0.5} readOnly />
          <Typography variant="body1" sx={{ mt: 1 }}>
            {feedback.comment}
          </Typography>
        </Paper>
      ))}
      {feedbacks.length > 3 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleExpandClick}
          sx={{ mt: 2 }}
        >
          {showAll ? "Show Less" : "Show More"}
        </Button>
      )}
    </Box>
  );
};

export default AllFeedbacks;
