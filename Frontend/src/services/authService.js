import axios from "axios";

/**************  /api/user/ ******************/
export class AuthService {
  async createUser({ username, email, password }) {
    try {
      const res = await axios.post("/api/user/signup", {
        username,
        email,
        password,
      });
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("AuthService :: createUser :: ", error);
    }
  }

  async loginUser({ email, password }) {
    try {
      const res = await axios.post("/api/user/login", {
        email,
        password,
      });
      if (res) {
        console.log(res.data);
        return res.data;
      }
    } catch (error) {
      console.log("AuthService :: loginUser :: ", error);
    }
  }

  async forgotPassword({ email }) {
    try {
      const res = await axios.post("/api/user/forget-password", {
        email,
      });
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("AuthService :: forgotPassword :: ", error);
    }
  }

  async resetPassword({ token, newPassword }) {
    try {
      const res = await axios.post("/api/user/reset-password", {
        token,
        newPassword,
      });
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("AuthService :: resetPassword :: ", error);
    }
  }

  async toggleFavMarket({ userId, marketId }) {
    try {
      const res = await axios.post("/api/user/togglefav", {
        userId,
        marketId,
      });
      if (res) {
        console.log(res);
        return res.data;
      }
    } catch (error) {
      console.log("AuthService :: toggleFavMakret :: ", error);
    }
  }
}

const authService = new AuthService();

export default authService;
