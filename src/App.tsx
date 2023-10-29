import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import { RouterUrl } from "./constants";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Doctor from "./pages/Doctor";
import Patient from "./pages/Patient";
import Department from "./pages/Department";
import Schedule from "./pages/Schedule";
import DiagnosticReport from "./pages/DiagnosticReport";
import Staff from "./pages/Staff";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";

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
import DetailDiagnostic from "./pages/DiagnosticReport/Detail";
import DetailPatient from "./pages/Patient/Detail";
import InfoDoctor from "./pages/Doctor/Detail/InfoDoctor";
import CreateEditDoctor from "./pages/Doctor/Detail/CreateEditDoctor";
import InfoDepartment from "./pages/Department/Detail/InfoDepartment";
import CreateEditDepartment from "./pages/Department/Detail/CreateEditDepartment";
import InfoStaff from "./pages/Staff/Detail/InfoStaff";
import CreateEditStaff from "./pages/Staff/Detail/CreateEditStaff";
import InfoDiagnostic from "./pages/DiagnosticReport/Detail/InfoDiagnostic";
import CreateEditDiagnostic from "./pages/DiagnosticReport/Detail/CreateEditDiagnostic";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import InfoPatient from "./pages/Patient/Detail/InfoPatient";
import CreateEditPatient from "./pages/Patient/Detail/CreateEditPatient";
import Appointment from "./pages/Appointment";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.bundle.min");
}

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const RouterDom = () => (
  <Suspense fallback={loading}>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path={RouterUrl.DASHBOARD} element={<Dashboard />} />

      <Route path={RouterUrl.DOCTOR} element={<Doctor />}>
        <Route path="overview" element={<DetailDoctor />}>
          <Route path=":doctorId" element={<InfoDoctor />} />
          <Route path="detail" element={<CreateEditDoctor />} />
        </Route>
      </Route>

      <Route path={RouterUrl.PATIENT} element={<Patient />}>
        <Route path="overview" element={<DetailPatient />}>
          <Route path=":patientId" element={<InfoPatient />} />
          <Route path="detail" element={<CreateEditPatient />} />
        </Route>
      </Route>

      <Route path={RouterUrl.DEPARTMENT} element={<Department />}>
        <Route path="overview" element={<DetailDepartment />}>
          <Route path=":departmentId" element={<InfoDepartment />} />
          <Route path="detail" element={<CreateEditDepartment />} />
        </Route>
      </Route>

      <Route path={RouterUrl.SCHEDULE} element={<Schedule />} />

      <Route path={RouterUrl.APPOINTMENT} element={<Appointment />} />

      <Route path={RouterUrl.DIAGNOSTIC_REPORT} element={<DiagnosticReport />}>
        <Route path="overview" element={<DetailDiagnostic />}>
          <Route path=":diagnosticId" element={<InfoDiagnostic />} />
          <Route path="detail" element={<CreateEditDiagnostic />} />
        </Route>
      </Route>

      <Route path={RouterUrl.STAFF} element={<Staff />}>
        <Route path="overview" element={<DetailStaff />}>
          <Route path=":staffId" element={<InfoStaff />} />
          <Route path="detail" element={<CreateEditStaff />} />
        </Route>
      </Route>

      <Route path={RouterUrl.LOGIN} element={<Login />} />
      <Route path={RouterUrl.REGISTER} element={<Register />} />
      <Route path={RouterUrl.FORGOT_PASSWORD} element={<ForgotPassword />} />

      <Route path="*" element={<Navigate to={RouterUrl.DASHBOARD} />} />
    </Routes>
  </Suspense>
);

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <RouterDom />
      <ToastContainer theme="colored" />
    </BrowserRouter>
  );
};

export default App;
