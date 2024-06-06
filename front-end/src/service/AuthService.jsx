import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseUrl = "http://localhost:8080/api/v1/public";

// send requst to refresh token
async function getNewToken(refreshToken) {
  try {
    const response = await axios.post(`${baseUrl}/refresh`, {
      token: refreshToken,
    });
    console.log("Token is refreshed");
    return response.data.token;
  } catch (error) {
    throw new Error("Cannot get token from server.");
  }
}

const AuthService = {
  async signIn(username, password) {
    try {
      const response = await axios.post(`${baseUrl}/signIn`, {
        username,
        password,
      });
      const token = response.data.token;
      const refreshToken = response.data.refreshToken;
      const user = jwtDecode(token);

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user.sub));
      return response.data;
    } catch (error) {
      throw new Error("Invalid username or password");
    }
  },

  async signUp(user) {
    try {
      const response = await axios.post(`${baseUrl}/signUp`, user);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("An unexpected error occurred.");
      }
    }
  },

  // Check and update token
  async checkAndUpdateToken(token, refreshToken) {
    try {
      const currentTime = Date.now() / 1000;
      const decodedToken = jwtDecode(token);

      // Check token is valid
      if (decodedToken.exp < currentTime) {
        // Token is expired, get new token
        const newToken = await getNewToken(refreshToken);
        return newToken;
      } else {
        return token;
      }
    } catch (error) {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  },
};

export default AuthService;
