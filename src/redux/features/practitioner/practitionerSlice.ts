import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPractitioner {
    triggerEdit: boolean,
    showPopUpBlock: boolean,
    practitioner: any,
    triggerBlock: boolean,
    listBlock: string[]
}

const initialState: IPractitioner = {
    triggerEdit: false,
    practitioner: false,
    showPopUpBlock: false,
    triggerBlock: false,
    listBlock: []
};  

export const practitionerSlice = createSlice({
    name: "appointment",
    initialState,
    reducers: {
        setTriggerEdit: (state, action: PayloadAction<boolean>) => {
            state.triggerEdit = action.payload;
        },
        setPractitioner:  (state, action: PayloadAction<any>) => {
            state.practitioner = action.payload;
        },
        setShowPopUpConfirmBlock: (state, action: PayloadAction<boolean>) => {
            state.showPopUpBlock = action.payload;
        },
        setTriggerBlock: (state, action: PayloadAction<boolean>) => {
            state.triggerBlock = action.payload;
        },
        setListBlock: (state, action: PayloadAction<any>) => {
            state.listBlock = action.payload;
        },
    },
});

export const { setTriggerEdit, setPractitioner ,setShowPopUpConfirmBlock, setTriggerBlock, setListBlock} = practitionerSlice.actions;

export const selectPractitioner = (state: RootState) => state.practitionerSlice;

export default practitionerSlice.reducer;
