import axios from "axios";
import AuthService from "../AuthService";

const baseUrl = "http://localhost:8080/api/v1/admin/categories";

const CategoryService = {
  async getALlCategories() {
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

  async addCategory(category) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.post(baseUrl, category, {
        headers: {
          Authorization: `Bearer ${updatedToken}`,
        },
      });
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

  async updateCategory(category) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.put(baseUrl, category, {
        headers: {
          Authorization: `Bearer ${updatedToken}`,
        },
      });
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

  async deleteCategory(categoryId) {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.delete(`${baseUrl}/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${updatedToken}`,
        },
      });
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
};

export default CategoryService;
