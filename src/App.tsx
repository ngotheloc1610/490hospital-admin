import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
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
import Appointment from "./pages/Appointment";
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

import PatientDetail from "./pages/Patient/PatientDetail";
import DetailPatient from "./pages/Patient/Detail";
import DetailDoctor from "./pages/Doctor/Detail";
import DetailDepartment from "./pages/Department/Detail";
import InfoDoctor from "./pages/Doctor/Detail/InfoDoctor";
import CreateEditDoctor from "./pages/Doctor/Detail/CreateEditDoctor";
import InfoDepartment from "./pages/Department/Detail/InfoDepartment";
import CreateEditDepartment from "./pages/Department/Detail/CreateEditDepartment";

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
        <Route path=":patientId" element={<PatientDetail />} />
        <Route path="create" element={<DetailPatient />} />
      </Route>
      <Route path={RouterUrl.DEPARTMENT} element={<Department />}>
        <Route path="overview" element={<DetailDepartment />}>
          <Route path=":departmentId" element={<InfoDepartment />} />
          <Route path="detail" element={<CreateEditDepartment />} />
        </Route>
      </Route>
      <Route path={RouterUrl.APPOINTMENT} element={<Appointment />} />
      <Route
        path={RouterUrl.DIAGNOSTIC_REPORT}
        element={<DiagnosticReport />}
      />
      <Route path={RouterUrl.STAFF} element={<Staff />} />
      <Route path={RouterUrl.LOGIN} element={<Login />} />
      <Route path={RouterUrl.REGISTER} element={<Register />} />

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