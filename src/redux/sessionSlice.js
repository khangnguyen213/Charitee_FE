import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "",
  fullname: "",
  _id: "",
};

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    login: (state, action) => {
      // Updates the state to include the payload data during login.
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      // Resets the state to initial values during logout.
      return { ...initialState };
    },
  },
});

export const { login, logout } = sessionSlice.actions;

export default sessionSlice.reducer;
