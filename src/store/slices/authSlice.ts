import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  error: string;
}

function loadAuth(): AuthState {
  const authed = window.sessionStorage.getItem("portfolio-admin-auth") === "true";
  return { isAuthenticated: authed, error: "" };
}

const initialState: AuthState = loadAuth();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
      state.error = "";
      window.sessionStorage.setItem("portfolio-admin-auth", "true");
    },
    logout(state) {
      state.isAuthenticated = false;
      state.error = "";
      window.sessionStorage.removeItem("portfolio-admin-auth");
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearError(state) {
      state.error = "";
    },
  },
});

export const { login, logout, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
