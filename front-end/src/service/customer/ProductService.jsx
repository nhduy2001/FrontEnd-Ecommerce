import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/customer/products";

const ProductService = {
  // Get all products
  async getAllProducts(queryString) {
    try {
      const response = await axios.get(`${baseUrl}?${queryString}`);
      return response.data;
    } catch (error) {
      throw new Error("Không thể lấy danh sách sản phẩm từ server.");
    }
  },
  // Get featured products
  async getFeaturedProducts() {
    try {
      const response = await axios.get(`${baseUrl}/featured`);
      return response.data;
    } catch (error) {
      throw new Error("Không thể lấy danh sách sản phẩm từ server.");
    }
  },
};

export default ProductService;
