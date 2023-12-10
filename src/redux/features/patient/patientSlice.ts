import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPatientStatus {
    triggerUpdate: boolean,
    triggerBlock: boolean,
    showPopUpConfirmBlock: boolean,
    patient: any
}

const initialState: IPatientStatus = {
    triggerUpdate: false,
    triggerBlock: false,
    showPopUpConfirmBlock: false,
    patient: null
};

export const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setTriggerUpdate: (state, action: PayloadAction<boolean>) => {
            state.triggerUpdate = action.payload;
        },
        setTriggerBlock: (state, action: PayloadAction<boolean>) => {
            state.triggerBlock = action.payload;
        },
        setShowPopUpConfirmBlock: (state, action: PayloadAction<boolean>) => {
            state.showPopUpConfirmBlock = action.payload;
        },
        setPatient: (state, action: PayloadAction<any>) => {
            state.patient = action.payload;
        },

    },
});

export const { setTriggerUpdate, setTriggerBlock, setShowPopUpConfirmBlock, setPatient } = patientSlice.actions;

export const selectPatient = (state: RootState) => state.patientSlice;

export default patientSlice.reducer;
