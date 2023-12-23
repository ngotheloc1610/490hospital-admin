import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IPractitioner {
    triggerEdit: boolean,
    showPopUpBlock: boolean,
    practitioner: any,
    triggerBlock: boolean,
    triggerBack: boolean,
    room: string,
}

const initialState: IPractitioner = {
    triggerEdit: false,
    practitioner: false,
    showPopUpBlock: false,
    triggerBlock: false,
    triggerBack: false,
    room: "",
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
        setTriggerBack: (state, action: PayloadAction<boolean>) => {
            state.triggerBack = action.payload;
        },
        setRoom: (state, action: PayloadAction<string>) => {
            state.room = action.payload;
        },
    },
});

export const { setTriggerEdit, setPractitioner, setShowPopUpConfirmBlock, setTriggerBlock, setTriggerBack, setRoom } = practitionerSlice.actions;

export const selectPractitioner = (state: RootState) => state.practitionerSlice;

export default practitionerSlice.reducer;
