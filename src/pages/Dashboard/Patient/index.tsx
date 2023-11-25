import { useState } from "react";
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
  const [monthPatient, setMonthPatient] = useState<string>("");
  const [monthNewPatient, setMonthNewPatient] = useState<string>("");
  const [monthOldPatient, setmonthOldPatient] = useState<string>("");

  const dataLinePatient = {
    labels: ["New Patient", "Old Patient"],
    datasets: [
      {
        label: "New Patient",
        borderColor: "#8DE27F",
        backgroundColor: "#8DE27F",
        data: [65, 59, 80, 81, 56],
        fill: true,
        tension: 0.4
      },
      {
        label: "Old Patient",
        borderColor: "#F59898",
        backgroundColor: "#F59898",
        data: [28, 48, 40, 19, 86],
        fill: true,
        tension: 0.4
      },
    ],
  };

  const dataDoughnutGender = {
    labels: ["Male", "Female", "Other"],
    datasets: [
      {
        label: "Male",
        borderColor: "rgba(90, 106, 207, 1)",
        backgroundColor: "rgba(90, 106, 207, 1)",
        data: [65, 59, 80],
      },
      {
        label: "Female",
        borderColor: "rgba(133, 147, 237, 1)",
        backgroundColor: "rgba(133, 147, 237, 1)",
        data: [28, 48, 40],
      },
      {
        label: "Other",
        borderColor: "rgba(199, 206, 255, 1)",
        backgroundColor: "rgba(199, 206, 255, 1)",
        data: [28, 48, 40],
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
                  <p className="fw-bold">41 234</p>
                  <p className="fw-bold">15% Increase in 7 days</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "75%", background: "linear-gradient(90deg, #7EF9A0 0%, #A0FF69 69.79%, #D7F990 100%)" }}
                      aria-valuenow={25}
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
                  <p className="fw-bold">35 234</p>
                  <p className="fw-bold">15% Increase in 7 days</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "75%", background: "linear-gradient(117deg, #FF8473 16.53%, #FF937F 42.12%, #FFA18A 65.16%, #FBED93 77.95%)" }}
                      aria-valuenow={75}
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
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-6">
            <div className="box p-3">
              <p className="title">Spam Patient</p>
              <table className="table m-3">
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
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
