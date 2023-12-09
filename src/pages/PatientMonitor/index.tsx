import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import axios from "axios";

import Layout from "../../components/Layout";
import PaginationComponent from "../../components/common/Pagination";
import {
  ALERT_STATUS,
  DEFAULT_ITEM_PER_PAGE,
  GENDER,
  START_PAGE,
} from "../../constants";
import { ICON_PENCIL } from "../../assets";
import { API_MONITOR_ALL, API_SEARCH_DOCTOR } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import moment from "moment";
import { FORMAT_DATE } from "../../constants/general.constant";

const PatientMonitor = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [listData, setListData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false)

  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (isSearch) {
      searchPatient()
    } else {
      getPatientMonitor()
    }
  }, [currentPage, itemPerPage])

  const searchPatient = () => {
    const url = `${url_api}${API_SEARCH_DOCTOR}`;

    const params = { page: currentPage, size: itemPerPage, nameP: name, genderP: gender }

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

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err: any) => {
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

  const _renderListGender = () => {
    return (
      <>
        <option hidden>Gender</option>
        {GENDER.map((item: any) => (
          <option value={item.code} key={item.code}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  const _renderSearch = () => {
    return (
      <div className="row">
        <div className="col-6 row">
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
            <select
              className="form-select"
              onChange={(e) => setGender(e.target.value)}
            >
              {_renderListGender()}
            </select>
          </div>
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
          </tr>
        </thead>
        <tbody>
          {listData && listData.length > 0 && listData.map((item: any, idx: number) => {
            return (
              <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                <td onClick={() => navigate(`/monitor/${item.idEncounter}`)}>{item?.patientName}</td>
                <td onClick={() => navigate(`/monitor/${item.idEncounter}`)}>{item.dob ? moment(item.dob).format(FORMAT_DATE) : ""}</td>
                <td onClick={() => navigate(`/monitor/${item.idEncounter}`)}>
                  <p>{item?.email}</p>
                  <p>{item?.phone}</p>
                </td>
                <td onClick={() => navigate(`/monitor/${item.idEncounter}`)}>{item?.diagnosis}</td>
                <td onClick={() => navigate(`/monitor/${item.idEncounter}`)}></td>
                <td onClick={() => navigate(`/monitor/${item.idEncounter}`)}></td>
                <td onClick={() => navigate(`/monitor/${item.idEncounter}`)}></td>
                <td>
                  <span className="ms-1">
                    <ICON_PENCIL />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
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
