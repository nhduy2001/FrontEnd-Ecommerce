import axios from "axios";
import AuthService from "../AuthService";

const secureUrl = "http://localhost:8080/api/v1/customer/feedback";
const publicUrl = "http://localhost:8080/api/v1/public/feedback";

const FeedbackService = {
  async addFeedback(feedbackData) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.post(secureUrl, feedbackData, {
        headers: {
          Authorization: `Bearer ${updatedToken}`,
        },
      });
      return response.data;
    } catch (error) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  },

  async getAllFeedbacks(id) {
    try {
      const response = await axios.get(`${publicUrl}/${id}`);
      return response.data;
    } catch (error) {
        throw new Error("Không thể lấy danh sách feedback từ server.");
    }
  },
};

export default FeedbackService;
