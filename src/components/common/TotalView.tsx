import { useEffect, useState } from "react";
import {
  ICON_DEPARTMENT,
  ICON_DOCTOR,
  ICON_PATIENT,
  ICON_STAFF,
} from "../../assets";
import { API_ADMIN_TOTAL } from "../../constants/api.constant";
import axios from "axios";
import { defineConfigGet } from "../../Common/utils";
import { ITotalView } from "../../interface/general.interface";

function TotalView() {
  const url_api = process.env.REACT_APP_API_URL;

  const [total, setTotal] = useState<ITotalView>({
    patient: 0,
    doctor: 0,
    department: 0,
    staff: 0
  });

  useEffect(() => {
    const url = `${url_api}${API_ADMIN_TOTAL}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        const total: ITotalView = {
          patient: resp.data.PATIENT,
          doctor: resp.data.DOCTOR,
          department: resp.data.DEPARTMENT,
          staff: resp.data.STAFF,
        }
        setTotal(total);
      }
    }).catch(err => {
      console.log("err:", err)

    })
  }, [])

  return (
    <section className="totalview">
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_DOCTOR style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Doctors</span>
                </p>
                <p>{total.doctor}</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_STAFF style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Staff</span>
                </p>
                <p>{total.staff}</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_DEPARTMENT style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Department</span>
                </p>
                <p>{total.department}</p>
              </div>
            </div>
          </div>
          <div className="col-3 ">
            <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_PATIENT style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Patient</span>
                </p>
                <p>{total.patient}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TotalView;
