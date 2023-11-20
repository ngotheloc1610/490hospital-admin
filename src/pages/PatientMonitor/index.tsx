import { useEffect, useState } from "react";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import axios from "axios";

import Layout from "../../components/Layout";
import TotalView from "../../components/common/TotalView";
import PaginationComponent from "../../components/common/Pagination";
import { DEFAULT_ITEM_PER_PAGE, START_PAGE } from "../../constants";
import { ICON_PENCIL } from "../../assets";

const PatientMonitor = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();

  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const url_api = process.env.REACT_APP_API_URL;

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const _renderSearch = () => {
    return (
      <div className="row">
        <div className="col-8 row">
          <input
            type="text"
            placeholder="Name"
            className="form-control"
          />
        </div>
        <div className="col-4">
          <button className="button-apply">Apply</button>
        </div>
      </div>
    );
  };

  const _renderTablePatientMonitor = () => {
    return (
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Diagnosed by</th>
            <th scope="col">Date & Time</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listData.map((item: any, idx: number) => {
            return (
              <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                <th scope="row">{++idx}</th>
                <td>

                </td>
                <td>

                </td>
                <td>

                </td>
                <td>
                    
                </td>
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
          <section className="table-container">
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

export default PatientMonitor
