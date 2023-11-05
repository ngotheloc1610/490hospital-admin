import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import patientSlice from '../features/patient/patientSlice';

const rootReducer = combineReducers({
  authSlice,
  patientSlice
});

export default rootReducer;
