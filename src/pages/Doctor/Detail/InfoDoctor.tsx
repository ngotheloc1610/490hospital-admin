import { useEffect, useState } from "react";
import { USER } from "../../../assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { defineConfigPost } from "../../../Common/utils";
import { API_DETAIL_PRACTITIONER } from "../../../constants/api.constant";
import moment from "moment";
import { FORMAT_DATE } from "../../../constants/general.constant";
import { useAppDispatch } from "../../../redux/hooks";
import { setPractitioner } from "../../../redux/features/practitioner/practitionerSlice";

const InfoDoctor = () => {
  const [doctor, setDoctor] = useState<any>({});

  const param = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const id = param.doctorId;
    const url = `${url_api}${API_DETAIL_PRACTITIONER}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setDoctor(resp.data);
          dispatch(setPractitioner(resp.data))
        }
      })
      .catch((err) => {
        console.log("error get information practitioner (Doctor):", err);
      });
  }, [param.doctorId]);

  const _renderBasicInfo = () => {
    return (
      <div>
        <p className="fw-bold border-top pt-2 text-dark">Basic Information</p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "35%" }}>Gender</th>
              <td>{doctor?.gender}</td>
            </tr>
            <tr>
              <th scope="row">Date of birth</th>
              <td>{doctor?.dateOfBirth}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{doctor?.address}</td>
            </tr>
            <tr>
              <th scope="row">Citizen identification</th>
              <td>{doctor?.identification}</td>
            </tr>
            <tr>
              <th scope="row">Phone number</th>
              <td>{doctor?.phoneNumber}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{doctor?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const _renderWorkInfo = () => {
    return (
      <div className="mt-5">
        <p className="fw-bold border-top pt-2 text-dark">Work information</p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "15%" }}>
                Starting date
              </th>
              <td>{moment(doctor?.startWork).format(FORMAT_DATE)}</td>
            </tr>
            <tr>
              <th scope="row">End date</th>
              <td>{moment(doctor?.endWork).format(FORMAT_DATE)}</td>
            </tr>
            <tr>
              <th scope="row">Room</th>
              <td>{doctor?.desRoom}</td>
            </tr>
            <tr>
              <th scope="row">Specialty</th>
              <td>{doctor?.displaySpecialty}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  const _renderEducationInfo = () => {
    return (
      <div className="mt-3">
        <p className="fw-bold border-top pt-2 text-dark">Education</p>
        <table className="table">
          <tbody>
            {doctor.qualificationsEdu && doctor.qualificationsEdu.map((item: any) => {
              return (
                <tr>
                  <th scope="row" style={{ width: "15%" }}>
                    {moment(item.qualificationPeriodStart).format(FORMAT_DATE)} - {moment(item.qualificationPeriodEnd).format(FORMAT_DATE)}
                  </th>
                  <td>
                    {item.qualificationText}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const _renderSpecializedActivities = () => {
    return (
      <div className="mt-3">
        <p className="fw-bold border-top pt-2 text-dark">
          Specialized activities
        </p>
        <table className="table">
          <tbody>
            {doctor.qualificationsSpecActivities && doctor.qualificationsSpecActivities.map((item: any) => {
              return (
                <tr>
                  <th scope="row" style={{ width: "15%" }}>
                    {moment(item.qualificationPeriodStart).format(FORMAT_DATE)} - {moment(item.qualificationPeriodEnd).format(FORMAT_DATE)}
                  </th>
                  <td>
                    {item.qualificationText}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };

  const _renderAchievement = () => {
    return (
      <div className="mt-3">
        <p className="fw-bold border-top pt-2 text-dark">Achievement</p>
        <table className="table">
          <tbody>
            {doctor.qualificationsAchive && doctor.qualificationsAchive.map((item: any) => {
              return (
                <tr>
                  <th scope="row" style={{ width: "15%" }}>
                    {moment(item.qualificationPeriodStart).format(FORMAT_DATE)} - {moment(item.qualificationPeriodEnd).format(FORMAT_DATE)}
                  </th>
                  <td>
                    {item.qualificationText}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div className="overview-container">
        <div className="div">
          <div className="row">
            <div className="col-4">
              <div className="h-100 d-flex flex-column">
                <div className="h-100">
                  <img src={doctor?.practitionerTarget?.photo ? `data:${doctor.practitionerTarget.photo[0].contentType};base64,${doctor.practitionerTarget.photo[0].data}` : USER} alt="img doctor" className="h-100 d-block m-auto" />
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="mb-3 d-flex justify-content-between">
                <h3 className="fw-bold text-uppercase">{doctor?.practitioner?.display}</h3>
                <div>
                  <button className="button button--primary button--small" onClick={() => navigate(`/doctor/overview/detail/${doctor?.id}`)}>Edit</button>
                </div>
              </div>
              {_renderBasicInfo()}
            </div>
          </div>
        </div>
        {_renderWorkInfo()}
        {_renderEducationInfo()}
        {_renderSpecializedActivities()}
        {_renderAchievement()}
      </div>

      <div className="mt-3">
        <button
          type="submit"
          className="button button--small button--danger"
          onClick={() => navigate("/doctor")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default InfoDoctor;
