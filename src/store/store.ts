import { configureStore, Middleware } from "@reduxjs/toolkit";
import portfolioReducer from "./slices/portfolioSlice";
import authReducer from "./slices/authSlice";
import { portfolioApi } from "./api/portfolioApi";

// Middleware: persist portfolio slice to localStorage on every change
const persistMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  try {
    window.localStorage.setItem("fullstack-portfolio-cms", JSON.stringify(state.portfolio));
  } catch {
    // localStorage full or unavailable
  }
  return result;
};

export const store = configureStore({
  reducer: {
    portfolio: portfolioReducer,
    auth: authReducer,
    [portfolioApi.reducerPath]: portfolioApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(portfolioApi.middleware).concat(persistMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
