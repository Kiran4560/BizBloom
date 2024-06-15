import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import authService from "../services/authService";

const userToken = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : null;

const initialState = {
  isLoggedIn: false,
  userData: null,
  userToken,
  // loading: false,
  // error: false,
};

// export const loginUser = createAsyncThunk("/user/login", (data) =>
//   authService.loginUser(data)
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      state.isLoggedIn = true;
      state.userData = payload.userData;
      state.userToken = payload.userData.token;
      console.log(payload.userData);
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
  // extraReducers: {
  //   [loginUser.pending](state) {
  //     state.loading = true;
  //     state.error = false;
  //   },
  //   [loginUser.rejected](state) {
  //     state.loading = false;
  //     state.error = true;
  //   },
  //   [loginUser.fulfilled](state, { payload }) {
  //     state.isLoggedIn = true;
  //     state.loading = false;
  //     state.error = false;
  //     state.userData = payload.userData;
  //   },
  // },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
