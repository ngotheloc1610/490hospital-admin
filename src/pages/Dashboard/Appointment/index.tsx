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
  Tooltip,
} from "chart.js";

import { MONTHS } from "../../../constants";
import { USER } from "../../../assets";
import TotalView from "../../../components/common/TotalView";
import { API_DASHBOARD_APPOINTMENT_BOOKED, API_DASHBOARD_APPOINTMENT_TODAY, API_DASHBOARD_APPOINTMENT_TOTAL } from "../../../constants/api.constant";
import axios from "axios";
import { defineConfigGet, defineConfigPost } from "../../../Common/utils";
import moment from "moment";
import { FORMAT_DATE, FORMAT_TIME } from "../../../constants/general.constant";
import { endOfMonth, startOfMonth, format } from "date-fns";

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
  const url_api = process.env.REACT_APP_API_URL;

  const currentDate = new Date();

  const [monthAppointment, setMonthAppointment] = useState<string>((currentDate.getMonth() - 1).toString());
  const [monthAppointmentBook, setMonthAppointmentBook] = useState<string>((currentDate.getMonth() - 1).toString());

  const [appointmentToday, setAppointmentToday] = useState<any>([])
  const [appointmentTotal, setAppointmentTotal] = useState<any>(null)
  const [appointmentBooked, setAppointmentBooked] = useState<any>(null)

  const [dateOfMonthAppointmentTotal, setDateOfMonthAppointmentTotal] = useState<any>(new Date());
  const [dateOfMonthAppointmentBooked, setDateOfMonthAppointmentBooked] = useState<any>(new Date());
  useEffect(() => {
    getAppointmentToday()
    getAppointmentTotal()
    getAppointmentBooked()

  }, [])

  useEffect(() => {
    getAppointmentTotal()
  }, [dateOfMonthAppointmentTotal])

  useEffect(() => {
    const newDate = new Date(dateOfMonthAppointmentTotal);
    const month = parseInt(monthAppointment, 10);

    if (!isNaN(month)) {
      newDate.setMonth(month);
      setDateOfMonthAppointmentTotal(newDate);
    }
  }, [monthAppointment])

  useEffect(() => {
    getAppointmentBooked()
  }, [dateOfMonthAppointmentBooked])

  useEffect(() => {
    const newDate = new Date(dateOfMonthAppointmentBooked);
    const month = parseInt(monthAppointmentBook, 10);

    if (!isNaN(month)) {
      newDate.setMonth(month);
      setDateOfMonthAppointmentBooked(newDate);
    }
  }, [monthAppointmentBook])

  const getAppointmentToday = () => {
    const url = `${url_api}${API_DASHBOARD_APPOINTMENT_TODAY}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setAppointmentToday(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get appointment today:", err);
      });
  }

  const getAppointmentTotal = () => {
    const url = `${url_api}${API_DASHBOARD_APPOINTMENT_TOTAL}`;

    const startDate = startOfMonth(dateOfMonthAppointmentTotal);
    const endDate = endOfMonth(dateOfMonthAppointmentTotal);

    const params = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    }

    axios
      .get(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          const booked = Object.entries(resp.data.BOOKED).map(([date, number]) => ({ date, number }));
          const sortedBooked = booked.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const pending = Object.entries(resp.data.PENDING).map(([date, number]) => ({ date, number }));
          const sortedPending = pending.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const proposed = Object.entries(resp.data.PROPOSED).map(([date, number]) => ({ date, number }));
          const sortedProposed = proposed.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const totalBooked = Object.entries(resp.data.TOTAL_APPOINTMENT_BOOKED).map(([date, number]) => ({ date, number }));
          const sortedTotalBooked = totalBooked.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const totalPending = Object.entries(resp.data.TOTAL_APPOINTMENT_PENDING).map(([date, number]) => ({ date, number }));
          const sortedTotalPending = totalPending.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const totalProposed = Object.entries(resp.data.TOTAL_APPOINTMENT_PROPOSED).map(([date, number]) => ({ date, number }));
          const sortedTotalProposed = totalProposed.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const total = Object.entries(resp.data.TOTAL_APPOINTMENT).map(([date, number]) => ({ date, number }));
          const sortedTotal = total.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });
          setAppointmentTotal({ booked: sortedBooked, pending: sortedPending, proposed: sortedProposed, totalBooked: sortedTotalBooked, totalPending: sortedTotalPending, totalProposed: sortedTotalProposed, total: sortedTotal })
        }
      })
      .catch((err: any) => {
        console.log("error get appointment total:", err);
      });
  }

  const getAppointmentBooked = () => {
    const url = `${url_api}${API_DASHBOARD_APPOINTMENT_BOOKED}`;

    const startDate = startOfMonth(dateOfMonthAppointmentBooked);
    const endDate = endOfMonth(dateOfMonthAppointmentBooked);

    const params = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd")
    }

    axios
      .get(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          const cancel = Object.entries(resp.data.CANCEL).map(([date, number]) => ({ date, number }));
          const sortedCancel = cancel.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const fulfilled = Object.entries(resp.data.FULFILED).map(([date, number]) => ({ date, number }));
          const sortedFulfilled = fulfilled.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const noShow = Object.entries(resp.data.NO_SHOW).map(([date, number]) => ({ date, number }));
          const sortedNoShow = noShow.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const totalCancel = Object.entries(resp.data.TOTAL_APPOINTMENT_CANCEL).map(([date, number]) => ({ date, number }));
          const sortedTotalCancel = totalCancel.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const totalFulfilled = Object.entries(resp.data.TOTAL_APPOINTMENT_FULFILLED).map(([date, number]) => ({ date, number }));
          const sortedTotalFulfilled = totalFulfilled.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const totalNoShow = Object.entries(resp.data.TOTAL_APPOINTMENT_NO_SHOW).map(([date, number]) => ({ date, number }));
          const sortedTotalNoShow = totalNoShow.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          const total = Object.entries(resp.data.TOTAL_APPOINTMENT).map(([date, number]) => ({ date, number }));
          const sortedTotal = total.sort((a: any, b: any) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateA - dateB;
          });

          setAppointmentBooked({ fulfilled: sortedFulfilled, noShow: sortedNoShow, canceled: sortedCancel, totalFulfilled: sortedTotalFulfilled, totalNoShow: sortedTotalNoShow, totalCanceled: sortedTotalCancel, total: sortedTotal })
        }
      })
      .catch((err: any) => {
        console.log("error get appointment total:", err);
      });
  }

  const dataChartAppointmentTotal = {
    labels: appointmentTotal?.booked?.map((appointment: any) => moment(appointment.date).format(FORMAT_DATE)),
    datasets: [
      {
        label: "Booked",
        borderColor: "#8DE27F ",
        backgroundColor: "#8DE27F ",
        data: appointmentTotal?.booked?.map((appointment: any) => appointment.number),
      },
      {
        label: "Pending",
        borderColor: "#F59898",
        backgroundColor: "#F59898",
        data: appointmentTotal?.pending?.map((appointment: any) => appointment.number),
      },
      {
        label: "Proposed",
        borderColor: "#59C3CF",
        backgroundColor: "#59C3CF",
        data: appointmentTotal?.proposed?.map((appointment: any) => appointment.number),
      },
    ],
  };

  const dataChartAppointmentBooked = {
    labels: appointmentBooked?.fulfilled?.map((appointment: any) => moment(appointment.date).format(FORMAT_DATE)),
    datasets: [
      {
        label: "Fulfilled",
        borderColor: "#8DE27F ",
        backgroundColor: "#8DE27F ",
        data: appointmentBooked?.fulfilled?.map((appointment: any) => appointment.number),
      },
      {
        label: "No Show",
        borderColor: "#F59898",
        backgroundColor: "#F59898",
        data: appointmentBooked?.noShow?.map((appointment: any) => appointment.number),
      },
      {
        label: "Canceled",
        borderColor: "#59C3CF",
        backgroundColor: "#59C3CF",
        data: appointmentBooked?.canceled?.map((appointment: any) => appointment.number),
      },
    ],
  };

  const optionsLine:any = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
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

  const optionsDoughnut:any = {
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
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

  const doughnutLabel = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart: any, args: any, plugins: any) {
      const { ctx, data } = chart;

      const centerX = chart.getDatasetMeta(0).data[0]?.x;
      const centerY = chart.getDatasetMeta(0).data[0]?.y;

      const totals = data.datasets.reduce((acc: number, dataset: any) => {
        return acc + dataset.data.reduce((sum: number, value: number) => sum + value, 0);
      }, 0);

      ctx.save();
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#9083D5";
      ctx.textAlign = "center";
      ctx.textBaseLine = "middle";
      ctx.fillText(totals, centerX, centerY)
      ctx.fillText("Total", centerX, 245)
    }
  }

  const doughnutLabelBooked = {
    id: "doughnutLabel",
    afterDatasetsDraw(chart: any, args: any, plugins: any) {
      const { ctx, data } = chart;

      const centerX = chart.getDatasetMeta(0).data[0]?.x;
      const centerY = chart.getDatasetMeta(0).data[0]?.y;

      const totals = data.datasets.reduce((acc: number, dataset: any) => {
        return acc + dataset.data.reduce((sum: number, value: number) => sum + value, 0);
      }, 0);


      ctx.save();
      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "#9083D5";
      ctx.textAlign = "center";
      ctx.textBaseLine = "middle";
      ctx.fillText(totals, centerX, centerY)
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
                  {appointmentToday && appointmentToday.length > 0 ? appointmentToday.map((item: any) => {
                    return (<tr>
                      <td>
                        <div className="d-flex">
                          <img src={USER} alt="" className="image-appointment my-auto" />
                          <div className="ms-3">
                            <p className="fw-bold">{item?.username}</p>
                            <span>{item?.name}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="fw-bold d-flex justify-content-end">{item.dateStart ? moment(item.dateStart).format(FORMAT_TIME) : ""}</span>
                      </td>
                    </tr>
                    )
                  }) : <span>Không có dữ liệu!</span>}

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
              value={monthAppointment}
            >
              {_renderMonths()}
            </select>
          </div>
          <div className="row m-3">
            <div className="col-8">
              <Line
                data={dataChartAppointmentTotal}
                options={optionsLine}
              />
            </div>

            <div className="col-4">
              <Doughnut
                data={dataChartAppointmentTotal}
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
              value={monthAppointmentBook}
            >
              {_renderMonths()}
            </select>
          </div>

          <div className="row m-3">
            <div className="col-8">
              <Line
                data={dataChartAppointmentBooked}
                options={optionsLine}
              />
            </div>

            <div className="col-4">
              <Doughnut
                data={dataChartAppointmentBooked}
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
