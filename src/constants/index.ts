import OverviewDepartment from "../pages/Department/Detail/OverviewDepartment";
import OverviewDiagnostic from "../pages/DiagnosticReport/Detail/OverviewDiagnostic";
import OverviewDoctor from "../pages/Doctor/Detail/OverviewDoctor";
import OverviewStaff from "../pages/Staff/Detail/OverviewStaff";

import ScheduleDoctor from "../pages/Doctor/Detail/ScheduleDoctor";
import ScheduleStaff from "../pages/Staff/Detail/ScheduleStaff";
import PreviousAppointment from "../pages/Appointment/PreviousAppointment";
import UpcomingAppointment from "../pages/Appointment/UpcomingAppointment";
import InformationPatient from "../pages/Patient/Detail/Infomation";

export const RouterUrl = {
  DASHBOARD: "/dashboard",
  DOCTOR: "/doctor",
  PATIENT: "/patient",
  DEPARTMENT: "/department",
  SCHEDULE: "/schedule",
  APPOINTMENT: "/appointment",
  DIAGNOSTIC_REPORT: "/diagnostic-report",
  STAFF: "/staff",
  PRACTITIONER: "/practitioner",
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",
  CHANGE_PASSWORD: "/change-password",
  INFORMATION: "/information",
  CHAT: "/chat",
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
    code: "male",
  },
  {
    name: "Female",
    code: "female",
  },
  {
    name: "Other",
    code: "other",
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

export const TYPE_PRACTITIONER = [
  {
    name: "Doctor",
    code: "Doctor",
  },
  {
    name: "Staff",
    code: "Staff",
  },
];
