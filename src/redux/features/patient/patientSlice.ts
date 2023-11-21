import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPatientStatus {
    triggerDelete: boolean,
    triggerUpdate: boolean,
    triggerBlock: boolean,
    showPopUpConfirm: boolean,
    showPopUpConfirmBlock: boolean,
    listBlock: string[],
    patient: any
}

const initialState: IPatientStatus = {
    triggerDelete: false,
    triggerUpdate: false,
    triggerBlock: false,
    showPopUpConfirm: false,
    showPopUpConfirmBlock: false,
    listBlock: [],
    patient: {}
};

export const patientSlice = createSlice({
    name: "patient",
    initialState,
    reducers: {
        setTriggerDelete: (state, action: PayloadAction<boolean>) => {
            state.triggerDelete = action.payload;
        },
        setTriggerUpdate: (state, action: PayloadAction<boolean>) => {
            state.triggerUpdate = action.payload;
        },
        setTriggerBlock: (state, action: PayloadAction<boolean>) => {
            state.triggerBlock = action.payload;
        },
        setShowPopUpConfirm: (state, action: PayloadAction<boolean>) => {
            state.showPopUpConfirm = action.payload;
        },
        setShowPopUpConfirmBlock: (state, action: PayloadAction<boolean>) => {
            state.showPopUpConfirmBlock = action.payload;
        },
        setPatient: (state, action: PayloadAction<any>) => {
            state.patient = action.payload;
        },
        setListBlock: (state, action: PayloadAction<any>) => {
            state.listBlock = action.payload;
        },
    },
});

export const { setTriggerDelete, setTriggerUpdate, setTriggerBlock, setShowPopUpConfirm, setShowPopUpConfirmBlock, setPatient, setListBlock } = patientSlice.actions;

export const selectPatient = (state: RootState) => state.patientSlice;

export default patientSlice.reducer;
