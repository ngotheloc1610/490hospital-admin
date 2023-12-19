import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IAppointmentState {
  triggerAccept: boolean;
  triggerDeny: boolean;
  triggerNoShow: boolean;
  triggerArrived: boolean;
  triggerCancel: boolean;
  appointment: any;
}

const initialState: IAppointmentState = {
  triggerAccept: false,
  triggerDeny: false,
  triggerNoShow: false,
  triggerArrived: false,
  triggerCancel: false,
  appointment: null
};

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    setTriggerAccept: (state, action: PayloadAction<boolean>) => {
      state.triggerAccept = action.payload;
    },
    setTriggerDeny: (state, action: PayloadAction<boolean>) => {
      state.triggerDeny = action.payload;
    },
    setTriggerNoShow: (state, action: PayloadAction<boolean>) => {
      state.triggerNoShow = action.payload;
    },
    setTriggerArrived: (state, action: PayloadAction<boolean>) => {
      state.triggerArrived = action.payload;
    },
    setTriggerCancel: (state, action: PayloadAction<boolean>) => {
      state.triggerCancel = action.payload;
    },
    setAppointment: (state, action: PayloadAction<any>) => {
      state.appointment = action.payload;
    },
  },
});

export const { setTriggerAccept, setTriggerDeny, setTriggerNoShow, setTriggerArrived, setAppointment, setTriggerCancel } =
  appointmentSlice.actions;

export const selectAppointment = (state: RootState) => state.appointmentSlice;

export default appointmentSlice.reducer;
