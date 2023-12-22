import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPatientStatus {
    triggerUpdate: boolean,
    triggerBlock: boolean,
    showPopUpConfirmBlock: boolean,
    patient: any,
    idAppointment: string
}

const initialState: IPatientStatus = {
    triggerUpdate: false,
    triggerBlock: false,
    showPopUpConfirmBlock: false,
    patient: null,
    idAppointment: ""
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
        setIdAppointment: (state, action: PayloadAction<string>) => {
            state.idAppointment = action.payload;
        },

    },
});

export const { setTriggerUpdate, setTriggerBlock, setShowPopUpConfirmBlock, setPatient, setIdAppointment } = patientSlice.actions;

export const selectPatient = (state: RootState) => state.patientSlice;

export default patientSlice.reducer;
