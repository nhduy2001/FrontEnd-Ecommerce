import axios from "axios";
import AuthService from "../AuthService";

const baseUrl = "http://localhost:8080/api/v1/admin/products";

const ProductService = {
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
  
}

export default ProductService