import { memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterUrl } from "../../constants";
import { ICON_APPOINTMENT, ICON_BOOK_APPOINTMENT, ICON_DASHBOARD, ICON_DEPARTMENT, ICON_DIAGNOSTIC, ICON_DOCTOR, ICON_MESSAGE, ICON_PATIENT, ICON_SETTING, ICON_STAFF } from "../../assets";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getClass = (url: string) => {
    return location.pathname.includes(url) ? "active" : "";
  };

  const goToLink = (url: string) => {
    navigate(url);
  };

  return (
    <nav className="main-navbar">
      <div className="inner-navbar">
        <ul className="main-navbar__menu">
          <li className={`${getClass(RouterUrl.DASHBOARD)}`}>
            <a
              onClick={() => goToLink(RouterUrl.DASHBOARD)}
              data-content-id="dashboard"
            >
              <ICON_DASHBOARD />
              <span>Dashboard</span>
            </a>
          </li>
          <li className={`${getClass(RouterUrl.DOCTOR)}`}>
            <a
              onClick={() => goToLink(RouterUrl.DOCTOR)}
              data-content-id="doctor"
            >
              <ICON_DOCTOR />
              <span>Doctor</span>
            </a>
          </li>
          <li className={`${getClass(RouterUrl.PATIENT)}`}>
            <a
              onClick={() => goToLink(RouterUrl.PATIENT)}
              data-content-id="patient"
            >
              <ICON_PATIENT />
              <span>Patient</span>
            </a>
          </li>

          <li className={`${getClass(RouterUrl.PATIENT_MONITOR)}`}>
            <a
              onClick={() => goToLink(RouterUrl.PATIENT_MONITOR)}
              data-content-id="patient-monitor"
            >
              <ICON_PATIENT />
              <span>Patient Monitor</span>
            </a>
          </li>
          {/* <li className={`${getClass(RouterUrl.DEPARTMENT)}`}>
            <a
              onClick={() => goToLink(RouterUrl.DEPARTMENT)}
              data-content-id="department"
            >
              <ICON_DEPARTMENT />
              <span>Department</span>
            </a>
          </li> */}

          <li className={`${getClass(RouterUrl.BOOK_APPOINTMENT)}`}>
            <a
              onClick={() => goToLink(RouterUrl.BOOK_APPOINTMENT)}
              data-content-id="book-appointment"
            >
              <ICON_BOOK_APPOINTMENT />
              <span>Book Appointment</span>
            </a>
          </li>

          <li className={`${getClass(RouterUrl.APPOINTMENT)}`}>
            <a
              onClick={() => goToLink(RouterUrl.APPOINTMENT)}
              data-content-id="appointment"
            >
              <ICON_APPOINTMENT />
              <span>List Appointment</span>
            </a>
          </li>


          {/* <li className={`${getClass(RouterUrl.DIAGNOSTIC_REPORT)}`}>
            <a
              onClick={() => goToLink(RouterUrl.DIAGNOSTIC_REPORT)}
              data-content-id="diagnostic-report"
            >
              <ICON_DIAGNOSTIC />
              <span>Diagnostic Report</span>
            </a>
          </li> */}
          <li className={`${getClass(RouterUrl.STAFF)}`}>
            <a
              onClick={() => goToLink(RouterUrl.STAFF)}
              data-content-id="staff"
            >
              <ICON_STAFF />
              <span>Staff</span>
            </a>
          </li>

          <li className={`${getClass(RouterUrl.PRACTITIONER)}`}>
            <a
              onClick={() => goToLink(RouterUrl.PRACTITIONER)}
              data-content-id="practitioner"
            >
              <ICON_STAFF />
              <span>Create Practitioner</span>
            </a>
          </li>

          <li className={`${getClass(RouterUrl.CHAT)}`}>
            <a
              onClick={() => goToLink(RouterUrl.CHAT)}
              data-content-id="chat"
            >
              <ICON_MESSAGE />
              <span>Inbox Message</span>
            </a>
          </li>

          <li className={`${getClass(RouterUrl.SETTING)}`}>
            <a
              onClick={() => goToLink(RouterUrl.SETTING)}
              data-content-id="setting"
            >
              <ICON_SETTING />
              <span>Setting</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default memo(Sidebar);
