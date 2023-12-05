import { useEffect, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

import { MONTHS } from "../../../constants";
import { ICON_PATIENT } from "../../../assets";
import { API_DASHBOARD_ALL_PATIENT_GENDER, API_DASHBOARD_NEW_PATIENT, API_DASHBOARD_OLD_PATIENT, API_DASHBOARD_PATIENT_CANCELED, API_DASHBOARD_PATIENT_FULFILLED, API_DASHBOARD_PATIENT_PER_DAY } from "../../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../../Common/utils";
import axios from "axios";
import { startOfMonth, endOfMonth, format } from 'date-fns';
import TotalView from "../../../components/common/TotalView";
import moment from "moment";
import { FORMAT_DATE } from "../../../constants/general.constant";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const PatientDashboard = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const [monthPatient, setMonthPatient] = useState<string>("");
  const [monthNewPatient, setMonthNewPatient] = useState<string>("");
  const [monthOldPatient, setmonthOldPatient] = useState<string>("");

  const [dateOfMonthPatient, setDateOfMonthPatient] = useState<any>(new Date());
  const [dateOfMonthNewPatient, setDateOfMonthNewPatient] = useState<any>(new Date("2024-01-01"));
  const [dateOfMonthOldPatient, setDateOfMonthOldPatient] = useState<any>(new Date("2024-01-01"));

  const [patient, setPatient] = useState<any>(null);
  const [genderPatient, setGenderPatient] = useState<any>(null);
  const [appointmentFulfilled, setAppointmentFulfilled] = useState<any>(null);
  const [appointmentCanceled, setAppointmentCanceled] = useState<any>(null);
  const [newPatient, setNewPatient] = useState<any>(null);
  const [oldPatient, setOldPatient] = useState<any>(null);


  useEffect(() => {
    const newDate = new Date(dateOfMonthPatient);
    const month = parseInt(monthPatient, 10);

    if (!isNaN(month)) {
      newDate.setMonth(month);
      setDateOfMonthPatient(newDate);
    }
  }, [monthPatient])

  useEffect(() => {
    const newDate = new Date(dateOfMonthNewPatient);
    const month = parseInt(monthPatient, 10);

    if (!isNaN(month)) {
      newDate.setMonth(month);
      setDateOfMonthNewPatient(newDate);
    }
  }, [monthNewPatient])

  useEffect(() => {
    const newDate = new Date(dateOfMonthOldPatient);
    const month = parseInt(monthPatient, 10);

    if (!isNaN(month)) {
      newDate.setMonth(month);
      setDateOfMonthOldPatient(newDate);
    }
  }, [monthOldPatient])

  useEffect(() => {
    getNumberPatients();
    getNumberGender();
    getNewPatient();
    getOldPatient();
    getAppointmentFulfilled();
    getAppointmentCanceled();
  }, [])

  useEffect(() => {
    getNumberPatients()
  }, [dateOfMonthPatient])

  useEffect(() => {
    getNewPatient()
  }, [dateOfMonthNewPatient])

  useEffect(() => {
    getOldPatient()
  }, [dateOfMonthOldPatient])


  const getNumberPatients = () => {
    const url = `${url_api}${API_DASHBOARD_PATIENT_PER_DAY}`;

    const startDate = startOfMonth(dateOfMonthPatient);
    const endDate = endOfMonth(dateOfMonthPatient);

    const params = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    }

    axios
      .get(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          const newPatient = Object.entries(resp.data.newPatient).map(([date, number]) => ({ date, number }));
          const sortedNewPatient = newPatient.sort((a: any, b: any) => {
            const dateA = a.date.getTime();
            const dateB = b.date.getTime();
            return dateA - dateB;
          });
          const oldPatient = Object.entries(resp.data.oldPatient).map(([date, number]) => ({ date, number }));
          const sortedOldPatient = oldPatient.sort((a: any, b: any) => {
            const dateA = a.date.getTime();
            const dateB = b.date.getTime();
            return dateA - dateB;
          });
          setPatient({ newPatient: sortedNewPatient, oldPatient: sortedOldPatient })
        }
      })
      .catch((err: any) => {
        console.log("error get numberPatients:", err);
      });
  }

  const getNumberGender = () => {
    const url = `${url_api}${API_DASHBOARD_ALL_PATIENT_GENDER}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const gender = Object.entries(resp.data).map(([title, number]) => ({ title, number }));
          setGenderPatient(gender);
        }
      })
      .catch((err: any) => {
        console.log("error get numberGender:", err);
      });
  }

  const getNewPatient = () => {
    const url = `${url_api}${API_DASHBOARD_NEW_PATIENT}`;

    const startDate = startOfMonth(dateOfMonthNewPatient);
    const endDate = endOfMonth(dateOfMonthNewPatient);

    const params = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    }

    axios
      .get(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          setNewPatient(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get new patients:", err);
      });
  }

  const getOldPatient = () => {
    const url = `${url_api}${API_DASHBOARD_OLD_PATIENT}`;

    const startDate = startOfMonth(dateOfMonthOldPatient);
    const endDate = endOfMonth(dateOfMonthOldPatient);

    const params = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    }

    axios
      .get(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          setOldPatient(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get old patients:", err);
      });
  }

  const getAppointmentFulfilled = () => {
    const url = `${url_api}${API_DASHBOARD_PATIENT_FULFILLED}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const appointment = Object.entries(resp.data).map(([name, value]) => ({ name, value }));
          const sortedAppointment = appointment.sort((a: any, b: any) => { return b.value - a.value });
          setAppointmentFulfilled(sortedAppointment);
        }
      })
      .catch((err: any) => {
        console.log("error get old patients:", err);
      });
  }

  const getAppointmentCanceled = () => {
    const url = `${url_api}${API_DASHBOARD_PATIENT_CANCELED}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const appointment = Object.entries(resp.data).map(([name, value]) => ({ name, value }));
          const sortedAppointment = appointment.sort((a: any, b: any) => { return b.value - a.value });
          setAppointmentCanceled(sortedAppointment);
        }
      })
      .catch((err: any) => {
        console.log("error get old patients:", err);
      });
  }

  const dataLinePatient = {
    labels: patient?.newPatient?.map((patient: any) => moment(patient.date).format(FORMAT_DATE)),
    datasets: [
      {
        label: "New Patient",
        borderColor: "#8DE27F",
        backgroundColor: "#8DE27F",
        data: patient?.newPatient?.map((patient: any) => patient.number),
        fill: true,
        tension: 0.4
      },
      {
        label: "Old Patient",
        borderColor: "#F59898",
        backgroundColor: "#F59898",
        data: patient?.oldPatient?.map((patient: any) => patient.number),
        fill: true,
        tension: 0.4
      },
    ],
  };

  const dataDoughnutGender = {
    labels: genderPatient?.map((gender: any) => gender.title),
    datasets: [
      {
        label: "Male",
        borderColor: "rgba(90, 106, 207, 1)",
        backgroundColor: "rgba(90, 106, 207, 1)",
        data: genderPatient?.filter((gender: any) => gender.title.trim() === "MALE")?.number,
      },
      {
        label: "Female",
        borderColor: "rgba(133, 147, 237, 1)",
        backgroundColor: "rgba(133, 147, 237, 1)",
        data: genderPatient?.filter((gender: any) => gender.title.trim() === "FEMALE")?.number,
      },
      {
        label: "Other",
        borderColor: "rgba(199, 206, 255, 1)",
        backgroundColor: "rgba(199, 206, 255, 1)",
        data: genderPatient?.filter((gender: any) => gender.title.trim() === "OTHER")?.number,
      },
      {
        label: "total appointment",
        borderColor: "rgba(199, 206, 255, 1)",
        backgroundColor: "rgba(199, 206, 255, 1)",
        data: genderPatient?.filter((gender: any) => gender.title === "TOTAL APPOINTMENT ")?.number,
      },
    ],
  };

  const optionsLine = {
    plugins: {
      legend: {
        display: false,
        // position: 'bottom',
      },
    },
    cutoutPercentage: 70,
    tooltips: {
      enabled: true,
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const label = data.labels[tooltipItem.index] || '';
          const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
          return label + ': ' + value + '%';
        }
      }
    }
  };

  const optionsDoughnut = {
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#ffffff', // Label text color
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value: any, context: any) => {
          // Customize label text here
          return value + '%';
        }
      }

    },
    cutoutPercentage: 70,
    tooltips: {
      enabled: true,
      callbacks: {
        label: (tooltipItem: any, data: any) => {
          const label = data.labels[tooltipItem.index] || '';
          const value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] || '';
          return label + ': ' + value + '%';
        }
      }
    },

  };

  const _renderMonths = () => {
    return (
      <>
        <option hidden>This Month</option>
        {MONTHS.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))}
      </>
    );
  };

  return (
    <>
      <TotalView />
      <div className="m-3">
        <div className="row gy-5">
          <div className="col-8 ">
            <div className="box">
              <div className="p-3 border-bottom d-flex justify-content-between">
                <p className="title">Number of patients</p>
                <select
                  className="input-select input-select-w15"
                  onChange={(e) => setMonthPatient(e.target.value)}
                >
                  {_renderMonths()}
                </select>
              </div>
              <div className="p-3">
                <Line
                  data={dataLinePatient}
                  options={optionsLine}
                />
              </div>
            </div>
          </div>

          <div className="col-4">
            <div className="box">
              <div className="p-3">
                <p className="title">Patient by Gender</p>
              </div>
              <div className="p-3">
                <Doughnut

                  data={dataDoughnutGender}
                  options={optionsDoughnut}
                />
              </div>
              {/* <div className="p-3 border-top d-flex justify-content-between">
                <p>
                  <span>Male</span>
                  <span></span>
                </p>
                <p>
                  <span>Female</span>
                  <span></span>
                </p>
                <p>
                  <span>Other</span>
                  <span></span>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="m-3">
        <div className="row gy-3">
          <div className="col-6">
            <div className="box d-flex p-3">
              <div className="me-3">
                <span className="image-patient">
                  <ICON_PATIENT />
                </span>
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <p className="title">New Patients</p>
                  <select
                    className="input-select  input-select-w25"
                    onChange={(e) => setMonthNewPatient(e.target.value)}
                  >
                    {_renderMonths()}
                  </select>
                </div>
                <div className="mt-3">
                  <p className="fw-bold">{newPatient?.newPatientCount}</p>
                  <p className="fw-bold">{newPatient?.newPatientCountCompare}% Increase in 7 days</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${newPatient?.percentIncrease}%`, background: "linear-gradient(90deg, #7EF9A0 0%, #A0FF69 69.79%, #D7F990 100%)" }}
                      aria-valuenow={newPatient?.percentIncrease}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="box d-flex p-3">
              <div className="me-3">
                <span className="image-patient">
                  <ICON_PATIENT />
                </span>
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <p className="title">Old Patients</p>
                  <select
                    className="input-select  input-select-w25"
                    onChange={(e) => setmonthOldPatient(e.target.value)}
                  >
                    {_renderMonths()}
                  </select>
                </div>
                <div className="mt-3">
                  <p className="fw-bold">{oldPatient?.oldPatientCount}</p>
                  <p className="fw-bold">{oldPatient?.oldPatientCountCompare}% Increase in 7 days</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${oldPatient?.percentIncrease}%`, background: "linear-gradient(117deg, #FF8473 16.53%, #FF937F 42.12%, #FFA18A 65.16%, #FBED93 77.95%)" }}
                      aria-valuenow={oldPatient?.percentIncrease}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-3">
        <div className="row">
          <div className="col-6">
            <div className="box p-3">
              <p className="title">Patient with most appointment</p>
              <table className="table m-3">
                <tbody>
                  {appointmentFulfilled && appointmentFulfilled.map((item: any, idx: number) => {
                    return (
                      <tr>
                        <th scope="row">{++idx}</th>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-6">
            <div className="box p-3">
              <p className="title">Spam Patient</p>
              <table className="table m-3">
                <tbody>
                  {appointmentCanceled && appointmentCanceled.map((item: any, idx: number) => {
                    return (
                      <tr>
                        <th scope="row">{++idx}</th>
                        <td>{item.name}</td>
                        <td>{item.value}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PatientDashboard;
