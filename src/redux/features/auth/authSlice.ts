import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IAuthState {
  isLogin: boolean,
  isRegister: boolean
}

const initialState: IAuthState = {
  isLogin: false,
  isRegister: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    setRegister: (state, action: PayloadAction<boolean>) => {
      state.isRegister = action.payload;
    },
  },
});

export const { setLogin, setRegister } = authSlice.actions;

export const selectAuth = (state: RootState) => state.authSlice;

export default authSlice.reducer;
