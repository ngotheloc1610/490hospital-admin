import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPractitioner {
    triggerEdit: boolean,
    showPopUpBlock: boolean,
    practitioner: any,
    triggerBlock: boolean,
}

const initialState: IPractitioner = {
    triggerEdit: false,
    practitioner: false,
    showPopUpBlock: false,
    triggerBlock: false,
};

export const practitionerSlice = createSlice({
    name: "practitioner",
    initialState,
    reducers: {
        setTriggerEdit: (state, action: PayloadAction<boolean>) => {
            state.triggerEdit = action.payload;
        },
        setPractitioner: (state, action: PayloadAction<any>) => {
            state.practitioner = action.payload;
        },
        setShowPopUpConfirmBlock: (state, action: PayloadAction<boolean>) => {
            state.showPopUpBlock = action.payload;
        },
        setTriggerBlock: (state, action: PayloadAction<boolean>) => {
            state.triggerBlock = action.payload;
        },
    },
});

export const { setTriggerEdit, setPractitioner, setShowPopUpConfirmBlock, setTriggerBlock } = practitionerSlice.actions;

export const selectPractitioner = (state: RootState) => state.practitionerSlice;

export default practitionerSlice.reducer;
