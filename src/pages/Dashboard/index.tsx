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

import Layout from "../../components/Layout";
import TotalView from "../../components/common/TotalView";
import { DAYS } from "../../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [dayOld, setDayOld] = useState<string>("");
  const [dayNew, setDayNew] = useState<string>("");
  const [yearPatient, setYearPatient] = useState<string>("");
  const [yearGender, setYearGender] = useState<string>("");

  const dataOldPatient = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of old patient",
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  };

  const dataNewPatient = {
    labels: ["Red", "Blue", "Yellow",],
    datasets: [
      {
        label: "# of new patient",
        data: [12, 19, 3],
        borderWidth: 1,
      },
    ],
  };

  const dataGender = {
    labels: ["Male", "Female", "Child"],
    datasets: [
      {
        label: "# of gender",
        data: [12, 19, 3],
        borderWidth: 1,
      },
    ],
  };

  const optionsLine = {
    maintainAspectRatio: false,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };
  const optionsDoughnut = {
    maintainAspectRatio: false,
    // scales: {
    //   y: {
    //     beginAtZero: true,
    //   },
    // },
    legend: {
      labels: {
        fontSize: 26,
      },
    },
  };

  const _renderDays = () => {
    return (
      <>
        <option hidden>Day</option>
        {DAYS.map((item: any) => (
          <option value={item.value} key={item.value}>
            {item.title}
          </option>
        ))}
      </>
    );
  };

  const _renderYears = () => {
    const years = Array.from(
      { length: new Date().getFullYear() - 2000 + 1 },
      (_, index) => 2000 + index
    );
    console.log("years:", years)

    return (
      <>
        <option hidden>Year</option>
        {years.map((year: any) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </>
    );
  };

  return (
    <Layout>
      <section className="dashboard">
        <TotalView />
        

        <div className="row">
          <div className="col-6">
            <div>
              <div>
                <p>old patients</p>
                <select
                  className="form-select"
                  onChange={(e) => setDayOld(e.target.value)}
                >
                  {_renderDays()}
                </select>
              </div>
              <Line
                height={100}
                width={300}
                data={dataOldPatient}
                // options={optionsLine}
              />
              <div>
                <p>
                  <span>All time</span>
                  <span></span>
                </p>
                <p>
                  <span>30 days</span>
                  <span></span>
                </p>
                <p>
                  <span>7 days</span>
                  <span></span>
                </p>
              </div>
            </div>
            <div>
              <div>
                <p>new patients</p>
                <select
                  className="form-select"
                  onChange={(e) => setDayNew(e.target.value)}
                >
                  {_renderDays()}
                </select>
              </div>
              <Line
                height={100}
                width={300}
                data={dataNewPatient}
                // options={optionsLine}
              />
              <div>
                <p>
                  <span>All time</span>
                  <span></span>
                </p>
                <p>
                  <span>30 days</span>
                  <span></span>
                </p>
                <p>
                  <span>7 days</span>
                  <span></span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div>
              <div>
                <p>Patients</p>
                <select
                  className="form-select"
                  onChange={(e) => setYearPatient(e.target.value)}
                >
                  {_renderYears()}
                </select>
              </div>

              <div>
                <div>
                  <p>
                    <i className="bi bi-person"></i>
                  </p>
                  <p>
                    <span>24.4K</span>
                    <span>New Patient</span>
                  </p>
                  <p>
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>15%</span>
                  </p>
                </div>
                <div>
                  <p>
                    <i className="bi bi-person"></i>
                  </p>
                  <p>
                    <span>24.4K</span>
                    <span>Old Patient</span>
                  </p>
                  <p>
                    <i className="bi bi-graph-up-arrow"></i>
                    <span>15%</span>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p>Gender</p>
                <select
                  className="form-select"
                  onChange={(e) => setYearGender(e.target.value)}
                >
                  {_renderYears()}
                </select>
              </div>
              <div>
                <Doughnut
                  height={300}
                  width={300}
                  data={dataGender}
                  options={optionsDoughnut}
                />
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
