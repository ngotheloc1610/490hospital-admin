import { memo, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import TotalView from "../../components/common/TotalView";
import PaginationComponent from "../../components/common/Pagination";
import PopUpConfirm from "./PopupConfirm";
import { ICON_PENCIL, ICON_TRASH } from "../../assets";
import { DEFAULT_ITEM_PER_PAGE, START_PAGE } from "../../constants";
import { API_ALL_GET_DEPARTMENT } from "../../constants/api.constant";
import axios from "axios";
import { defineConfigGet } from "../../Common/utils";

const Department = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [listData, setListData] = useState([]);

  const [name, setName] = useState("");
  const [showPopUpConfirm, setShowPopUpConfirm] = useState<boolean>(false);

  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const url = `${url_api}${API_ALL_GET_DEPARTMENT}`;

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

  const handleCancel = (item: any) => {
    setShowPopUpConfirm(true);
  };

  const handleModify = (item: any) => {};

  const _renderSearch = () => {
    return (
      <div className="row">
        <div className="col-8 row">
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="form-control"
          />
        </div>
        <div className="col-4">
          <button className="button-apply">Apply</button>
        </div>
      </div>
    );
  };

  const _renderTableListDepartment = () => {
    return (
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Department Name</th>
            <th scope="col">Head of Dept</th>
            <th scope="col">Member</th>
            <th scope="col">Specialist</th>
            <th scope="col">Contact</th>
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
              onClick={() => navigate("/department/overview/detail")}
            >
              <i className="bi bi-plus"></i> Add
            </button>
          </div>
          <section className="table-container">
            <div className="table-container-contain">
              <div className="d-flex justify-content-center align-item-center">
                <h6 className="mb-0 text-center fw-bold p-3">
                  List of Department
                </h6>
              </div>
              <div>
                <div className="container-search">{_renderSearch()}</div>
                <div>{_renderTableListDepartment()}</div>
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

export default memo(Department);
