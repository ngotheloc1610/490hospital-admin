import OverviewDepartment from "../pages/Department/Detail/OverviewDepartment";
import OverviewDoctor from "../pages/Doctor/Detail/OverviewDoctor";
import OverviewStaff from "../pages/Staff/Detail/OverviewStaff";

import ScheduleDoctor from "../pages/Doctor/Detail/ScheduleDoctor";
import PreviousAppointment from "../pages/Appointment/Booked/PreviousAppointment";
import UpcomingAppointment from "../pages/Appointment/Booked/UpcomingAppointment";
import InformationPatient from "../pages/Patient/Detail/Infomation";

export const RouterUrl = {
  DASHBOARD: "/dashboard",
  DOCTOR: "/doctor",
  PATIENT: "/patient",
  DEPARTMENT: "/department",
  SCHEDULE: "/schedule",
  APPOINTMENT_PENDING: "/appointment-pending",
  APPOINTMENT_BOOKED: "/appointment-booked",
  APPOINTMENT_PROPOSED: "/appointment-proposed",
  BOOK_APPOINTMENT: "/book-appointment",
  DIAGNOSTIC_REPORT: "/diagnostic-report",
  STAFF: "/staff",
  PRACTITIONER: "/practitioner",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  INFORMATION: "/information",
  CHAT: "/chat",
  PATIENT_MONITOR: "/monitor",
  SETTING: "/setting",
};

export const START_PAGE = 0;

export const DEFAULT_ITEM_PER_PAGE = 7;

export const MenuDataDoctor = [
  {
    title: "Overview",
    content: OverviewDoctor,
  },
  {
    title: "Schedule",
    content: ScheduleDoctor,
  },
];

export const MenuDataDepartment = [
  {
    title: "Overview",
    content: OverviewDepartment,
  },
];

export const MenuDataPatient = [
  {
    title: "Information",
    content: InformationPatient,
  },
];

export const MenuDataStaff = [
  {
    title: "Overview",
    content: OverviewStaff,
  },
];

export const MenuDataAppointment = [
  {
    title: "Upcoming Appointments",
    content: UpcomingAppointment,
  },
  {
    title: "Previous Appointments",
    content: PreviousAppointment,
  },
];

export const GENDER = [
  {
    name: "Male",
    code: "MALE",
  },
  {
    name: "Female",
    code: "FEMALE",
  },
  {
    name: "Unknown",
    code: "UNKNOWN",
  },
];

export const GENDER_ALL = [
  {
    name: "Male",
    code: "MALE",
  },
  {
    name: "Female",
    code: "FEMALE",
  },
  {
    name: "Other",
    code: "",
  },
];

export const STATUS = [
  {
    name: "Active",
    code: "Active",
  },
  {
    name: "Inactive",
    code: "Inactive",
  },
  {
    name: "All",
    code: "",
  },
];

export const STATUS_APPOINTMENT = [
  {
    name: "Fulfilled",
    code: "Fulfilled",
  },
  {
    name: "Canceled",
    code: "Canceled",
  },
  {
    name: "No Show",
    code: "No Show",
  },
];

export const STATUS_APPOINTMENT_UPCOMING = [
  {
    name: "Canceled",
    code: "Canceled",
  },
  {
    name: "No Show",
    code: "No Show",
  },
];

export const TYPE_PRACTITIONER = [
  {
    name: "Doctor",
    code: "DOCTOR",
  },
  {
    name: "Staff",
    code: "STAFF",
  },
];

export const LIST_TIME = [
  {
    title: "08:00 AM - 09:00 AM",
    startTime: "08:00:00",
    endTime: "09:00:00",
  },
  {
    title: "09:00 AM - 10:00 AM",
    startTime: "09:00:00",
    endTime: "10:00:00",
  },
  {
    title: "10:00 AM - 11:00 AM",
    startTime: "10:00:00",
    endTime: "11:00:00",
  },
  {
    title: "11:00 AM - 12:00 PM",
    startTime: "11:00:00",
    endTime: "12:00:00",
  },
  {
    title: "12:00 PM - 01:00 PM",
    startTime: "12:00:00",
    endTime: "13:00:00",
  },
  {
    title: "01:00 PM - 02:00 PM",
    startTime: "13:00:00",
    endTime: "14:00:00",
  },
  {
    title: "02:00 PM - 03:00 PM",
    startTime: "14:00:00",
    endTime: "15:00:00",
  },
  {
    title: "03:00 PM - 04:00 PM",
    startTime: "15:00:00",
    endTime: "16:00:00",
  },
  {
    title: "04:00 PM - 04:00 PM",
    startTime: "16:00:00",
    endTime: "17:00:00",
  },
];

export const TYPE_OF_APPOINTMENT = [
  {
    code: "ROUTINE",
    display: "Routine appointment - default if not value",
  },
  {
    code: "WALKIN",
    display: "A previously unscheduled walk-in visit",
  },
  {
    code: "CHECKUP",
    display: "A routine check-up, such as an annual physical",
  },
  {
    code: "FOLLOWUP",
    display: "A follow up visit from a previous appointment	A",
  },
  {
    code: "EMERGENCY",
    display: "Emergency appointment",
  },
];

export const MONTHS = [
  {
    value: "0",
    title: "January",
  },
  {
    value: "1",
    title: "February",
  },
  {
    value: "2",
    title: "Marche",
  },
  {
    value: "3",
    title: "April",
  },
  {
    value: "4",
    title: "May",
  },
  {
    value: "5",
    title: "June",
  },
  {
    value: "6",
    title: "July",
  },
  {
    value: "7",
    title: "August",
  },
  {
    value: "8",
    title: "September",
  },
  {
    value: "9",
    title: "October",
  },
  {
    value: "10",
    title: "November",
  },
  {
    value: "11",
    title: "December",
  },
];

export const ALERT_STATUS = [
  {
    title: "Catastrophic",
    value: "Catastrophic",
  },
  {
    title: "Major",
    value: "Major",
  },
  {
    title: "Moderate",
    value: "Moderate",
  },

];

export const RULE_BLOOD_PRESSURE = [
  {
    title: "Systolic Greater Than",
    value: "Systolic Greater Than",
  },
  {
    title: "Systolic Less Than",
    value: "Systolic Less Than",
  },
  {
    title: "Diastolic Greater Than",
    value: "Diastolic Greater Than",
  },
  {
    title: "Diastolic Less Than",
    value: "Diastolic Less Than",
  },
];

export const RULE_BLOOD_GLUCOSE = [
  {
    title: "Blood Glucose Greater Than",
    value: "Blood Glucose Greater Than",
  },
  {
    title: "Blood Glucose Less Than",
    value: "Blood Glucose Less Than",
  },
];

export const RULE_HEART_RATE = [
  {
    title: "Heart Rate Greater Than",
    value: "Heart Rate Greater Than",
  },
  {
    title: "Heart Rate Less Than",
    value: "Heart Rate Less Than",
  },
];

export const RULE_BMI = [
  {
    title: "BMI Greater Than",
    value: "BMI Greater Than",
  },
  {
    title: "BMI Less Than",
    value: "BMI Less Than",
  },
];

export const RULE_TEMPERATURE = [
  {
    title: "Temperature Greater Than",
    value: "Temperature Greater Than",
  },
  {
    title: "Temperature Less Than",
    value: "Temperature Less Than",
  },
];

export const BLOOD_PRESSURE = [
  {
    label: "Bleeding from nose",
    value: "Bleeding from nose"
  },
  {
    label: "Shortness of breath",
    value: "Shortness of breath"
  },
  {
    label: "Dizziness",
    value: "Dizziness"
  },
  {
    label: "Fainting",
    value: "Fainting"
  },
  {
    label: "Fatigue",
    value: "Fatigue"
  },
  {
    label: "Nausea",
    value: "Nausea"
  },
]

export const BLOOD_GLUCOSE = [
  {
    label: "Increased thirst",
    value: "Increased thirst"
  },
  {
    label: "Abdominal pain",
    value: "Abdominal pain"
  },
  {
    label: "Loss of consciousness",
    value: "Loss of consciousness"
  },
  {
    label: "Headache",
    value: "Headache"
  },
  {
    label: "Shaking",
    value: "Shaking"
  },
  {
    label: "Numbness of tongue",
    value: "Numbness of tongue"
  },
]

export const HEART_RATE = [
  {
    label: "Palpitations",
    value: "Palpitations"
  },
  {
    label: "Lightheadedness",
    value: "Lightheadedness"
  },
  {
    label: "Chest pain",
    value: "Chest pain"
  },
  {
    label: "Confusion",
    value: "Confusion"
  },
  {
    label: "Difficulty in initiating movement",
    value: "Difficulty in initiating movement"
  },
  {
    label: "Shortness of breath",
    value: "Shortness of breath"
  },
]

export const BMI = [
  {
    label: "Snoring",
    value: "Snoring"
  },
  {
    label: "Back pain",
    value: "Back pain"
  },
  {
    label: "Joint pain",
    value: "Joint pain"
  },
  {
    label: "Loss of hair",
    value: "Loss of hair"
  },
  {
    label: "Tired all the time",
    value: "Tired all the time"
  },
]

export const TEMPERATURE = [
  {
    label: "Sweating",
    value: "Sweating"
  },
  {
    label: "Chill",
    value: "Chill"
  },
  {
    label: "Muscle pain",
    value: "Muscle pain"
  },
  {
    label: "Loss of appetite",
    value: "Loss of appetite"
  },
  {
    label: "Shallow breathing",
    value: "Shallow breathing"
  },
  {
    label: "Clumsiness",
    value: "Clumsiness"
  },
  {
    label: "Drowsy",
    value: "Drowsy"
  },
]