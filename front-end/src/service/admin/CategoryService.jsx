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
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
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
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
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
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
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
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },
};

export default CategoryService;
