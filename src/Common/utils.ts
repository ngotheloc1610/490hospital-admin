import { FORMAT_DATE, FORMAT_TIME, KEY_LOCAL_STORAGE } from "../constants/general.constant";
import moment from "moment";

export const defineConfigGet = (param: any) => {
    const data = {
        headers: { Authorization: `Bearer ${localStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` },
        params: param
    }
    return data;
}

export const defineConfigPost = () => {
    const data = {
        headers: { Authorization: `Bearer ${localStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}` }
    }
    return data;
}

export const convertToDate = (time: string) => {
    const date = moment(time, 'ddd MMM DD HH:mm:ss z YYYY');
    return date.format(FORMAT_DATE);
}

export const convertToTime = (time: string) => {
    const date = moment(time, 'ddd MMM DD HH:mm:ss z YYYY');
    return date.format(`${FORMAT_TIME} A`);
}