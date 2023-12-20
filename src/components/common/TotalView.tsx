import { useEffect, useState } from "react";
import {
  ICON_DEPARTMENT,
  ICON_DOCTOR,
  ICON_PATIENT,
  ICON_STAFF,
} from "../../assets";
import { API_ADMIN_TOTAL, API_DASHBOARD_TOTAL } from "../../constants/api.constant";
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
    const url = `${url_api}${API_DASHBOARD_TOTAL}`;

    axios.get(url, defineConfigGet({})).then((resp: any) => {
      if (resp) {
        console.log("resp:", resp)
        const total: ITotalView = {
          patient: resp.data.total_patients,
          doctor: resp.data.total_doctors,
          department: resp.data.total_specialties,
          staff: resp.data.total_staffs,
        }
        setTotal(total);
      }
    }).catch(err => {
      console.log("err:", err)

    })
  }, [])

  return (
    <section className="totalview">
      <div>
        <div className="row">
          <div className="col-3">
            <div className="totalview-box totalview-box-doctor">
              <p className="fw-bold fs-5">Total Doctors</p>
              <p className="fs-4 mb-0">{total.doctor}</p>
            </div>
            {/* <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_DOCTOR style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Doctors</span>
                </p>
                <p>{total.doctor}</p>
              </div>
            </div> */}
          </div>
          <div className="col-3">
            <div className="totalview-box totalview-box-staff">
              <p className="fw-bold fs-5">Total Staff</p>
              <p className="fs-4 mb-0">{total.staff}</p>
            </div>
            {/* <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_STAFF style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Staff</span>
                </p>
                <p>{total.staff}</p>
              </div>
            </div> */}
          </div>
          <div className="col-3">
            <div className="totalview-box totalview-box-specialty">
              <p className="fw-bold fs-5">Total Specialty</p>
              <p className="fs-4 mb-0">{total.department}</p>
            </div>
            {/* <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_DEPARTMENT style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Department</span>
                </p>
                <p>{total.department}</p>
              </div>
            </div> */}
          </div>
          <div className="col-3 ">
            <div className="totalview-box totalview-box-patient">
              <p className="fw-bold fs-5">Total Patient</p>
              <p className="fs-4 mb-0">{total.patient}</p>
            </div>
            {/* <div className="d-flex totalview-box p-3">
              <p className="w-50 d-flex justify-content-center align-item-center m-auto">
                <ICON_PATIENT style={{ width: "50px", height: "50px" }} />
              </p>
              <div className="w-50 m-auto">
                <p>
                  Total <span className="d-block">Patient</span>
                </p>
                <p>{total.patient}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TotalView;
