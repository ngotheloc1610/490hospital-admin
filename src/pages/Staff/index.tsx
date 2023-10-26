import { memo, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import PaginationComponent from "../../components/common/Pagination";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import TotalView from "../../components/common/TotalView";
import PopUpConfirm from "./PopupConfirm";
import {
  DEFAULT_ITEM_PER_PAGE,
  GENDER,
  START_PAGE,
  STATUS,
} from "../../constants";
import { ICON_PENCIL, ICON_TRASH } from "../../assets";
import axios from "axios";
import { defineConfigGet } from "../../Common/utils";
import { API_ALL_GET_STAFF } from "../../constants/api.constant";

const Staff = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [showPopUpConfirm, setShowPopUpConfirm] = useState<boolean>(false);
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [departmentList, setDepartmentList] = useState([]);

  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_STAFF}`;

    axios
      .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
      .then((resp: any) => {
        if (resp) {
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }, [currentPage, itemPerPage]);

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const handleChangeName = (value: string) => {};

  const handleChangeGender = (value: string) => {};

  const handleChangStatus = (value: string) => {};

  const handleChangeDepartment = (value: any) => {};

  const handleCancel = (item: any) => {
    setShowPopUpConfirm(true);
  };

  const handleModify = (item: any) => {};

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

  const _renderSearch = () => {
    return (
      <div className="row">
        <div className="col-8 row">
          <div className="col-3">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => handleChangeName(e.target.value)}
              value={name}
              className="form-control"
            />
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => handleChangeGender(e.target.value)}
            >
              {_renderListGender()}
            </select>
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => handleChangeDepartment(e.target.value)}
            >
              {_renderListDepartment()}
            </select>
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => handleChangStatus(e.target.value)}
            >
              {_renderListStatus()}
            </select>
          </div>
        </div>
        <div className="col-4">
          <button className="button-apply">Apply</button>
        </div>
      </div>
    );
  };

  const _renderTableListStaff = () => {
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
          {listData.map((item: any, idx: number) => {
            const email = item.telecom.find(
              (i: any) => i?.system === "email"
            )?.value;

            return (
              <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                <th scope="row">{++idx}</th>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.nameFirstRep.text}
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
                <td onClick={() => navigate(`overview/${item.id}`)}>{email}</td>
                <td onClick={() => navigate(`overview/${item.id}`)}>{email}</td>
                <td onClick={() => navigate(`overview/${item.id}`)}>{email}</td>
                <td>
                  <span onClick={handleCancel}>
                    <ICON_TRASH />
                  </span>
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
          <TotalView />
          <div className="d-flex justify-content-end me-4">
            <button
              className="button button--small button--primary"
              onClick={() => navigate("/staff/overview/detail")}
            >
              <i className="bi bi-plus"></i> Add
            </button>
          </div>
          <section className="table-container">
            <div className="table-container-contain">
              <div className="d-flex justify-content-center align-item-center">
                <h6 className="mb-0 text-center fw-bold p-3">List of Staff</h6>
              </div>
              <div>
                <div className="container-search">{_renderSearch()}</div>
                <div>{_renderTableListStaff()}</div>
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

export default memo(Staff);
