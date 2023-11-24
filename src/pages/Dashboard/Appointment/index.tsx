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
  Tooltip,
} from "chart.js";

import Layout from "../../../components/Layout";
import TotalView from "../../../components/common/TotalView";
import { MONTHS } from "../../../constants";
import { ICON_PATIENT, USER } from "../../../assets";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
);

const AppointmentDashboard = () => {
  const [monthAppointment, setMonthAppointment] = useState<string>("");
  const [monthAppointmentBook, setMonthAppointmentBook] = useState<string>("");

  const dataLineAppointment = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Booked",
        borderColor: "#8DE27F ",
        backgroundColor: "#8DE27F ",
        data: [65, 59, 80, 81, 56],
      },
      {
        label: "Pending",
        borderColor: "#F59898",
        backgroundColor: "#F59898",
        data: [28, 48, 40, 19, 86],
      },
      {
        label: "Proposed",
        borderColor: "#59C3CF",
        backgroundColor: "#59C3CF",
        data: [28, 48, 40, 19, 86],
      },
    ],
  };

  const dataLineAppointmentBook = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Fulfilled",
        borderColor: "#8DE27F ",
        backgroundColor: "#8DE27F ",
        data: [65, 59, 80, 81, 56],
      },
      {
        label: "No Show",
        borderColor: "#F59898",
        backgroundColor: "#F59898",
        data: [28, 48, 40, 19, 86],
      },
      {
        label: "Canceled",
        borderColor: "#59C3CF",
        backgroundColor: "#59C3CF",
        data: [28, 48, 40, 19, 86],
      },
    ],
  };

  const dataDoughnutAppointment = {
    labels: [""],
    datasets: [
      {
        label: "Booked",
        borderColor: "#4887F6",
        backgroundColor: "#4887F6",
        data: [65, 59, 80, 81, 56],
      },
      {
        label: "Pending",
        borderColor: "#F1CD49",
        backgroundColor: "#F1CD49",
        data: [28, 48, 40, 19, 86],
      },
      {
        label: "Proposed",
        borderColor: "#59C3CF",
        backgroundColor: "#59C3CF",
        data: [28, 48, 40, 19, 86],
      },
    ],
  };

  const dataDoughnutAppointmentBook = {
    labels: [""],
    datasets: [
      {
        label: "Fulfilled",
        borderColor: "#4887F6",
        backgroundColor: "#4887F6",
        data: [65, 59, 80],
      },
      {
        label: "No Show",
        borderColor: "#E2635E",
        backgroundColor: "#E2635E",
        data: [28, 48, 40],
      },
      {
        label: "Canceled",
        borderColor: "#F1CD49",
        backgroundColor: "#F1CD49",
        data: [22, 67, 70],
      },
    ],
  };

  const optionsLine = {
    // maintainAspectRatio: false,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
    // legend: {
    //   labels: {
    //     fontSize: 26,
    //   },
    // },
    // title: {
    //   display: true,
    //   text: 'Multi-Line Chart',
    // },
  };

  const optionsDoughnut = {
    // maintainAspectRatio: false,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
    // legend: {
    //   labels: {
    //     fontSize: 26,
    //   },
    // },
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
      <div>
        <div className="row">
          <div className="col-6">
            <p>Today Appointment</p>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <div>
                      <img src={USER} alt="" />
                      <div>
                        <p>Thornton</p>
                        <span>Scaling</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>On Going</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <p>Top Book specialty</p>
            <table className="table">
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

      <div>
        <div>
          <p>Total appointment</p>
          <select
            className="form-select"
            onChange={(e) => setMonthAppointment(e.target.value)}
          >
            {_renderMonths()}
          </select>
        </div>
        <div className="row">
          <div className="col-8">
            <Line
              height={100}
              width={300}
              data={dataLineAppointment}
              options={optionsLine}
            />
          </div>

          <div className="col-4">
            <Doughnut
              height={300}
              width={300}
              data={dataDoughnutAppointment}
              options={optionsDoughnut}
            />
          </div>
        </div>
      </div>

      <div>
        <div>
          <p>Booked appointment</p>
          <select
            className="form-select"
            onChange={(e) => setMonthAppointmentBook(e.target.value)}
          >
            {_renderMonths()}
          </select>
        </div>

        <div className="row">
          <div className="col-8">
            <Line
              height={100}
              width={300}
              data={dataLineAppointmentBook}
              options={optionsLine}
            />
          </div>

          <div className="col-4">
            <Doughnut
              height={300}
              width={300}
              data={dataDoughnutAppointmentBook}
              options={optionsDoughnut}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDashboard;
