import Types from '../types';

const setFlagPatient = (payload: any) => ({
    type: Types.TOGGLE_PATIENT,
    payload,
});



export { setFlagPatient };
