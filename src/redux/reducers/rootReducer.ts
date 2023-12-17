import { combineReducers } from '@reduxjs/toolkit';

import authSlice from '../features/auth/authSlice';
import patientSlice from '../features/patient/patientSlice';
import practitionerSlice from './../features/practitioner/practitionerSlice';
import appointmentSlice from './../features/appointment/appointmentSlice';
import alertSlice from '../features/alert/alertSlice';
import diagnosticSlice from '../features/diagnostic/diagnosticSlice';

const rootReducer = combineReducers({
  authSlice,
  patientSlice,
  practitionerSlice,
  appointmentSlice,
  alertSlice,
  diagnosticSlice
});

export default rootReducer;
