import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: JSON.parse(localStorage.getItem("user")) || null,
  userToken: JSON.parse(localStorage.getItem("token")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userData = payload.userData.user;
      state.userToken = payload.userData.token;
      console.log(payload.userData.user);
      console.log(typeof payload.userData.user);
      localStorage.setItem("token", JSON.stringify(payload.userData.token));
      localStorage.setItem("user", JSON.stringify(payload.userData.user));
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
      state.userToken = null;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    updateUser: (state, { payload }) => {
      state.userData = payload.userData;
      console.log(payload);
      localStorage.setItem("user", JSON.stringify(payload.userData));
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
