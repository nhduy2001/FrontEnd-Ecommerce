import React, { useState, useEffect, useCallback } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import FeedbackService from "../../../service/customer/FeedbackService";
import SubmitFeedback from "./SubmitFeedback";
import AllFeedbacks from "./AllFeedbacks";

const Feedback = ({ productId, username, updateProductRating }) => {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = useCallback(async () => {
    try {
      const data = await FeedbackService.getAllFeedbacks(productId);
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error.message);
    }
  }, [productId]);

  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  return (
    <Box sx={{ minWidth: 275, mt: 1 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" sx={{ mt: 2 }}>
            Feedback
          </Typography>
          <SubmitFeedback
            productId={productId}
            username={username}
            updateProductRating={updateProductRating}
            fetchFeedbacks={fetchFeedbacks}
          />
          <AllFeedbacks feedbacks={feedbacks} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Feedback;
