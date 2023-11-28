import { useState } from "react";
import { ICON_BLOOD_GLUCOSE, ICON_BMI, ICON_HEART, ICON_TEMPERATURE, ICON_WATER, USER } from "../../assets";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PatientMonitorDetail = () => {
  const [isHeartRate, setIsHeartRate] = useState<boolean>(true)
  const [isBloodPressure, setIsBloodPressure] = useState<boolean>(false)
  const [isBloodGlucose, setIsBloodGlucose] = useState<boolean>(false)
  const [isTemperature, setIsTemperature] = useState<boolean>(false)
  const [isBMI, setIsBMI] = useState<boolean>(false)

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const data = {
    labels,
    datasets: [
      // {
      //   label: 'Dataset 1',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   backgroundColor: 'rgb(255, 99, 132)',
      // },
      // {
      //   label: 'Dataset 2',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   backgroundColor: 'rgb(75, 192, 192)',
      // },
      // {
      //   label: 'Dataset 3',
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      //   backgroundColor: 'rgb(53, 162, 235)',
      // },
    ],
  };

  const handleClickHeartRate = () => {
    setIsHeartRate(true);
    setIsBloodPressure(false);
    setIsBloodGlucose(false);
    setIsTemperature(false);
    setIsBMI(false);
  }

  const handleClickBloodPressure = () => {
    setIsHeartRate(false);
    setIsBloodPressure(true);
    setIsBloodGlucose(false);
    setIsTemperature(false);
    setIsBMI(false);
  }

  const handleClickBloodGlucose = () => {
    setIsHeartRate(false);
    setIsBloodPressure(false);
    setIsBloodGlucose(true);
    setIsTemperature(false);
    setIsBMI(false);
  }

  const handleClickTemperature = () => {
    setIsHeartRate(false);
    setIsBloodPressure(false);
    setIsBloodGlucose(false);
    setIsTemperature(true);
    setIsBMI(false);
  }

  const handleClickBMI = () => {
    setIsHeartRate(false);
    setIsBloodPressure(false);
    setIsBloodGlucose(false);
    setIsTemperature(false);
    setIsBMI(true);
  }

  const _renderHeartRate = () => {
    return (
      <div className="box">
        <div className="p-3">
          <div>
            <span className="fw-bold">Heart rate</span>
          </div>

          <div>
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    )
  }

  const _renderBloodPressure = () => {
    return (
      <div className="row">
        <div className="col-9 box">
          <div className="p-3">
            <div>
              <span className="fw-bold">Blood pressure</span>
            </div>

            <div>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="col-3 box">
          <div >
            <div className="p-3 d-flex justify-content-between">
              <span className="fw-bold my-auto">History</span>
              <button className="button button--primary button--small">SORT</button>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const _renderBloodGlocose = () => {
    return (
      <div className="row">
        <div className="col-9 box">
          <div className="p-3">
            <div>
              <span className="fw-bold">Blood glucose</span>
            </div>

            <div>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="col-3 box">
          <div>
            <div className="p-3 d-flex justify-content-between">
              <span className="fw-bold my-auto">History</span>
              <button className="button button--primary button--small">SORT</button>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const _renderTemperature = () => {
    return (
      <div className="row">
        <div className="col-9 box">
          <div className="p-3">
            <div>
              <span className="fw-bold">Temperature</span>
            </div>

            <div>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="col-3 box">
          <div >
            <div className="p-3 d-flex justify-content-between">
              <span className="fw-bold my-auto">History</span>
              <button className="button button--primary button--small">SORT</button>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const _renderBMI = () => {
    return (
      <div className="row ">
        <div className="col-9 box">
          <div className="p-3">
            <div>
              <span className="fw-bold">BMI</span>
            </div>

            <div>
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="col-3 box">
          <div >
            <div className="p-3 d-flex justify-content-between">
              <span className="fw-bold my-auto">History</span>
              <button className="button button--primary button--small">SORT</button>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">
                      <span>W{"(kg)"} -</span>
                      <span>H{"(cm)"} </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="container patient-monitor">
      <div className="row g-3">
        <div className="col-9 ">
          <div className="box d-flex p-3">
            <div className="w-40 me-3">
              <p className="d-flex justify-content-between">
                <span className="fw-bold">Patient Profile</span>
                <span>
                  <i className="bi bi-pencil-fill"></i>
                </span>
              </p>
              <p className="text-center">
                <img src={USER} alt="img patient" style={{ height: "60px", width: "60px" }} />
              </p>
              <p className="text-center">
                <span className="fw-bold">name</span> <span>Status</span>
              </p>
              <p className="text-center">
                Age: <span>23</span>
              </p>
            </div>
            <div className="row">
              <div className="col-3">
                <p>Gender:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Phone number:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Personal ID No:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>D.O.B: </p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Email:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Address:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Created Date: </p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Enrolled Date:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Clinic:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Registration Status:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>Patient Source:</p>
                <span></span>
              </div>
              <div className="col-3">
                <p>External Organization:</p>
                <span></span>
              </div>
            </div>
          </div>

        </div>

        <div className="col-3">
          <div className="box h-100 p-3">
            <p className="fw-bold">Upcoming Appointment</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

        <div className="col-9">
          <div className="box p-3">
            <div>
              <h2 className="fw-bold">Vital Signs</h2>
            </div>
            <div>
              <div className="d-flex mb-3">
                <div className="box box-item p-3 text-center" onClick={handleClickHeartRate}>
                  <h6 className="fw-bold">Heart rate</h6>
                  <p><i className="bi bi-heart-pulse-fill fs-1" style={{ color: "#FF0000" }}></i></p>
                  <p className="fw-bold mb-1">N/A</p>
                  <p className="mb-1">BPM</p>
                  <p className="mb-0">N/A</p>
                </div>
                <div className="box box-item p-3 text-center" onClick={handleClickBloodPressure}>
                  <h6 className="fw-bold">Blood pressure</h6>
                  <p><i className="bi bi-droplet-fill fs-1" style={{ color: "#FF0000" }}></i></p>
                  <p className="fw-bold mb-1">N/A</p>
                  <p className="mb-1">mmHg</p>
                  <p className="mb-0">N/A</p>
                </div>
                <div className="box box-item p-3 text-center" onClick={handleClickBloodGlucose}>
                  <h6 className="fw-bold">Blood glucose</h6>
                  <p><i className="bi bi-capsule fs-1" style={{ color: "#FF0000" }}></i></p>
                  <p className="fw-bold mb-1">N/A</p>
                  <p className="mb-1">mmol/L</p>
                  <p className="mb-0">N/A</p>
                </div>
                <div className="box box-item p-3 text-center" onClick={handleClickTemperature}>
                  <h6 className="fw-bold">Temperature</h6>
                  <p><i className="bi bi-thermometer-high fs-1"></i></p>
                  <p className="fw-bold mb-1">N/A</p>
                  <p className="mb-1">&deg;C</p>
                  <p className="mb-0">N/A</p>
                </div>
                <div className="box box-item p-3 text-center" onClick={handleClickBMI}>
                  <h6 className="fw-bold">BMI</h6>
                  <p><i className="bi bi-person-fill fs-1"></i></p>
                  <p className="fw-bold mb-1">N/A</p>
                  <p className="mb-1">N/A</p>
                  <p className="mb-0">N/A</p>
                </div>
              </div>

              {isHeartRate && _renderHeartRate()}
              {isBloodPressure && _renderBloodPressure()}
              {isBloodGlucose && _renderBloodGlocose()}
              {isTemperature && _renderTemperature()}
              {isBMI && _renderBMI()}

              <div className="box p-3 mt-3">
                <p className="fw-bold">Reported conditions (Problem list and Previous Encounter)</p>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Condition Name</th>
                      <th scope="col">Body site</th>
                      <th scope="col">Severity</th>
                      <th scope="col">Clinical Status</th>
                      <th scope="col">Onset</th>
                      <th scope="col">Recorded date</th>
                      <th scope="col">Note</th>
                      <th scope="col">Encounter</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>

                      </td>
                    </tr>
                    <tr>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                      <td>

                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>

        <div className="col-3">
          <div className="box h-100 p-3">
            <p className="fw-bold">Encounter History</p>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                  <th scope="col">Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientMonitorDetail;
