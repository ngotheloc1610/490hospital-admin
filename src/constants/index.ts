import OverviewDepartment from "../pages/Department/Detail/OverviewDepartment";
import OverviewDiagnostic from "../pages/DiagnosticReport/Detail/OverviewDiagnostic";
import OverviewDoctor from "../pages/Doctor/Detail/OverviewDoctor";
import OverviewStaff from "../pages/Staff/Detail/OverviewStaff";

import ScheduleDoctor from "../pages/Doctor/Detail/ScheduleDoctor";
import ScheduleStaff from "../pages/Staff/Detail/ScheduleStaff";
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
  {
    title: "Schedule",
    content: ScheduleStaff,
  },
];

export const MenuDataDiagnostic = [
  {
    title: "Overview",
    content: OverviewDiagnostic,
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
    code: "active",
  },
  {
    name: "DeActive",
    code: "deactive",
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

export const DAYS = [
  {
    value: "7",
    title: "7 days",
  },
  {
    value: "30",
    title: "30 days",
  },
  {
    value: "",
    title: "All time",
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
