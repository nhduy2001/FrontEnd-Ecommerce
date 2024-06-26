import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/public/products";

const ProductService = {
  async getAllProducts(queryString) {
    try {
      const response = await axios.get(`${baseUrl}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new error("Cannot get products");
    }
  },
  
  async getFeaturedProducts() {
    try {
      const response = await axios.get(`${baseUrl}/featured`);
      return response.data;
    } catch (error) {
      throw new error("Cannot get products");
    }
  },

  async getProductById(productId) {
    try {
      const response = await axios.get(`${baseUrl}/${productId}`);
      return response.data;
    } catch (error) {
      throw new Error("Cannot get products from server.");
    }
  },
};

export default ProductService;
