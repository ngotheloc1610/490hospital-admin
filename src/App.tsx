import { HashRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { RouterUrl } from "./constants";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import Department from "./pages/Department";
import DiagnosticReport from "./pages/DiagnosticReport";
import Staff from "./pages/Staff";
import Login from "./pages/Authentication/Login";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/main.scss";
import "./assets/css/style.scss";
import "./assets/scss/pix-custom.scss";

import "../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
import "../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";

import DetailDoctor from "./pages/Doctor/Detail";
import DetailStaff from "./pages/Staff/Detail";
import DetailDepartment from "./pages/Department/Detail";
import DetailPatient from "./pages/Patient/Detail";
import InfoDoctor from "./pages/Doctor/Detail/InfoDoctor";
import CreateEditDoctor from "./pages/Doctor/Detail/CreateEditDoctor";
import InfoDepartment from "./pages/Department/Detail/InfoDepartment";
import CreateEditDepartment from "./pages/Department/Detail/CreateEditDepartment";
import InfoStaff from "./pages/Staff/Detail/InfoStaff";
import CreateEditStaff from "./pages/Staff/Detail/CreateEditStaff";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import InfoPatient from "./pages/Patient/Detail/Infomation/InfoPatient";
import CreateEditPatient from "./pages/Patient/Detail/Infomation/CreateEditPatient";
import ChangePassword from "./pages/Authentication/ChangePassword";
import Practitioner from "./pages/Practitioner";
import ScheduleDoctor from "./pages/Doctor/Detail/ScheduleDoctor";
import Information from "./pages/Information";
import EditPractitioner from "./pages/Information/EditPractitioner";
import { useAppSelector } from "./redux/hooks";
import Chat from "./pages/Chat";
import PatientMonitor from "./pages/PatientMonitor";
import BookAppointment from "./pages/BookApointment";
import Setting from "./pages/Setting";
import AppointmentPending from "./pages/Appointment/Pending";
import AppointmentBooked from "./pages/Appointment/Booked";
import AppointmentProposed from "./pages/Appointment/Proposed";
import PatientDashboard from "./pages/Dashboard/Patient";
import AppointmentDashboard from "./pages/Dashboard/Appointment";
import PatientMonitorDetail from "./pages/PatientMonitor/PatientMonitorDetail";
import Schedule from "./pages/Schedule";

// import "./firebase"

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.bundle.min");
}

const RouterDom = () => (
  <Routes>
    <Route path="/" element={<PatientDashboard />} />
    <Route path={RouterUrl.DASHBOARD} element={<Dashboard />}>
      <Route path="patient" element={<PatientDashboard />} />
      <Route path="appointment" element={<AppointmentDashboard />} />
    </Route>

    <Route path={RouterUrl.DOCTOR} element={<Doctor />}>
      <Route path="overview" element={<DetailDoctor />}>
        <Route path=":doctorId" element={<InfoDoctor />} />
        <Route path="detail/:doctorId" element={<CreateEditDoctor />} />
        <Route path="scheduler" element={<ScheduleDoctor />} />
      </Route>
    </Route>

    <Route path={RouterUrl.PATIENT} element={<Patient />}>
      <Route path="information" element={<DetailPatient />}>
        <Route path=":patientId" element={<InfoPatient />} />
        <Route path="detail/:patientId" element={<CreateEditPatient />} />
      </Route>
    </Route>

    <Route path={RouterUrl.DEPARTMENT} element={<Department />}>
      <Route path="overview" element={<DetailDepartment />}>
        <Route path=":departmentId" element={<InfoDepartment />} />
        <Route path="detail" element={<CreateEditDepartment />} />
      </Route>
    </Route>

    <Route
      path={RouterUrl.APPOINTMENT_PENDING}
      element={<AppointmentPending />}
    />
    <Route
      path={RouterUrl.APPOINTMENT_BOOKED}
      element={<AppointmentBooked />}
    />
    <Route
      path={RouterUrl.APPOINTMENT_PROPOSED}
      element={<AppointmentProposed />}
    />

    <Route path={RouterUrl.PRACTITIONER} element={<Practitioner />} />

    <Route path={RouterUrl.DIAGNOSTIC_REPORT} >
      <Route path=":encounterId" element={<DiagnosticReport />} />
    </Route>

    <Route path={RouterUrl.STAFF} element={<Staff />}>
      <Route path="overview" element={<DetailStaff />}>
        <Route path=":staffId" element={<InfoStaff />} />
        <Route path="detail/:staffId" element={<CreateEditStaff />} />
      </Route>
    </Route>

    <Route path={RouterUrl.LOGIN} element={<Login />} />
    <Route path={RouterUrl.FORGOT_PASSWORD} element={<ForgotPassword />} />
    <Route path={RouterUrl.CHANGE_PASSWORD} element={<ChangePassword />} />

    <Route path={RouterUrl.INFORMATION} element={<Information />}>
      <Route path=":practitionerId" element={<EditPractitioner />} />
    </Route>

    {/* <Route path={RouterUrl.CHAT} element={<Chat />} /> */}

    <Route path={RouterUrl.PATIENT_MONITOR} element={<PatientMonitor />} >
      <Route path=":monitorId" element={<PatientMonitorDetail />} />
    </Route>

    <Route path={RouterUrl.BOOK_APPOINTMENT} element={<BookAppointment />} />

    <Route path={RouterUrl.SETTING} element={<Setting />} />
    <Route path={RouterUrl.SCHEDULE} element={<Schedule />} />

    <Route path="*" element={<Navigate to={RouterUrl.DASHBOARD} />} />
  </Routes>
);

const _renderMainPage = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <RouterDom />
    </>
  );
};

const App = () => {

  const { isLogin, isForgotPassword } = useAppSelector((state) => state.authSlice);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {isLogin && _renderMainPage()}
      {!isLogin && !isForgotPassword && < Login />}
      {!isLogin && isForgotPassword && <ForgotPassword />}
      <ToastContainer theme="colored" />
    </BrowserRouter>
  );
};

export default App;
