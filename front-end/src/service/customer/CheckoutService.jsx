import axios from "axios";
import AuthService from "../AuthService";

const baseUrl = "http://localhost:8080/api/v1/customer";

const CheckoutService = {
  async getCart() {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.get(`${baseUrl}/cart`, {
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
  async getShippingInfo() {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.get(`${baseUrl}/user`, {
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
  async addOrder(shippingInfo, totalPrice) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );

      const orderData = {
        ...shippingInfo,
        totalPrice: totalPrice,
      };

      console.log(orderData);

      const response = await axios.post(`${baseUrl}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${updatedToken}`,
        },
      });
      return response.data;
    } catch (error) {
      //   window.localStorage.removeItem("user");
      //   window.localStorage.removeItem("token");
      //   window.localStorage.removeItem("refreshToken");
      //   window.location.href = "/login";
      //   throw error;
      console.log("error");
    }
  },
};

export default CheckoutService;
