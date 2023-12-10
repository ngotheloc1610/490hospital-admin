import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPractitioner {
    triggerEdit: boolean,
    showPopUpBlock: boolean,
    practitioner: any,
    triggerBlock: boolean,
    profile: any,
}

const initialState: IPractitioner = {
    triggerEdit: false,
    practitioner: false,
    showPopUpBlock: false,
    triggerBlock: false,
    profile: null
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
        setProfile: (state, action: PayloadAction<any>) => {
            state.profile = action.payload;
        },
    },
});

export const { setTriggerEdit, setPractitioner, setShowPopUpConfirmBlock, setTriggerBlock, setProfile } = practitionerSlice.actions;

export const selectPractitioner = (state: RootState) => state.practitionerSlice;

export default practitionerSlice.reducer;
