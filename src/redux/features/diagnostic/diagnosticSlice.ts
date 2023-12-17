import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../../store/configureStore";

interface IDiagnosticState {
  idEncounter: string;
}

const initialState: IDiagnosticState = {
  idEncounter: "",
};

export const diagnosticSlice = createSlice({
  name: "diagnostic",
  initialState,
  reducers: {
    setIdEncounter: (state, action: PayloadAction<string>) => {
      state.idEncounter = action.payload;
    },

  },
});

export const { setIdEncounter } =
  diagnosticSlice.actions;

export const selectDiagnostic = (state: RootState) => state.diagnosticSlice;

export default diagnosticSlice.reducer;
