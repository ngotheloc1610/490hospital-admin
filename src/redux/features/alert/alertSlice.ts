import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IAlertState {
  isDelete: boolean;
}

const initialState: IAlertState = {
  isDelete: false,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setDelete: (state, action: PayloadAction<boolean>) => {
      state.isDelete = action.payload;
    },

  },
});

export const { setDelete } =
  alertSlice.actions;

export const selectAppointment = (state: RootState) => state.alertSlice;

export default alertSlice.reducer;
