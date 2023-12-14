import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RouterUrl } from "../../constants";
import {
  ICON_APPOINTMENT,
  ICON_BOOK_APPOINTMENT,
  ICON_DASHBOARD,
  ICON_DEPARTMENT,
  ICON_DIAGNOSTIC,
  ICON_DOCTOR,
  ICON_MESSAGE,
  ICON_PATIENT,
  ICON_SETTING,
  ICON_STAFF,
} from "../../assets";
import { KEY_LOCAL_STORAGE, TYPE_ADMIN, TYPE_DOCTOR } from "../../constants/general.constant";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdown, setIsDropdown] = useState<boolean>(false);
  const [isDropdownDashboard, setIsDropdownDashboard] = useState<boolean>(false);

  const type = localStorage.getItem(KEY_LOCAL_STORAGE.TYPE);

  const getClass = (url: string) => {
    return location.pathname.includes(url) ? "active" : "";
  };

  const getSubClass = (url: string) => {
    return location.pathname.includes(url) ? "sub-active" : "";
  };

  const goToLink = (url: string) => {
    navigate(url);
  };

  return (
    <nav className="main-navbar">
      <div className="inner-navbar">
        <ul className="main-navbar__menu">
          {type === TYPE_ADMIN && <li>
            <a data-content-id="dashboard" onClick={() => setIsDropdownDashboard(!isDropdownDashboard)}>
              <ICON_DASHBOARD />
              <span>Dashboard</span>
            </a>

            {isDropdownDashboard && (
              <ul>
                <li className={`${getSubClass(`${RouterUrl.DASHBOARD}/patient`)}`}>
                  <a
                    onClick={() => goToLink(`${RouterUrl.DASHBOARD}/patient`)}
                    data-content-id="dashboard-patient"
                  >
                    <span>Patient</span>
                  </a>
                </li>
                <li className={`${getSubClass(`${RouterUrl.DASHBOARD}/appointment`)}`}>
                  <a
                    onClick={() => goToLink(`${RouterUrl.DASHBOARD}/appointment`)}
                    data-content-id="dashboard-appointment"
                  >
                    <span>Appointment</span>
                  </a>
                </li>
              </ul>
            )}
          </li>}

          {type === TYPE_ADMIN && <>
            <li className={`${getClass(RouterUrl.DOCTOR)}`}>
              <a
                onClick={() => goToLink(RouterUrl.DOCTOR)}
                data-content-id="doctor"
              >
                <ICON_DOCTOR />
                <span>Doctor</span>
              </a>
            </li>
            <li className={`${location.pathname === "/patient" ? "active" : ""}`}>
              <a
                onClick={() => goToLink(RouterUrl.PATIENT)}
                data-content-id="patient"
              >
                <ICON_PATIENT />
                <span>Patient</span>
              </a>
            </li>
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
          </>}

          <li className={`${getClass(RouterUrl.PATIENT_MONITOR)}`}>
            <a
              onClick={() => goToLink(RouterUrl.PATIENT_MONITOR)}
              data-content-id="monitor"
            >
              <ICON_PATIENT />
              <span>Patient Monitor</span>
            </a>
          </li>
          {type !== TYPE_ADMIN && <li className={`${getClass(RouterUrl.SCHEDULE)}`}>
            <a
              onClick={() => goToLink(RouterUrl.SCHEDULE)}
              data-content-id="schedule"
            >
              <ICON_DEPARTMENT />
              <span>Schedule</span>
            </a>
          </li>}

          <li className={`${getClass(RouterUrl.BOOK_APPOINTMENT)}`}>
            <a
              onClick={() => goToLink(RouterUrl.BOOK_APPOINTMENT)}
              data-content-id="book-appointment"
            >
              <ICON_BOOK_APPOINTMENT />
              <span>Book Appointment</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => setIsDropdown(!isDropdown)}
              data-content-id="appointment"
            >
              <ICON_APPOINTMENT />
              <span>Appointment</span>
            </a>

            {isDropdown && (
              <ul>
                <li className={`${getSubClass(RouterUrl.APPOINTMENT_PENDING)}`}>
                  <a
                    onClick={() => goToLink(RouterUrl.APPOINTMENT_PENDING)}
                    data-content-id="appointment-pending"
                  >
                    <span>Pending</span>
                  </a>
                </li>
                <li className={`${getSubClass(RouterUrl.APPOINTMENT_BOOKED)}`}>
                  <a
                    onClick={() => goToLink(RouterUrl.APPOINTMENT_BOOKED)}
                    data-content-id="appointment-booked"
                  >
                    <span>Booked</span>
                  </a>
                </li>
                <li
                  className={`${getSubClass(RouterUrl.APPOINTMENT_PROPOSED)}`}
                >
                  <a
                    onClick={() => goToLink(RouterUrl.APPOINTMENT_PROPOSED)}
                    data-content-id="appointment-proposed"
                  >
                    <span>Proposed</span>
                  </a>
                </li>
              </ul>
            )}
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


          {type !== TYPE_DOCTOR && <li className={`${getClass(RouterUrl.CHAT)}`}>
            <a onClick={() => goToLink(RouterUrl.CHAT)} data-content-id="chat">
              <ICON_MESSAGE />
              <span>Inbox Message</span>
            </a>
          </li>}

          {type === TYPE_ADMIN && <li className={`${getClass(RouterUrl.SETTING)}`}>
            <a
              onClick={() => goToLink(RouterUrl.SETTING)}
              data-content-id="setting"
            >
              <ICON_SETTING />
              <span>Setting</span>
            </a>
          </li>}

        </ul>
      </div>
    </nav>
  );
};
export default memo(Sidebar);
