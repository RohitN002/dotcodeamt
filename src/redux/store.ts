import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./reducers/auth.reducer";
import dashbordReducer from "./reducers/dashboard.reducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashbordReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export default store;
