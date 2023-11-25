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

export const styleStatus = (status: string) => {
    switch (status) {
        case "No Show":
            return "no-show";
        case "Cancel":
            return "canceled";
        case "Fulfilled":
            return "fulfilled";
        default:
            return;
    }
}

export const styleStatusPractitioner = (status: boolean) => {
    switch (status) {
        case true:
            return "practitioner-active";
        case false:
            return "practitioner-inactive";
        default:
            return;
    }
}