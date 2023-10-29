import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { defineConfigGet } from "../../../Common/utils";
import { API_GET_PATIENT } from "../../../constants/api.constant";
import PaginationComponent from "../../../components/common/Pagination";

const InfoPatient = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(3);
  const [totalItem, setTotalItem] = useState<number>(0);

  const [patient, setPatient] = useState<any>({});

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  const param = useParams();
  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const id = param.patientId;
    const url = `${url_api}${API_GET_PATIENT}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp);
          setPatient(resp.data);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, [param.patientId]);

  return (
    <section className="patient-detail container">
      <div>
        <h3 className="fw-bold pb-3 mb-3 text-uppercase border-bottom">
          {patient?.nameFirstRep?.text}
        </h3>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Gender</th>
              <td>{patient?.gender}</td>
            </tr>
            <tr>
              <th scope="row">Date of birth</th>
              <td>{patient?.birthDate}</td>
            </tr>
            <tr>
              <th scope="row">Current residence</th>
              <td>{patient?.addressFirstRep?.text}</td>
            </tr>
            <tr>
              <th scope="row">Citizen identification</th>
              <td>{patient?.addressFirstRep?.city}</td>
            </tr>
            <tr>
              <th scope="row">Phone number</th>
              <td>{patient?.telecomFirstRep?.value}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>
                {
                  patient?.telecom?.find((i: any) => i?.system === "email")
                    ?.value
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-5">
        <h3 className="fw-bold text-uppercase border-top pt-3 ">
          Diagnostic Report
        </h3>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Department</th>
              <th scope="col">Diagnosed by</th>
              <th scope="col">Date & Time</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
              <td>@fat</td>
            </tr>
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
