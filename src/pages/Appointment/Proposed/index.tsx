import { useEffect, useState } from "react";
import axios from "axios";

import { DEFAULT_ITEM_PER_PAGE, START_PAGE } from "../../../constants";
import { convertToDate, convertToTime, defineConfigGet, styleStatus } from "../../../Common/utils";
import { API_ALL_GET_APPOINTMENT_PROPOSED, API_SEARCH_APPOINTMENT_PROPOSED } from "../../../constants/api.constant";

import PaginationComponent from "../../../components/common/Pagination";
import { USER } from "../../../assets";
import Layout from "../../../components/Layout";
import { useAppSelector } from "../../../redux/hooks";

const AppointmentProposed = () => {
    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
    const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
    const [totalItem, setTotalItem] = useState<number>(0);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [name, setName] = useState<string>("");

    const url_api = process.env.REACT_APP_API_URL;

    const { triggerNoShow } = useAppSelector(state => state.appointmentSlice)

    useEffect(() => {
        if (isSearch) {
            searchAppointment()
        } else {
            getAppointmentProposed()
        }
    }, [currentPage, itemPerPage, isSearch, triggerNoShow]);

    const getAppointmentProposed = () => {
        const url = `${url_api}${API_ALL_GET_APPOINTMENT_PROPOSED}`;

        axios
            .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
            .then((resp: any) => {
                if (resp) {
                    setListData(resp.data.content);
                    setTotalItem(resp.data.totalElements);
                }
            })
            .catch((err: any) => {
                console.log("error get appointment proposed:", err);
            });
    }

    const searchAppointment = () => {
        const url = `${url_api}${API_SEARCH_APPOINTMENT_PROPOSED}`;

        const params = {
            nameDoctorOrPatient: name,
            page: currentPage,
            size: itemPerPage
        }

        axios
            .get(url, defineConfigGet(params))
            .then((resp: any) => {
                if (resp) {
                    setListData(resp.data.content);
                    setTotalItem(resp.data.totalElements);
                }
            })
            .catch((err: any) => {
                console.log("error search appointment:", err);
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
        searchAppointment();
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
                    {listData && listData?.length > 0 ? listData.map((item: any, idx: number) => {
                        return (
                            <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                                <td >
                                    <img src={item.patientPhoto ? item.patientPhoto : USER} alt="img patient" className="image-patient" />
                                </td>
                                <td >
                                    {item.patientName}
                                </td>
                                <td >
                                    {item.patientEmail}
                                </td>
                                <td >
                                    {item.patientPhone}
                                </td>
                                <td >{convertToDate(item.appointDate)}</td>
                                <td >
                                    <span>{convertToTime(item.appointmentTimeStart)}</span>
                                    <span> - </span>
                                    <span>{convertToTime(item.appointmentTimeEnd)}</span>
                                </td>
                                <td >{item.doctorName}</td>
                                <td>
                                    <span className={styleStatus(item.status.toLowerCase())}>{item.status}</span>
                                </td>
                            </tr>
                        );
                    }) : <p>No have data!</p>}
                </tbody>
            </table>
        );
    };

    const _renderSearch = () => {
        return (
            <div className="row">
                <div className="col-6">
                    <input
                        type="text"
                        placeholder="Search by patients or doctor name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="form-control h-100"
                    />
                </div>
                <div className="col-6">
                    <button className="button-apply" onClick={() => handleSearch()}>Apply</button>
                </div>
            </div>
        );
    };


    return (
        <Layout>
            <section className="appointment-list container  mt-5">
                <div className="container-search">{_renderSearch()}</div>
                <div>{_renderTableListAppointment()}</div>
                <PaginationComponent
                    totalItem={totalItem}
                    itemPerPage={itemPerPage}
                    currentPage={currentPage === 0 ? 1 : currentPage + 1}
                    getItemPerPage={getItemPerPage}
                    getCurrentPage={getCurrentPage}
                />
            </section>
        </Layout>

    );
};

export default AppointmentProposed;
