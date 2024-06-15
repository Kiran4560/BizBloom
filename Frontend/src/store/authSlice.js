import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: localStorage.getItem("user") || null,
  userToken: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userData = payload.userData;
      state.userToken = payload.userData.token;

      localStorage.setItem("token", payload.userData.token);
      localStorage.setItem("user", payload.userData);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.userToken = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
