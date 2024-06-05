import axios from "axios";
import AuthService from "../AuthService";

const baseUrl = "http://localhost:8080/api/v1/admin/orders";

const OrderService = {
  async getAllOrders() {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.get(baseUrl, {
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
      throw error;
    }
  },

  async updateStatus(orderId) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.get(`${baseUrl}/${orderId}`, {
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
      throw error;
    }
  },

  async deleteOrder(orderId) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.delete(`${baseUrl}/${orderId}`, {
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
      throw error;
    }
  },
};

export default OrderService;
