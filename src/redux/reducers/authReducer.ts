import Types from '../types';
import {AnyAction} from 'redux';

const initState = {
  isSplash: true,
  isLogin: true,
  secretKey: '',
  rememberKey: ''
};

const authReducer = (state = initState, action: AnyAction) => {
  const {type, payload} = action;
  switch (type) {
    case Types.LOGIN: {
      return {
        ...state,
        isLogin: payload,
      };
    }
    case Types.SPLASH: {
      return {
        ...state,
        isSplash: payload,
      };
    }
    case Types.SECRET_KEY: {
      return {
        ...state,
        secretKey: payload,
      };
    }
    case Types.REMEMBER_KEY: {
      return {
        ...state,
        rememberKey: payload,
      };
    }
    default:
      return state;
  }
};

export default authReducer;