import { useEffect, useState } from "react";
import { USER } from "../../../assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { defineConfigGet } from "../../../Common/utils";

const InfoDepartment = () => {
  const [department, setDepartment] = useState<any>({});

  const param = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;

  const getDepartmentDetail = () => {
    const id = param.departmentId;
    const url = `${url_api}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp);
          setDepartment(resp.data);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  useEffect(() => {
    getDepartmentDetail()
  }, [param.departmentId]);

  const _renderBasicInfo = () => {
    return (
      <div>
        <p className="fw-bold border-top pt-2 text-dark">Basic Information</p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row" style={{ width: "35%" }}>
                Gender
              </th>
              <td>gender</td>
            </tr>
            <tr>
              <th scope="row">Date of birth</th>
              <td>01/01/1975</td>
            </tr>
            <tr>
              <th scope="row">Current residence</th>
              <td>abcdefgh</td>
            </tr>
            <tr>
              <th scope="row">Citizen identification</th>
              <td>[CCCD] 12345678910</td>
            </tr>
            <tr>
              <th scope="row">Phone number</th>
              <td>0987654321</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>abc@gmail.com</td>
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
              <td>01/01/2010</td>
            </tr>
            <tr>
              <th scope="row">Department</th>
              <td>General Surgery Department</td>
            </tr>
            <tr>
              <th scope="row">Position</th>
              <td>Resident</td>
            </tr>
            <tr>
              <th scope="row">Level</th>
              <td>PhD</td>
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
                  <img src={USER} alt="" className="h-100 d-block m-auto" />
                </div>
              </div>
            </div>
            <div className="col-8">
              <div className="pb-3 mb-3 border-bottom d-flex justify-content-between">
                <h3 className="fw-bold text-uppercase">aaa</h3>
                <div>
                  <button className="button button--info button--small me-3" onClick={() => navigate("/change-password")}>Change Password</button>
                  <button className="button button--primary button--small">Edit</button>
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
          onClick={() => navigate("/department")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default InfoDepartment;
