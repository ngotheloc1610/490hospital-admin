import { combineReducers } from 'redux';
import auth from './authReducer';
import toggle from './toggleReducer';

const rootReducer = combineReducers({
  auth,
  toggle,
});

export default rootReducer;
