import { memo, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { USER } from "../../assets";
import { Link } from "react-router-dom";

const DiagnosticReport = () => {

  const url_api = process.env.REACT_APP_API_URL;

  return (
    <Layout>
    <section className="diagnostic-report">
      <div className="container">
        <div className="d-flex justify-content-between">
          <p>Appointment Details</p>
          <div>
            <button className="button button--small button--primary">Arrived</button>
            <button className="button button--small button--danger--outline">No Show</button>
            <button className="button button--small button--danger">Cancel</button>
          </div>
        </div>

        <div className="row g-3">
          <div className="col-6 g-3">
            <div className="box p-3">
              <div>
                <p className="fw-bold">Patient details</p>
                <Link className="text-uppercase" to="">view full medial record</Link>
              </div>
              <div>
              <div>
                <img src={USER} alt="" />
              </div>
              <div>
                <p><span className="fw-bold">Patient name: </span></p>
                <p><span className="fw-bold">Gender: </span></p>
                <p><span className="fw-bold">D.O.B: </span></p>
                <p><span className="fw-bold">Address: </span></p>
                <p><span className="fw-bold">Citizen identification: </span></p>
                <p><span className="fw-bold">Phone number: </span></p>
                <p><span className="fw-bold">Email: </span></p>
              </div>
              </div>
            </div>
          </div>
          <div className="col-6">
          <div className="box p-3">
            <div>
                <p className="fw-bold">Booking details</p>
              </div>
              <div>
                <p><span className="fw-bold">Appointment Date: </span></p>
                <p><span className="fw-bold">Appointment Time: </span></p>
                <p><span className="fw-bold">Doctor: </span></p>
                <p><span className="fw-bold">Specialty: </span></p>
                <p><span className="fw-bold">Appointment Type: </span></p>
                <p><span className="fw-bold">Appointment Status: </span></p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="box">
                
            </div>
          </div>
        </div>

        <div>
          <button className="button button--small button--danger">Back</button>
          <button className="button button--small button--outline">Save draft</button>
          <button className="button button--small button--primary">Submit & Fulfilled</button>
        </div>
      </div>
    </section>
    </Layout>
  );
};

export default memo(DiagnosticReport);
