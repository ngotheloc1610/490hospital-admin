import OverviewDepartment from "../pages/Department/Detail/OverviewDepartment";
import OverviewDoctor from "../pages/Doctor/Detail/OverviewDoctor";
import ScheduleDoctor from "../pages/Doctor/Detail/ScheduleDoctor";
import InformationPatient from "../pages/Patient/Detail/InformationPatient";

export const RouterUrl = {
  DASHBOARD: "/dashboard",
  DOCTOR: "/doctor",
  PATIENT: "/patient",
  DEPARTMENT: "/department",
  APPOINTMENT: "/appointment",
  DIAGNOSTIC_REPORT: "/diagnostic-report",
  STAFF: "/staff",
  LOGIN: "/login",
  REGISTER: "/register",
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

export const GENDER = [
  {
    name: "Male",
    code: "male",
  },
  {
    name: "Female",
    code: "female",
  },
];

export const STATUS = [
  {
    name: "Present",
    code: 1,
  },
  {
    name: "Absent",
    code: 0,
  },
];
