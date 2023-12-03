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

import { MONTHS } from "../../../constants";
import { USER } from "../../../assets";
import TotalView from "../../../components/common/TotalView";

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
    labels: ["Booked", "Pending", "Proposed"],
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
    labels: ["Fulfilled", "No Show", "Canceled"],
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
    labels: ["Booked", "Pending", "Proposed"],
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
    labels: ["Fulfilled", "No Show", "Canceled"],
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

  const doughnutLabel = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart: any, args: any, plugins: any) {
      const { ctx, data } = chart;

      console.log(chart.getDatasetMeta(0).data);


      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#9083D5";
      ctx.textAlign = "center";
      ctx.textBaseLine = "middle";
      ctx.fillText("2000", centerX, centerY)
      ctx.fillText("Total", centerX, 245)
    }
  }

  const doughnutLabelBooked = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart: any, args: any, plugins: any) {
      const { ctx, data } = chart;

      console.log(chart.getDatasetMeta(0).data);


      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#9083D5";
      ctx.textAlign = "center";
      ctx.textBaseLine = "middle";
      ctx.fillText("2000", centerX, centerY)
      ctx.fillText("Total", centerX, 245)
    }
  }

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
        <div className="row">
          <div className="col-6">
            <div className="box p-3 h-100">
              <p className="title">Today Appointment</p>
              <table className="table m-2">
                <tbody>
                  <tr>
                    <td>
                      <div className="d-flex">
                        <img src={USER} alt="" className="image-appointment my-auto" />
                        <div className="ms-3">
                          <p className="fw-bold">Thornton</p>
                          <span>Scaling</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="fw-bold d-flex justify-content-end">On Going</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-6">
            <div className="box p-3">
              <p className="title">Top Book specialty</p>
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

      <div className="m-3">
        <div className="box ">
          <div className="border-bottom d-flex justify-content-between p-3">
            <p className="title">Total appointment</p>
            <select
              className="input-select input-select-w15"
              onChange={(e) => setMonthAppointment(e.target.value)}
            >
              {_renderMonths()}
            </select>
          </div>
          <div className="row m-3">
            <div className="col-8">
              <Line

                data={dataLineAppointment}
                options={optionsLine}
              />
            </div>

            <div className="col-4">
              <Doughnut
                data={dataDoughnutAppointment}
                options={optionsDoughnut}
                plugins={[doughnutLabel]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="m-3">
        <div className="box">
          <div className="p-3 border-bottom d-flex justify-content-between">
            <p className="title">Booked appointment</p>
            <select
              className="input-select input-select-w15"
              onChange={(e) => setMonthAppointmentBook(e.target.value)}
            >
              {_renderMonths()}
            </select>
          </div>

          <div className="row m-3">
            <div className="col-8">
              <Line
                data={dataLineAppointmentBook}
                options={optionsLine}
              />
            </div>

            <div className="col-4">
              <Doughnut
                data={dataDoughnutAppointmentBook}
                options={optionsDoughnut}
                plugins={[doughnutLabelBooked]}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppointmentDashboard;
