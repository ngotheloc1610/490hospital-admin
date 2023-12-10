import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { convertToDate, convertToTime, defineConfigGet, defineConfigPost, styleStatus } from "../../../../Common/utils";
import { API_GET_LIST_APPOINTMENT_PATIENT, API_GET_PATIENT } from "../../../../constants/api.constant";
import { USER } from "../../../../assets";

import PaginationComponent from "../../../../components/common/Pagination";
import moment from "moment";
import { FORMAT_DATE } from "../../../../constants/general.constant";
import { useAppSelector } from "../../../../redux/hooks";

const InfoPatient = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(3);
  const [totalItem, setTotalItem] = useState<number>(0);
  const [patient, setPatient] = useState<any>({});
  const [listAppointment, setListAppointment] = useState<any>([]);

  const param = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;
  const { triggerUpdate } = useAppSelector(state => state.patientSlice);

  useEffect(() => {
    getPatientDetail(param.patientId)
  }, [param.patientId, triggerUpdate]);

  useEffect(() => {
    getListAppointment(param.patientId)
  }, [param.patientId, currentPage, itemPerPage]);

  const getPatientDetail = (id: any) => {
    const url = `${url_api}${API_GET_PATIENT}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setPatient(resp.data);
        }
      })
      .catch((err) => {
        console.log("error get info patient:", err);
      });
  }

  const getListAppointment = (id: any) => {
    const url = `${url_api}${API_GET_LIST_APPOINTMENT_PATIENT}${id}`;

    axios
      .get(url, defineConfigGet({ page: currentPage, size: itemPerPage }))
      .then((resp: any) => {
        if (resp) {
          setListAppointment(resp.data.content);
          setTotalItem(resp.data.totalElements);
        }
      })
      .catch((err) => {
        console.log("error get appointment:", err);
      });
  }

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  return (
    <section className="container">
      <div>
        <div className="pb-3 mb-3 border-bottom d-flex justify-content-between">
          <h3 className="fw-bold text-uppercase">{patient?.name}</h3>
          <div>
            <button className="button button--primary button--small" onClick={() => navigate(`/patient/information/detail/${patient?.id}`)}>Edit</button>
          </div>
        </div>

        <div className="row">
          <div className="col-8">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row">Gender</th>
                  <td>{patient?.gender}</td>
                </tr>
                <tr>
                  <th scope="row">Date of birth</th>
                  <td>{moment(patient?.dateOfBirth).format(FORMAT_DATE)}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{patient?.address}</td>
                </tr>
                <tr>
                  <th scope="row">Citizen identification</th>
                  <td>{patient?.identifier}</td>
                </tr>
                <tr>
                  <th scope="row">Phone number</th>
                  <td>{patient?.phoneNumber}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>
                    {patient?.email}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-4">
            <div className="h-100 d-flex flex-column">
              <div className="h-100">
                <img
                  src={patient?.photo ? patient?.photo : USER}
                  alt="img patient"
                  className={`d-block m-auto`}
                  style={{ objectFit: "cover" }}
                />
              </div>

            </div>
          </div>
        </div>

      </div>

      <div className="mt-5">
        <h3 className="fw-bold border-top pt-3 ">
          List Appointment
        </h3>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Appointment Date</th>
              <th scope="col">Appointment Time</th>
              <th scope="col">Doctor</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {listAppointment && listAppointment.length > 0 && listAppointment.map((item: any, idx: number) => {
              return (
                <tr className={`${idx % 2 === 1 ? "table-light" : ""}`}>
                  <td >
                    {item.patientName}
                  </td>

                  <td >{convertToDate(item.appointDate)}</td>
                  <td >
                    <span>{convertToTime(item.appointmentTimeStart)} </span>
                    <span> - </span>
                    <span>{convertToTime(item.appointmentTimeEnd)}</span>
                  </td>
                  <td >{item.doctorName}</td>
                  <td>
                    <span className={styleStatus(item.status)}>{item.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <PaginationComponent
          totalItem={totalItem}
          itemPerPage={itemPerPage}
          currentPage={currentPage === 0 ? 1 : currentPage + 1}
          getItemPerPage={getItemPerPage}
          getCurrentPage={getCurrentPage}
        />
      </div>
    </section>
  );
};

export default InfoPatient;
