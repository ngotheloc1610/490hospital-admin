import { useEffect, useState } from "react";
import axios from "axios";

import { DEFAULT_ITEM_PER_PAGE, START_PAGE, STATUS_APPOINTMENT } from "../../constants";
import { convertToDate, convertToTime, defineConfigGet } from "../../Common/utils";
import { API_ALL_GET_APPOINTMENT_PREVIOUS } from "../../constants/api.constant";

import PaginationComponent from "../../components/common/Pagination";

const PreviousAppointment = () => {
    const [listData, setListData] = useState([]);
    const [currentPage, setCurrentPage] = useState<number>(START_PAGE);
    const [itemPerPage, setItemPerPage] = useState<number>(DEFAULT_ITEM_PER_PAGE);
    const [totalItem, setTotalItem] = useState<number>(0);


    const [name, setName] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const url = `${url_api}${API_ALL_GET_APPOINTMENT_PREVIOUS}`;

        axios
            .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
            .then((resp: any) => {
                if (resp) {
                    setListData(resp.data.content);
                    setTotalItem(resp.data.totalElements);
                }
            })
            .catch((err: any) => {
                console.log("error get appointment previous:", err);
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
                                    <span>{convertToTime(item.appointmentTimeStart)}</span> -
                                    <span>{convertToTime(item.appointmentTimeEnd)}</span>
                                </td>
                                <td >{item.doctorName}</td>
                                <td >{item.status}</td>
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
                {STATUS_APPOINTMENT.map((item: any) => (
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
                    <div className="col-8">
                        <input
                            type="text"
                            placeholder="Search by patients or doctor name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="form-control h-100"
                        />
                    </div>

                    <div className="col-4">
                        <select
                            className="form-select h-100"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            {_renderListStatus()}
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
        <section >
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

    );
};

export default PreviousAppointment;
