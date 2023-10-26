import { useEffect, useState } from "react";
import { USER } from "../../../assets";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { defineConfigGet } from "../../../Common/utils";
import { API_GET_DIAGNOSTIC } from "../../../constants/api.constant";

const InfoDiagnostic = () => {
  const [diagnostic, setDiagnostic] = useState<any>({});

  const param = useParams();
  const navigate = useNavigate();
  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const id = param.diagnosticId;
    const url = `${url_api}${API_GET_DIAGNOSTIC}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp);
          setDiagnostic(resp.data);
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, [param.diagnosticId]);

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
              <h3 className="fw-bold text-uppercase text-dark">
                Dr. Ivan TKU tovic
              </h3>
              {_renderBasicInfo()}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <button
          type="submit"
          className="button button--small button--danger"
          onClick={() => navigate("/diagnostic-report")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default InfoDiagnostic;
