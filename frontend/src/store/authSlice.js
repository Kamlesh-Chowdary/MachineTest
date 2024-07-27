import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminName: "",
  status: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.adminName = action.payload;
      state.status = true;
    },
    logout: (state) => {
      (state.adminName = ""), (state.status = false);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
