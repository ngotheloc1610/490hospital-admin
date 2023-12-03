import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IAuthState {
  isLogin: boolean,
  isForgotPassword: boolean,
}

const initialState: IAuthState = {
  isLogin: false,
  isForgotPassword: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setForgotPassword: (state, action: PayloadAction<boolean>) => {
      state.isForgotPassword = action.payload;
    },
  },
});

export const { setLogin, setForgotPassword } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authSlice;

export default authSlice.reducer;
