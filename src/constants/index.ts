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
    name: "All",
    code: "",
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
    title: "Asymptomatic",
    value: "Asymptomatic",
  },
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
  {
    title: "Minor",
    value: "Minor",
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
    title:"Bleeding from nose",
    value:"Bleeding from nose"
  },
  {
    title:"Shortness of breath",
    value:"Shortness of breath"
  },
  {
    title:"Dizziness",
    value:"Dizziness"
  },
  {
    title:"Fainting",
    value:"Fainting"
  },
  {
    title:"Fatigue",
    value:"Fatigue"
  },
  {
    title:"Nausea",
    value:"Nausea"
  },
]

export const BLOOD_GLUCOSE = [
  {
    title:"Increased thirst",
    value:"Increased thirst"
  },
  {
    title:"Abdominal pain",
    value:"Abdominal pain"
  },
  {
    title:"Loss of consciousness",
    value:"Loss of consciousness"
  },
  {
    title:"Headache",
    value:"Headache"
  },
  {
    title:"Shaking",
    value:"Shaking"
  },
  {
    title:"Numbness of tongue",
    value:"Numbness of tongue"
  },
]

export const HEART_RATE = [
  {
    title:"Palpitations",
    value:"Palpitations"
  },
  {
    title:"Lightheadedness",
    value:"Lightheadedness"
  },
  {
    title:"Chest pain",
    value:"Chest pain"
  },
  {
    title:"Confusion",
    value:"Confusion"
  },
  {
    title:"Difficulty in initiating movement",
    value:"Difficulty in initiating movement"
  },
  {
    title:"Shortness of breath",
    value:"Shortness of breath"
  },
]

export const BMI = [
  {
    title:"Snoring",
    value:"Snoring"
  },
  {
    title:"Back pain",
    value:"Back pain"
  },
  {
    title:"Joint pain",
    value:"Joint pain"
  },
  {
    title:"Loss of hair",
    value:"Loss of hair"
  },
  {
    title:"Tired all the time",
    value:"Tired all the time"
  },
]

export const TEMPERATURE = [
  {
    title:"Sweating",
    value:"Sweating"
  },
  {
    title:"Chill",
    value:"Chill"
  },
  {
    title:"Muscle pain",
    value:"Muscle pain"
  },
  {
    title:"Loss of appetite",
    value:"Loss of appetite"
  },
  {
    title:"Shallow breathing",
    value:"Shallow breathing"
  },
  {
    title:"Clumsiness",
    value:"Clumsiness"
  },
  {
    title:"Drowsy",
    value:"Drowsy"
  },
]