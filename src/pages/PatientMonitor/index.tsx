import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import axios from "axios";

import Layout from "../../components/Layout";
import PaginationComponent from "../../components/common/Pagination";
import {
  DEFAULT_ITEM_PER_PAGE,
  START_PAGE,
} from "../../constants";
import { ICON_PENCIL } from "../../assets";
import { API_MONITOR_ALL, API_MONITOR_SEARCH } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost, styleBMI, styleBloodGlucose, styleBloodPressure, styleHeartRate, styleTemperature } from "../../Common/utils";
import moment from "moment";
import { FORMAT_DATE } from "../../constants/general.constant";
import { setAppointment } from "../../redux/features/appointment/appointmentSlice";
import { useAppDispatch } from "../../redux/hooks";

const PatientMonitor = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [listData, setListData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const url_api = process.env.REACT_APP_API_URL;
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (isSearch) {
      searchPatient()
    } else {
      getPatientMonitor()
    }
  }, [currentPage, itemPerPage])

  const searchPatient = () => {
    const url = `${url_api}${API_MONITOR_SEARCH}`;

    const params = { page: currentPage, size: itemPerPage, nameP: name }

    axios
      .get(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const getPatientMonitor = () => {
    const url = `${url_api}${API_MONITOR_ALL}`;

    setIsLoading(true)
    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        setIsLoading(false)
        if (resp) {
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err: any) => {
        setIsLoading(false)
        console.log("error get patient monitors:", err);
      });
  }

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const handleSearch = () => {
    setIsSearch(true);
    setCurrentPage(0);
    searchPatient();
  }

  const _renderSearch = () => {
    return (
      <div className="row">
        <div className="col-6">
          <input
            type="text"
            placeholder="Search by name"
            className="form-control"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        </div>
        <div className="col-6">
          <button className="button-apply" onClick={() => handleSearch()}>Search</button>
        </div>

      </div>
    );
  };

  const _renderTablePatientMonitor = () => {
    return (
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">Patient</th>
            <th scope="col">DOB</th>
            <th scope="col">Contact Info</th>
            <th scope="col">Diagnosis</th>
            <th scope="col">Blood Pressure</th>
            <th scope="col">Blood Glucose</th>
            <th scope="col">Heart Rates</th>
            <th scope="col">BMI</th>
            <th scope="col">Temperature</th>
          </tr>
        </thead>
        {!isLoading ? <tbody>
          {listData && listData.length > 0 && listData.map((item: any, idx: number) => {
            const indexBloodPressure = item?.observationMonitors?.filter((item: any) => item?.observationName === "Blood Pressure")[0];
            const indexBloodGlucose = item?.observationMonitors?.filter((item: any) => item?.observationName === "Blood Glucose")[0];
            const indexHeartRate = item?.observationMonitors?.filter((item: any) => item?.observationName === "Heart Rate")[0];
            const indexBMI = item?.observationMonitors?.filter((item: any) => item?.observationName === "BMI")[0];
            const indexTemperature = item?.observationMonitors?.filter((item: any) => item?.observationName === "Temperature")[0];

            return (
              <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>{item?.patientName}</td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>{item.dob ? moment(item.dob).format(FORMAT_DATE) : ""}</td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>
                  <p>{item?.email}</p>
                  <p>{item?.phone}</p>
                </td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>
                  <p>{item?.diagnosis}</p>
                  <p>{item?.doctorName}</p>
                </td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>
                  <span className={styleBloodPressure(indexBloodPressure)}>{indexBloodPressure?.value || "-"}</span>
                  <span className={styleBloodPressure(indexBloodPressure)}> mmHg</span>
                </td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>
                  <span className={styleBloodGlucose(indexBloodGlucose)}>{indexBloodGlucose?.value || "-"}</span>
                  <span className={styleBloodGlucose(indexBloodGlucose)}> mmol/L</span>
                </td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>
                  <span className={styleHeartRate(indexHeartRate)}>{indexHeartRate?.value || "-"}</span>
                  <span className={styleHeartRate(indexHeartRate)}> bpm</span>
                </td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>
                  <span className={styleBMI(indexBMI)}>{indexBMI?.value || "-"}</span>
                  <span className={styleBMI(indexBMI)}> kg/m2</span>
                </td>
                <td onClick={() => { navigate(`/monitor/${item.idEncounter}`); dispatch(setAppointment(item)) }}>
                  <span className={styleTemperature(indexTemperature)}>{indexTemperature?.value || "-"}</span>
                  <span className={styleTemperature(indexTemperature)}> &deg;C</span>
                </td>
              </tr>
            );
          })}
        </tbody> : <div className="d-flex justify-content-center"><div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div></div>}

      </table>
    );
  };

  return (
    <Layout>
      {outlet ? (
        <Outlet />
      ) : (
        <>
          <section className="table-container ">
            <div className="d-flex justify-content-end align-items-end mt-3">
              <div className="d-flex">
                <div className="me-3">
                  <span className="note note-normal me-1">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>Normal</span>
                </div>
                <div className="me-3">
                  <span className="note note-moderately me-1">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>Moderately Low</span>
                </div>
                <div className="me-5">
                  <span className="note note-high me-1">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                  <span>Significantly High</span>
                </div>
              </div>
            </div>
            <div className="table-container-contain">
              <div className="d-flex justify-content-center align-item-center">
                <h6 className="mb-0 text-center fw-bold p-3">
                  List of Patient Monitor
                </h6>
              </div>
              <div>
                <div className="container-search">{_renderSearch()}</div>
                <div>{_renderTablePatientMonitor()}</div>
                <PaginationComponent
                  totalItem={totalItem}
                  itemPerPage={itemPerPage}
                  currentPage={currentPage === 0 ? 1 : currentPage + 1}
                  getItemPerPage={getItemPerPage}
                  getCurrentPage={getCurrentPage}
                />
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
};

export default PatientMonitor;
