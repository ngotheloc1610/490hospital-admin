import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import { RouterUrl } from "./constants";
import { persistor } from "./redux/store/configureStore";

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

import PatientDetail from "./pages/Patient/PatientDetail";
import DetailPatient from "./pages/Patient/Detail";
import DetailDoctor from "./pages/Doctor/Detail";
import DetailStaff from "./pages/Staff/Detail";
import DetailDepartment from "./pages/Department/Detail";
import DetailDiagnostic from "./pages/DiagnosticReport/Detail";
import InfoDoctor from "./pages/Doctor/Detail/InfoDoctor";
import CreateEditDoctor from "./pages/Doctor/Detail/CreateEditDoctor";
import InfoDepartment from "./pages/Department/Detail/InfoDepartment";
import CreateEditDepartment from "./pages/Department/Detail/CreateEditDepartment";
import InfoStaff from "./pages/Staff/Detail/InfoStaff";
import CreateEditStaff from "./pages/Staff/Detail/CreateEditStaff";
import InfoDiagnostic from "./pages/DiagnosticReport/Detail/InfoDiagnostic";
import CreateEditDiagnostic from "./pages/DiagnosticReport/Detail/CreateEditDiagnostic";
import ForgotPassword from "./pages/Authentication/ForgotPassword";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.bundle.min");
}

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const RouterDom = () => (
  <BrowserRouter>
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
        <Route path=":patientId" element={<PatientDetail />} />
        <Route path="create" element={<DetailPatient />} />
      </Route>
      <Route path={RouterUrl.DEPARTMENT} element={<Department />}>
        <Route path="overview" element={<DetailDepartment />}>
          <Route path=":departmentId" element={<InfoDepartment />} />
          <Route path="detail" element={<CreateEditDepartment />} />
        </Route>
      </Route>
      <Route path={RouterUrl.SCHEDULE} element={<Schedule />} />
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
  </BrowserRouter>
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
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);

  return (
    <PersistGate loading={null} persistor={persistor}>
      {_renderMainPage()}
      {isLogin && <Login />}
      {isForgotPassword && <ForgotPassword />}
      <ToastContainer theme="colored" />
    </PersistGate>
  );
};

export default App;
