import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate, useOutlet } from "react-router-dom";
import { ICON_BLOCK, ICON_PENCIL } from "../../assets";

import {
  DEFAULT_ITEM_PER_PAGE,
  GENDER,
  START_PAGE,
  STATUS,
} from "../../constants";
import PaginationComponent from "../../components/common/Pagination";
import { API_ALL_GET_DOCTOR, API_ALL_GET_SPECIALTY, API_SEARCH_DOCTOR } from "../../constants/api.constant";
import { defineConfigGet, styleStatusPractitioner } from "../../Common/utils";

import Layout from "../../components/Layout";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPractitioner, setShowPopUpConfirmBlock } from "../../redux/features/practitioner/practitionerSlice";
import PopUpConfirmBlock from "../../components/common/PopupConfirmBlock";

const Doctor = () => {
  const [listData, setListData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
  const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [specialtyList, setSpecialtyList] = useState([]);

  const [name, setName] = useState<string>("");
  const [specialty, setSpecialty] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const url_api = process.env.REACT_APP_API_URL;

  const outlet = useOutlet();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { showPopUpBlock, triggerBlock } = useAppSelector((state) => state.practitionerSlice)

  useEffect(() => {
    getSpecialty();
  }, [])

  useEffect(() => {
    if (isSearch) {
      searchDoctor();
    } else {
      getDoctor()
    }
  }, [currentPage, itemPerPage, triggerBlock]);

  const getDoctor = () => {
    const url = `${url_api}${API_ALL_GET_DOCTOR}`;

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
  }

  const getSpecialty = () => {
    const url = `${url_api}${API_ALL_GET_SPECIALTY}`;

    axios
      .get(url, defineConfigGet({ page: 0, size: 100 }))
      .then((resp: any) => {
        if (resp) {
          setSpecialtyList(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const handleModify = (id: string) => {
    navigate(`/doctor/overview/detail/${id}`);
  };

  const handleBlock = (practitioner: any) => {
    dispatch(setShowPopUpConfirmBlock(true));
    dispatch(setPractitioner(practitioner));
  };

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const searchDoctor = () => {
    const url = `${url_api}${API_SEARCH_DOCTOR}`;

    const params = { page: currentPage, size: itemPerPage, nameDoctor: name, nameSpecialty: specialty, gender: gender, status: status }

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

  const handleSearch = () => {
    setIsSearch(true);
    setCurrentPage(0);
    searchDoctor();
  }

  const _renderTableListDoctor = () => {
    return (
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">Avatar</th>
            <th scope="col">Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Date of Birth</th>
            <th scope="col">Phone number</th>
            <th scope="col">Email</th>
            <th scope="col">Specialty</th>
            <th scope="col">Status</th>
            <th scope="col">Status Account</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {listData ? listData.map((item: any, idx: number) => {
            const email = item.practitionerTarget?.telecom?.find(
              (i: any) => i?.system === "email"
            )?.value;
            const phone = item.practitionerTarget?.telecom?.find(
              (i: any) => i?.system === "phone"
            )?.value;
            const src = item?.practitionerTarget?.photo[0]?.url;
            return (
              <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                <th scope="row" onClick={() => navigate(`overview/${item.id}`)}>
                  <img src={src} alt="img doctor" style={{ width: "50px", height: "50px", borderRadius: "100rem", objectFit: "cover" }} />
                </th>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.practitioner?.display}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.practitionerTarget.gender}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {item.practitionerTarget?.birthDate !== "null" ? item.practitionerTarget?.birthDate : ""}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  {phone}
                </td>
                <td onClick={() => navigate(`overview/${item.id}`)}>{email}</td>
                <td onClick={() => navigate(`overview/${item.id}`)}>{
                  item.specialty && item.specialty.map((spec: any) => {
                    return (
                      <span>{spec.coding[0].display}</span>
                    )
                  })
                }</td>
                <td onClick={() => navigate(`overview/${item.id}`)}>
                  <span className={styleStatusPractitioner(item.active)}>{item.active ? "Active" : "Inactive"}</span>
                </td>
                <td>
                  <span className={styleStatusPractitioner(item.practitionerTarget.active)}>{item.practitionerTarget.active ? "Active" : "Inactive"}</span>
                </td>
                <td>
                  <span className="ms-1 cursor-pointer" onClick={() => handleModify(item.id)}>
                    <ICON_PENCIL />
                  </span>
                  <span className="ms-1 cursor-pointer" onClick={() => handleBlock(item)}>
                    <ICON_BLOCK />
                  </span>
                </td>
              </tr>
            );
          }) : <div>
            Không có dữ liệu.
          </div>}
        </tbody>
      </table>
    );
  };

  const _renderListSpecialty = () => {
    return (
      <>
        <option hidden>Specialty</option>
        {specialtyList ? (
          specialtyList.map((item: any) => (
            <option value={item.name} key={item.id}>
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
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
            />
          </div>
          <div className="col-3">
            <select
              className="form-select"
              onChange={(e) => setSpecialty(e.target.value)}
            >
              {_renderListSpecialty()}
            </select>
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
          <section className="table-container">
            <div className="table-container-contain">
              <div className="d-flex justify-content-center align-item-center">
                <h6 className="mb-0 text-center fw-bold p-3">List of Doctor</h6>
              </div>
              <div>
                <div className="container-search">{_renderSearch()}</div>
                <div>{_renderTableListDoctor()}</div>
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
          {showPopUpBlock && (
            <PopUpConfirmBlock />
          )}
        </>
      )}
    </Layout>
  );
};

export default memo(Doctor);
