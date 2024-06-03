import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseUrl = "http://localhost:8080/api/v1/public";

// Hàm gửi yêu cầu sử dụng refresh token để lấy token mới
async function getNewToken(refreshToken) {
  try {
    const response = await axios.post(`${baseUrl}/refresh`, {
      token: refreshToken,
    });
    console.log("đã refesh token");
    return response.data.token; // Trả về token mới từ phản hồi
  } catch (error) {
    throw new Error("Không thể lấy token mới từ máy chủ.");
  }
}

const AuthService = {
  // Gửi yêu cầu đăng nhập và nhận token và refresh token
  async signIn(credentials) {
    try {
      const response = await axios.post(`${baseUrl}/signIn`, credentials);
      return response.data;
    } catch (error) {
      throw new Error("Không thể đăng nhập.");
    }
  },

  // Kiểm tra và cập nhật token khi cần thiết
  async checkAndUpdateToken(token, refreshToken) {
    try {
      const currentTime = Date.now() / 1000;
      const decodedToken = jwtDecode(token);

      console.log(currentTime);
      console.log(decodedToken);

      // Kiểm tra xem token đã hết hạn hay chưa
      if (decodedToken.exp < currentTime) {
        // Token đã hết hạn, sử dụng refresh token để lấy token mới
        const newToken = await getNewToken(refreshToken);
        console.log(newToken);
        return newToken;
      } else {
        return token;
      }
    } catch (error) {
      throw new Error("Không thể kiểm tra và cập nhật token.");
    }
  },
};

export default AuthService;
