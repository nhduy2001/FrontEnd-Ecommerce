import axios from "axios";
import AuthService from "../AuthService";

const baseUrl = "http://localhost:8080/api/v1/admin/products";

const DashboardService = {
  async getAllProducts() {
    try {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );
      const response = await axios.get(`${baseUrl}/all`, {
        headers: {
          Authorization: `Bearer ${updatedToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw new Error("Error fetching products");
    }
  },
  async updateProduct(
    productId,
    newFeaturedValue,
    products,
    setProducts,
    setSnackbarOpen,
    setSnackbarSeverity,
    setSnackbarMessage
  ) {
    try {
      // Kiểm tra số lượng sản phẩm featured trước khi cập nhật
      const featuredProductsCount = products.filter(
        (product) => product.featured
      ).length;
      if (newFeaturedValue && featuredProductsCount >= 5) {
        // Nếu đã đạt đến giới hạn, hiển thị thông báo hoặc thực hiện các hành động khác
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(
          "Exceeded the allowed number of featured products (5 products)!"
        );
        return;
      }

      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");

      const updatedToken = await AuthService.checkAndUpdateToken(
        token,
        refreshToken
      );

      // Gửi yêu cầu PUT tới endpoint backend để cập nhật sản phẩm
      await axios.put(
        baseUrl,
        {
          ...products.find((product) => product.productId === productId),
          featured: newFeaturedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${updatedToken}`,
          },
        }
      );

      // Cập nhật lại danh sách sản phẩm sau khi cập nhật thành công
      const updatedProducts = products.map((product) =>
        product.productId === productId
          ? { ...product, featured: newFeaturedValue }
          : product
      );
      setProducts(updatedProducts);
      // Hiển thị snack bar
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage("Update success!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  },
};

export default DashboardService;
