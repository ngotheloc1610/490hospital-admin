import { memo, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import TotalView from "../../components/common/TotalView";
import axios from "axios";

import {
  DEFAULT_ITEM_PER_PAGE,
  GENDER,
  START_PAGE,
  STATUS,
} from "../../constants";
import PaginationComponent from "../../components/common/Pagination";
import { API_ALL_GET_DOCTOR, API_SEARCH_DOCTOR } from "../../constants/api.constant";
import { defineConfigGet } from "../../Common/utils";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import { ICON_PENCIL, ICON_TRASH } from "../../assets";
import PopUpConfirm from "./PopupConfirm";

const Doctor = () => {
  const [showPopUpConfirm, setShowPopUpConfirm] = useState<boolean>(false);
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [departmentList, setDepartmentList] = useState([]);

  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const url_api = process.env.REACT_APP_API_URL;

  const outlet = useOutlet();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_DOCTOR}`;

    axios
      .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }, [currentPage, itemPerPage]);

  const handleCancel = (item: any) => {
    setShowPopUpConfirm(true);
  };

  const handleModify = (item: any) => { };

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const handleSearch = () => {
    const url = `${url_api}${API_SEARCH_DOCTOR}${name}`;

    axios
      .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
      .then((resp: any) => {
        if (resp) {
          console.log("resp search:", resp)
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const _renderTableListPatient = () => {
    return (
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Phone number</th>
            <th scope="col">Email</th>
            <th scope="col">Department</th>
            <th scope="col">Status</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listData?.map((item: any, idx: number) => {

            return (
              <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                <th scope="row">{++idx}</th>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.nameFirstRep.nameAsSingleString}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.gender}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.birthDate}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.telecomFirstRep.value}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>empty</td>
                <td onClick={() => navigate(`overview/${item.id}`)}>empty</td>
                <td onClick={() => navigate(`overview/${item.id}`)}>empty</td>
                <td>
                  <span className="cursor-pointer" onClick={handleCancel}>
                    <ICON_TRASH />
                  </span>
                  <span className="ms-1 cursor-pointer">
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

  const _renderListStatus = () => {
    return (
      <>
        <option hidden>Status</option>
        {STATUS.map((item: any) => (
          <option value={item.code} key={item.code}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  const _renderListDepartment = () => {
    return (
      <>
        <option hidden>Department</option>
        {departmentList.length > 0 ? (
          departmentList.map((item: any) => (
            <option value={item.code} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderSearch = () => {
    return (
      <div className="row">
        <div className="col-8 row">
          <div className="col-3">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
            />
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => setGender(e.target.value)}
            >
              {_renderListGender()}
            </select>
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => setDepartment(e.target.value)}
            >
              {_renderListDepartment()}
            </select>
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => setStatus(e.target.value)}
            >
              {_renderListStatus()}
            </select>
          </div>
        </div>
        <div className="col-4">
          <button className="button-apply" onClick={() => handleSearch()}>Apply</button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {outlet ? (
        <Outlet />
      ) : (
        <>
          <TotalView />
          <div className="d-flex justify-content-end me-4">
            <button
              className="button button--small button--primary"
              onClick={() => navigate("/doctor/overview/detail")}
            >
              <i className="bi bi-plus"></i> Add
            </button>
          </div>
          <section className="table-container">
            <div className="table-container-contain">
              <div className="d-flex justify-content-center align-item-center">
                <h6 className="mb-0 text-center fw-bold p-3">List of Doctor</h6>
              </div>
              <div>
                <div className="container-search">{_renderSearch()}</div>
                <div>{_renderTableListPatient()}</div>
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
          {showPopUpConfirm && (
            <PopUpConfirm handleCloseConfirmPopup={setShowPopUpConfirm} />
          )}
        </>
      )}
    </Layout>
  );
};

export default memo(Doctor);
