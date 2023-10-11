import { KEY_LOCAL_STORAGE } from "../constants/general.constant";

export const defineConfigGet = (param: any) => {
    const data = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` },
        params: param
    }
    return data;
}

export const defineConfigPost = () => {
    const data = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` }
    }
    return data;
}