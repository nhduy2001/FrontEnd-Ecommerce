import React, { useState } from "react";
import { Box, Button, Rating, TextField } from "@mui/material";
import FeedbackService from "../../../service/customer/FeedbackService";

const SubmitFeedback = ({
  productId,
  username,
  updateProductRating,
  fetchFeedbacks,
}) => {
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");

  const handleSubmitFeedback = async () => {
    try {
      const feedbackData = {
        rating: feedbackRating,
        comment: feedbackComment,
        productId: productId,
        username: username,
      };
      await FeedbackService.addFeedback(feedbackData);
      console.log("Feedback submitted successfully");
      setFeedbackRating(0);
      setFeedbackComment("");
      // Call the callback function to update product rating
      updateProductRating();
      // Fetch feedbacks again to update the list
      fetchFeedbacks();
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      sx={{ mt: 1, width: "60%" }}
    >
      <Rating
        name="product-feedback"
        value={feedbackRating}
        precision={0.5}
        size="large"
        onChange={(event, newValue) => setFeedbackRating(newValue)}
      />
      <TextField
        label="Comment"
        multiline
        rows={4}
        variant="outlined"
        value={feedbackComment}
        onChange={(event) => setFeedbackComment(event.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmitFeedback}
      >
        Submit
      </Button>
    </Box>
  );
};

export default SubmitFeedback;
