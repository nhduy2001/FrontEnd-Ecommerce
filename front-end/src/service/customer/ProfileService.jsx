import axios from "axios";
import AuthService from "../AuthService";

const baseUrl = "http://localhost:8080/api/v1/customer/user";

const ProfileService = {
  async getRole(username) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.get(
        `http://localhost:8080/api/v1/public/role?username=${username}`,
        username,
        {
          headers: {
            Authorization: `Bearer ${updatedToken}`,
          },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.location.href = "/login";
      throw error;
    }
  },
  async getUserProfile() {
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
  async updateProfile(userData) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.put(baseUrl, userData, {
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

export default ProfileService;
