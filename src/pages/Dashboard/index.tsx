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
import { MONTHS } from "../../constants";
import { ICON_PATIENT } from "../../assets";

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
  const [monthPatient, setMonthPatient] = useState<string>("");
  const [monthGender, setMonthGender] = useState<string>("");

  const [monthNewPatient, setMonthNewPatient] = useState<string>("");
  const [monthOldPatient, setmonthOldPatient] = useState<string>("");

  const dataLinePatient = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'New Patient',
        borderColor: '#8DE27F',
        backgroundColor: '#8DE27F',
        data: [65, 59, 80, 81, 56],
      },
      {
        label: 'Old Patient',
        borderColor: '#F59898',
        backgroundColor: '#F59898',
        data: [28, 48, 40, 19, 86],
      },
    ],
  };

  const dataLineGender = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Male',
        borderColor: '#8DE27F',
        backgroundColor: '#8DE27F',
        data: [65, 59, 80],
      },
      {
        label: 'Female',
        borderColor: '#F59898',
        backgroundColor: '#F59898',
        data: [28, 48, 40],
      },
      {
        label: 'Other',
        borderColor: '#D04ED6',
        backgroundColor: '#D04ED6',
        data: [22, 67, 70],
      },
    ],
  };

  const dataDoughnutGender = {
    labels: [''],
    datasets: [
      {
        label: 'Male',
        borderColor: '#8DE27F',
        backgroundColor: '#8DE27F',
        data: [65, 59, 80],
      },
      {
        label: 'Female',
        borderColor: '#F59898',
        backgroundColor: '#F59898',
        data: [28, 48, 40],
      },
      {
        label: 'Other',
        borderColor: '#D04ED6',
        backgroundColor: '#D04ED6',
        data: [28, 48, 40],
      },
    ],
  };

  const dataDoughnutPatient = {
    labels: [''],
    datasets: [
      {
        label: 'New Patient',
        borderColor: '#8DE27F',
        backgroundColor: '#8DE27F',
        data: [65, 59, 80, 81, 56],
      },
      {
        label: 'Old Patient',
        borderColor: '#F59898',
        backgroundColor: '#F59898',
        data: [28, 48, 40, 19, 86],
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
    <Layout>
      <section className="dashboard">
        <TotalView />

        <div>
          <div className="row gy-3">
            <div className="col-6">
              <div>
                <ICON_PATIENT />
              </div>
              <div>
                <div>
                  <p>New Patients</p>
                  <select
                    className="form-select"
                    onChange={(e) => setMonthNewPatient(e.target.value)}
                  >
                    {_renderMonths()}
                  </select>
                </div>
                <div>
                  <p>41 234</p>
                  <p>15% Increase in  7 days</p>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div>
                <ICON_PATIENT />
              </div>
              <div>
                <div>
                  <p>Old Patients</p>
                  <select
                    className="form-select"
                    onChange={(e) => setmonthOldPatient(e.target.value)}
                  >
                    {_renderMonths()}
                  </select>
                </div>
                <div>
                  <p>35 234</p>
                  <p>15% Increase in  7 days</p>
                  <div className="progress">
                    <div className="progress-bar" role="progressbar" style={{ width: "75%" }} aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-6">
              <div>
                <div>
                  <p>Line Charts : Number of patients</p>
                  <select
                    className="form-select"
                    onChange={(e) => setMonthPatient(e.target.value)}
                  >
                    {_renderMonths()}
                  </select>
                </div>
                <Line
                  height={100}
                  width={300}
                  data={dataLinePatient}
                  options={optionsLine}
                />
                <div>
                  <p>
                    <span>New Patient</span>
                    <span></span>
                  </p>
                  <p>
                    <span>Old Patient</span>
                    <span></span>
                  </p>

                </div>
              </div>
            </div>

            <div className="col-6">
              <div>
                <div>
                  <p>Line Charts : Gender patient</p>
                  <select
                    className="form-select"
                    onChange={(e) => setMonthGender(e.target.value)}
                  >
                    {_renderMonths()}
                  </select>
                </div>
                <Line
                  height={100}
                  width={300}
                  data={dataLineGender}
                  options={optionsLine}
                />
                <div>
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
                </div>
              </div>
            </div>

            <div className="col-6">
              <div>
                <div>
                  <p>Number of patients</p>
                </div>

                <div>
                  <Doughnut
                    height={300}
                    width={300}
                    data={dataDoughnutPatient}
                    options={optionsDoughnut}
                  />
                </div>
              </div>
            </div>

            <div className="col-6">
              <div>
                <div>
                  <p>Gender patient</p>
                </div>
                <div>
                  <Doughnut
                    height={300}
                    width={300}
                    data={dataDoughnutGender}
                    options={optionsDoughnut}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-6">
              <p>Top patient book appointment</p>
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
                    <td >Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-6">
              <p>Top patient cancel appointment</p>
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
                    <td >Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </section>
    </Layout>
  );
};

export default Dashboard;
