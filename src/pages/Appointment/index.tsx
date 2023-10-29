import { Outlet, useOutlet } from "react-router-dom";
import Layout from "../../components/Layout";
import TotalView from "../../components/common/TotalView";
import PaginationComponent from "../../components/common/Pagination";
import { useEffect, useState } from "react";
import { DEFAULT_ITEM_PER_PAGE, START_PAGE, STATUS } from "../../constants";
import axios from "axios";
import { convertToTime, defineConfigGet, defineConfigPost } from "../../Common/utils";
import { API_ALL_GET_APPOINTMENT } from "../../constants/api.constant";

const Appointment = () => {
    const outlet = useOutlet();

    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
    const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
    const [totalItem, setTotalItem] = useState<number>(0);


    const [name, setName] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [range, setRange] = useState<string>("");

    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const url = `${url_api}${API_ALL_GET_APPOINTMENT}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)
                    // setListData(resp.data);
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

    const handleSearch = () => {

    }

    const _renderTableListAppointment = () => {
        return (
            <table className="table table-hover">
                <thead className="table-light">
                    <tr>
                        <th scope="col">Avatar</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Appointment Date</th>
                        <th scope="col">Appointment Time</th>
                        <th scope="col">Doctor</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {listData?.map((item: any, idx: number) => {
                        return (
                            <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                                <td >
                                    avatar
                                </td>
                                <td >
                                    doctor
                                </td>
                                <td >
                                    email
                                </td>
                                <td >
                                    phone
                                </td>
                                <td >date</td>
                                <td >
                                    {/* <p>{convertToTime(item?.start)}</p>
                                    <p>{convertToTime(item?.end)}</p> */}
                                </td>
                                <td >doctor</td>
                                <td >status</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    };

    const _renderListStatus = () => {
        return (
            <>
                <option hidden>Select Status</option>
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
                    <div className="col-6">
                        <input
                            type="text"
                            placeholder="Search by patients or doctor name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control"
                        />
                    </div>

                    <div className="col-3">
                        <select
                            className="form-select"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {_renderListStatus()}
                        </select>
                    </div>

                    <div className="col-3">
                        <input
                            type="date"
                            className="form-control"
                            placeholder="Range"
                            value={range}
                            onChange={(e) => setRange(e.target.value)}
                        />
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
                    <section className="table-container">
                        <div className="table-container-contain">
                            <div className="d-flex justify-content-center align-item-center">
                                <h6 className="mb-0 text-center fw-bold p-3">List of Appointment</h6>
                            </div>
                            <div>
                                <div className="container-search">{_renderSearch()}</div>
                                <div>{_renderTableListAppointment()}</div>
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

export default Appointment;
