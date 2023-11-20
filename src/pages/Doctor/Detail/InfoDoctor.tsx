import { useEffect, useState } from "react";
import { USER } from "../../../assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { defineConfigPost } from "../../../Common/utils";
import { API_DETAIL_PRACTITIONER } from "../../../constants/api.constant";
import moment from "moment";
import { FORMAT_DATE } from "../../../constants/general.constant";

const InfoDoctor = () => {
  const [doctor, setDoctor] = useState<any>({});

  const param = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const id = param.doctorId;
    const url = `${url_api}${API_DETAIL_PRACTITIONER}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          setDoctor(resp.data);
        }
      })
      .catch((err) => {
        console.log("error get information practitioner (Doctor):", err);
      });
  }, [param.doctorId]);

  const _renderBasicInfo = () => {
    const email = doctor?.practitionerTarget?.telecom?.find(
      (i: any) => i?.system === "email"
    )?.value;
    const phone = doctor?.practitionerTarget?.telecom?.find(
      (i: any) => i?.system === "phone"
    )?.value;

    return (
      <div>
        <p className="fw-bold border-top pt-2 text-dark">Basic Information</p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "35%" }}>Gender</th>
              <td>{doctor?.practitionerTarget?.gender}</td>
            </tr>
            <tr>
              <th scope="row">Date of birth</th>
              <td>{doctor?.practitionerTarget?.birthDate}</td>
            </tr>
            <tr>
              <th scope="row">Address</th>
              <td>{doctor?.practitionerTarget?.addressFirstRep?.text}</td>
            </tr>
            <tr>
              <th scope="row">Citizen identification</th>
              <td>{doctor?.practitionerTarget?.identifierFirstRep?.value}</td>
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
              <td>{moment(doctor?.period?.start).format(FORMAT_DATE)}</td>
            </tr>
            <tr>
              <th scope="row">End date</th>
              <td>{moment(doctor?.period?.end).format(FORMAT_DATE)}</td>
            </tr>
            <tr>
              <th scope="row">Room</th>
              <td>{doctor.location && doctor.location.map((item: any) => {
                return (
                  <span>{item.display}</span>
                )
              })}</td>
            </tr>
            <tr>
              <th scope="row">Specialty</th>
              <td>{doctor.specialty && doctor.specialty.map((spec: any) => {
                return <span>{spec.coding[0].display}</span>
              })}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // const _renderEducationInfo = () => {
  //   return (
  //     <div className="mt-3">
  //       <p className="fw-bold border-top pt-2 text-dark">Education</p>
  //       <table className="table">
  //         <tbody>
  //           {doctor.educations && doctor.educations.map((edu: any) => {
  //             return (
  //               <tr>
  //                 <th scope="row" style={{ width: "15%" }}>
  //                   {moment(edu.year).format("YYYY")}
  //                 </th>
  //                 <td>
  //                   {edu.detail}
  //                 </td>
  //               </tr>
  //             )
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  // const _renderSpecializedActivities = () => {
  //   return (
  //     <div className="mt-3">
  //       <p className="fw-bold border-top pt-2 text-dark">
  //         Specialized activities
  //       </p>
  //       <table className="table">
  //         <tbody>
  //           {doctor.experiences && doctor.experiences.map((exper: any) => {
  //             return (
  //               <tr>
  //                 <th scope="row" style={{ width: "15%" }}>
  //                   <span>{moment(exper.timeStart).format("YYYY")} - {moment(exper.timeEnd).format("YYYY")}</span>
  //                 </th>
  //                 <td>
  //                   {exper.detail}
  //                 </td>
  //               </tr>
  //             )
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

  // const _renderAchievement = () => {
  //   return (
  //     <div className="mt-3">
  //       <p className="fw-bold border-top pt-2 text-dark">Achievement</p>
  //       <table className="table">
  //         <tbody>
  //           {doctor.achievements && doctor.achievements.map((achi: any) => {
  //             return (
  //               <tr>
  //                 <th scope="row" style={{ width: "15%" }}>
  //                   {moment(achi.time).format("YYYY")}
  //                 </th>
  //                 <td>
  //                   {achi.detail}
  //                 </td>
  //               </tr>
  //             )
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

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
        {/* {_renderEducationInfo()}
        {_renderSpecializedActivities()}
        {_renderAchievement()} */}
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
