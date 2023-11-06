import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";

import { DEFAULT_ITEM_PER_PAGE, GENDER, START_PAGE } from "../../constants";
import {
  API_ALL_GET_PATIENT,
  API_SEARCH_PATIENT,
} from "../../constants/api.constant";
import {
  defineConfigGet
} from "../../Common/utils";
import { ICON_PENCIL, ICON_TRASH } from "../../assets";

import PopUpConfirm from "./PopupConfirm";
import Layout from "../../components/Layout";
import TotalView from "../../components/common/TotalView";
import PaginationComponent from "../../components/common/Pagination";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPatient, setShowPopUpConfirm } from "../../redux/features/patient/patientSlice";

const Patient = () => {
  const [listData, setListData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [name, setName] = useState<string>("");
  const [gender, setGender] = useState<string>("");

  const { triggerDelete, showPopUpConfirm } = useAppSelector((state) => state.patientSlice)
  const dispatch = useAppDispatch();
  const outlet = useOutlet();
  const navigate = useNavigate();

  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getPatient();
  }, [currentPage, itemPerPage, triggerDelete]);

  const getPatient = () => {
    const url = `${url_api}${API_ALL_GET_PATIENT}`;

    axios
      .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
      .then((resp: any) => {
        if (resp) {
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  const handleSearch = () => {
    const url = `${url_api}${API_SEARCH_PATIENT}`;

    axios
      .get(url, defineConfigGet({ page: currentPage, size: itemPerPage, gender: gender, nameSearch: name }))
      .then((resp: any) => {
        if (resp) {
          setListData(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  const handleDelete = (patient: any) => {
    dispatch(setShowPopUpConfirm(true));
    dispatch(setPatient(patient));
  };

  const handleModify = (id: string) => {
    navigate(`/patient/information/detail/${id}`);
  };

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

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
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listData?.map((item: any, idx: number) => {
            const email = item.telecom?.find(
              (i: any) => i?.system === "email"
            )?.value;
            const phone = item.telecom?.find(
              (i: any) => i?.system === "phone"
            )?.value;

            return (
              <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                <th scope="row">{++idx}</th>
                <td onClick={() => navigate(`information/${item.id}`)}>
                  {item.nameFirstRep.nameAsSingleString}
                </td>
                <td onClick={() => navigate(`information/${item.id}`)}>{item.gender}</td>
                <td onClick={() => navigate(`information/${item.id}`)}>{item.birthDate}</td>
                <td onClick={() => navigate(`information/${item.id}`)}>
                  {phone}
                </td>
                <td onClick={() => navigate(`information/${item.id}`)}>{email}</td>
                <td>
                  <span className="cursor-pointer" onClick={() => handleDelete(item)}>
                    <ICON_TRASH />
                  </span>
                  <span className="ms-1 cursor-pointer">
                    <ICON_PENCIL onClick={() => handleModify(item.id)} />
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

  const _renderSearch = () => {
    return (
      <div className="row">
        <div className="col-6 row">
          <div className="col-6">
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
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
              onClick={() => navigate("/patient/information/detail/create")}
            >
              <i className="bi bi-plus"></i> Add
            </button>
          </div>
          <section className="table-container">
            <div className="table-container-contain">
              <div className="d-flex justify-content-center align-item-center">
                <h6 className="mb-0 text-center fw-bold p-3">
                  List of Patient
                </h6>
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
        </>
      )}

      {showPopUpConfirm && (
        <PopUpConfirm/>
      )}
    </Layout>
  );
};

export default memo(Patient);
