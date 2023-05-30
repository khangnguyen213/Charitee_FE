import { configureStore } from "@reduxjs/toolkit";
import sesionReducer from "./sessionSlice";

export const store = configureStore({
  reducer: { session: sesionReducer },
});
