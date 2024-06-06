import axios from "axios";
import AuthService from "../AuthService";

const baseUrl = "http://localhost:8080/api/v1/customer/user";
const publicUrl = "http://localhost:8080/api/v1/public";

const ProfileService = {
  async getRole(username) {
    try {
      const response = await axios.get(
        `${publicUrl}/role?username=${username}`,
        username
      );
      console.log(response);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
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
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
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
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
};

export default ProfileService;
