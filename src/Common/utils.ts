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
    const date = moment(time);
    return date.format(FORMAT_DATE);
}

export const convertToTime = (time: string) => {
    const date = moment(time);
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
        case "Pending":
            return "pending";
        case "Proposed":
            return "proposed";
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

export const styleBloodPressure = (item: any) => {
    if (item?.observationName === "Blood Pressure") {
        switch (item?.alertSeverity) {
            case "Major":
                return "major";
            case "Moderate":
                return "normal";
            case "Catastrophic":
                return "catastrophic";
            default:
                return;
        }
    }
    return ""
}
export const styleBloodGlucose = (item: any) => {
    if (item?.observationName === "Blood Glucose") {
        switch (item?.alertSeverity) {
            case "Major":
                return "major";
            case "Moderate":
                return "normal";
            case "Catastrophic":
                return "catastrophic";
            default:
                return;
        }
    }
    return ""
}
export const styleHeartRate = (item: any) => {
    if (item?.observationName === "Heart Rate") {
        switch (item?.alertSeverity) {
            case "Major":
                return "major";
            case "Moderate":
                return "normal";
            case "Catastrophic":
                return "catastrophic";
            default:
                return;
        }
    }
    return ""
}

export const styleBMI = (item: any) => {
    if (item?.observationName === "BMI") {
        switch (item?.alertSeverity) {
            case "Major":
                return "major";
            case "Moderate":
                return "normal";
            case "Catastrophic":
                return "catastrophic";
            default:
                return;
        }
    }
    return ""
}

export const styleTemperature = (item: any) => {
    if (item?.observationName === "Temperature") {
        switch (item?.alertSeverity) {
            case "Major":
                return "major";
            case "Moderate":
                return "normal";
            case "Catastrophic":
                return "catastrophic";
            default:
                return;
        }
    }
    return ""
}

export const getTotalDaysInMonth = (year: number, month: number) => {
    const lastDayOfMonth = new Date(year, month + 1, 0);
    return lastDayOfMonth.getDate();
}; 