import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { defineConfigGet } from "../../../Common/utils";
import { API_GET_PATIENT } from "../../../constants/api.constant";
import PaginationComponent from "../../../components/common/Pagination";
import { USER } from "../../../assets";

const InfoPatient = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [itemPerPage, setItemPerPage] = useState<number>(3);
  const [totalItem, setTotalItem] = useState<number>(0);

  const inputRef = useRef<any>(null);
  const [patient, setPatient] = useState<any>({});
  const [image, setImage] = useState<any>("");



  const param = useParams();
  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getPatientDetail(param.patientId)
  }, [param.patientId]);

  const getPatientDetail = (id: any) => {
    const url = `${url_api}${API_GET_PATIENT}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          setPatient(resp.data);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handlePickImage = () => {
    inputRef.current.click();
  }

  const getCurrentPage = (item: number) => {
    setCurrentPage(item - 1);
  };

  const getItemPerPage = (item: number) => {
    setItemPerPage(item);
    setCurrentPage(0);
  };

  return (
    <section className="patient-detail container">
      <div>
        <div className="pb-3 mb-3 border-bottom d-flex justify-content-between">
          <h3 className="fw-bold text-uppercase">{patient?.nameFirstRep?.text}</h3>
          <div>
            <button className="button button--info button--small me-3">Change Password</button>
            <button className="button button--primary button--small">Edit</button>
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
                  <td>{patient?.birthDate}</td>
                </tr>
                <tr>
                  <th scope="row">Address</th>
                  <td>{patient?.addressFirstRep?.text}</td>
                </tr>
                <tr>
                  <th scope="row">Citizen identification</th>
                  <td>{patient?.addressFirstRep?.city}</td>
                </tr>
                <tr>
                  <th scope="row">Phone number</th>
                  <td>{patient?.telecom?.find((i: any) => i?.system === "phone")
                    ?.value}</td>
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
          <div className="col-4">
            <div className="h-100 d-flex flex-column" onClick={handlePickImage}>
              <div className="h-100">
                <img
                  src={image ? URL.createObjectURL(image) : USER}
                  alt=""
                  className={`h-100 w-100 d-block m-auto ${image ? "" : "bg-image"}`}
                  style={{ objectFit: "cover" }}
                />
                <input
                  type="file"
                  className="d-none"
                  ref={inputRef}
                  onChange={handleChangeImage}
                />
              </div>
              <button className="button button--small button--primary w-90 mx-auto mt-3">
                {image ? "Edit" : "Add"} profile picture
              </button>
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
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>Otto</td>
              <td>Otto</td>
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
