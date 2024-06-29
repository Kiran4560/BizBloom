import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: JSON.parse(localStorage.getItem("user")) || null,
  userToken: JSON.parse(localStorage.getItem("token")) || null,
  userLocation: {
    latitude: JSON.parse(localStorage.getItem("latitude")) || null,
    longitude: JSON.parse(localStorage.getItem("longitude")) || null,
  },
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
      localStorage.removeItem("latitude");
      localStorage.removeItem("longitude");
    },
    updateUser: (state, { payload }) => {
      state.userData = payload.userData;
      console.log(payload);
      localStorage.setItem("user", JSON.stringify(payload.userData));
    },
    updateLocation: (state, { payload }) => {
      state.userLocation.latitude = payload.latitude;
      state.userLocation.longitude = payload.longitude;

      localStorage.setItem("latitude", JSON.stringify(payload.latitude));
      localStorage.setItem("longitude", JSON.stringify(payload.longitude));
    },
  },
});

export const { login, logout, updateUser, updateLocation } = authSlice.actions;
export default authSlice.reducer;
