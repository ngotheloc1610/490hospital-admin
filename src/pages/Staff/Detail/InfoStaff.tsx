import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axios from "axios";

import { USER } from "../../../assets";
import { defineConfigPost } from "../../../Common/utils";
import { API_DETAIL_PRACTITIONER } from "../../../constants/api.constant";
import { FORMAT_DATE } from "../../../constants/general.constant";

const InfoStaff = () => {
  const [staff, setStaff] = useState<any>({});

  const param = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const id = param.staffId;
    const url = `${url_api}${API_DETAIL_PRACTITIONER}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setStaff(resp.data);
        }
      })
      .catch((err) => {
        console.log("error get information practitioner (Staff):", err);
      });
  }, [param.staffId]);

  const _renderBasicInfo = () => {
    const email = staff.practitionerTarget?.telecom?.find(
      (i: any) => i?.system === "email"
    )?.value;
    const phone = staff.practitionerTarget?.telecom?.find(
      (i: any) => i?.system === "phone"
    )?.value;

    return (
      <div>
        <p className="fw-bold border-top pt-2 text-dark">Basic Information</p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "35%" }}>Gender</th>
              <td>{staff?.practitionerTarget?.gender}</td>
            </tr>
            <tr>
              <th scope="row">Date of birth</th>
              <td>{staff?.practitionerTarget?.birthDate}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{staff?.practitionerTarget?.address[0].text}</td>
            </tr>
            <tr>
              <th scope="row">Citizen identification</th>
              <td>{staff?.practitionerTarget?.identifierFirstRep?.value}</td>
            </tr>
            <tr>
              <th scope="row">Phone number</th>
              <td>{phone}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{email}</td>
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
              <td>{moment(staff.period?.start).format(FORMAT_DATE)}</td>
            </tr>
            <tr>
              <th scope="row">End date</th>
              <td>{moment(staff.period?.end).format(FORMAT_DATE)}</td>
            </tr>
            <tr>
              <th scope="row">Specialty</th>
              <td>{staff.specialty && staff.specialty.map((spec: any) => {
                return <span>{spec.coding[0].display}</span>
              })}</td>
            </tr>
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
                  <img src={staff?.practitionerTarget?.photo ? `data:${staff.practitionerTarget.photo[0].contentType};base64,${staff.practitionerTarget.photo[0].data}` : USER} alt="img staff" className="h-100 d-block m-auto" />
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="pb-3 mb-d-flex justify-content-between">
                <h3 className="fw-bold text-uppercase">{staff.practitioner?.display}</h3>
                <div>
                  <button className="button button--primary button--small" onClick={() => navigate(`/staff/overview/detail/${staff?.id}`)}>Edit</button>
                </div>
              </div>
              {_renderBasicInfo()}
            </div>
          </div>
        </div>
        {_renderWorkInfo()}
      </div>

      <div className="mt-3">
        <button
          type="submit"
          className="button button--small button--danger"
          onClick={() => navigate("/staff")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default InfoStaff;
