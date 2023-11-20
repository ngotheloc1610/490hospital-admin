import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import patientSlice from '../features/patient/patientSlice';
import practitionerSlice from './../features/practitioner/practitionerSlice';

const rootReducer = combineReducers({
  authSlice,
  patientSlice,
  practitionerSlice
});

export default rootReducer;
