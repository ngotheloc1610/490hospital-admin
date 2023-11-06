import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPatientStatus {
    triggerDelete: boolean,
    triggerCreate: boolean,
    showPopUpConfirm: boolean,
    patient: any
}

const initialState: IPatientStatus = {
    triggerDelete: false,
    triggerCreate: false,
    showPopUpConfirm: false,
    patient: {}
};

export const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setTriggerDelete: (state, action: PayloadAction<boolean>) => {
            state.triggerDelete = action.payload;
        },
        setTriggerCreate: (state, action: PayloadAction<boolean>) => {
            state.triggerCreate = action.payload;
        },
        setShowPopUpConfirm: (state, action: PayloadAction<boolean>) => {
            state.showPopUpConfirm = action.payload;
        },
        setPatient: (state, action: PayloadAction<any>) => {
            state.patient = action.payload;
        }, 
    },
});

export const { setTriggerDelete, setTriggerCreate, setShowPopUpConfirm, setPatient } = patientSlice.actions;

export const selectPatient = (state: RootState) => state.patientSlice;

export default patientSlice.reducer;
