/* eslint-disable @typescript-eslint/no-explicit-any */
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";
// interface AuthState {
//   token: string | null;
//   refresh_token: string | null;
// }

// const initialState: AuthState = {
//   token: null,
//   refresh_token: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ token: string }>) => {
//       state.token = action.payload.token;
//       Cookies.set("accessToken", action.payload.token);
//     },
//     setRefreshToken: (
//       state,
//       action: PayloadAction<{ refresh_token: string }>
//     ) => {
//       state.refresh_token = action.payload.refresh_token;
//       Cookies.set("refreshToken", action.payload.refresh_token);
//     },
//     logout: (state) => {
//       state.token = null;
//       state.refresh_token = null;
//       Cookies.remove("accessToken");
//     },
//   },
// });

// export const { setUser, setRefreshToken, logout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  refresh_token: string | null;
  user: any | null;
}

// Get initial state from cookies if available
const getInitialState = (): AuthState => {
  if (typeof window === "undefined") {
    return {
      token: null,
      refresh_token: null,
      user: null,
    };
  }

  return {
    token: Cookies.get("accessToken") || null,
    refresh_token: Cookies.get("refreshToken") || null,
    user: null,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ accessToken: string; user?: any }>
    ) => {
      state.token = action.payload.accessToken;
      if (action.payload.user) {
        state.user = action.payload.user;
      }

      Cookies.set("accessToken", action.payload.accessToken, {
        expires: 7, // 7 days
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    },
    setRefreshToken: (
      state,
      action: PayloadAction<{ refresh_token: string }>
    ) => {
      state.refresh_token = action.payload.refresh_token;
      Cookies.set("refreshToken", action.payload.refresh_token, {
        expires: 7,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
    },
    logout: (state) => {
      state.token = null;
      state.refresh_token = null;
      state.user = null;
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    },
    initializeAuth: (state) => {
      // This action can be dispatched on app initialization
      // to ensure auth state is synchronized with cookies
      const token = Cookies.get("accessToken") || null;
      const refresh_token = Cookies.get("refreshToken") || null;

      if (token !== state.token) {
        state.token = token;
      }
      if (refresh_token !== state.refresh_token) {
        state.refresh_token = refresh_token;
      }
    },
  },
});

export const { setUser, setRefreshToken, logout, initializeAuth } =
  authSlice.actions;

export default authSlice.reducer;
