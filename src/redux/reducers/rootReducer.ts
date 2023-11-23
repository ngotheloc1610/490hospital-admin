import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import patientSlice from '../features/patient/patientSlice';
import practitionerSlice from './../features/practitioner/practitionerSlice';
import appointmentSlice from './../features/appointment/appointmentSlice';

const rootReducer = combineReducers({
  authSlice,
  patientSlice,
  practitionerSlice,
  appointmentSlice
});

export default rootReducer;
