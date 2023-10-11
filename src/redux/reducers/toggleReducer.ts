import Types from '../types';
import { AnyAction } from 'redux';

const initState = {
    flagPatient: false,
};

const toggleReducer = (state = initState, action: AnyAction) => {
    const { type, payload } = action;
    switch (type) {
        case Types.TOGGLE_PATIENT: {
            return {
                ...state,
                flagPatient: payload,
            };
        }

        default:
            return state;
    }
};

export default toggleReducer;
