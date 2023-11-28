import { USER } from "../../assets";

const PatientMonitorDetail = () => {
  return (
    <section>
      <div className="row">
      <div className="row col-8">
        <div className="col-3">
          <p>
            <span>Patient Profile</span>
            <span>
              <i className="bi bi-pencil-fill"></i>
            </span>
          </p>
          <img src={USER} alt="img patient" />
          <p>
            name <span>Status</span>
          </p>
          <p>
            Age: <span>23</span>
          </p>
        </div>
        <div className="col-9 row">
          <div className="col-3">
            <p>Gender:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Phone number:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Personal ID No:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>D.O.B: </p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Email:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Address:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Created Date: </p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Enrolled Date:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Clinic:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Registration Status:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>Patient Source:</p>
            <span></span>
          </div>
          <div className="col-3">
            <p>External Organization:</p>
            <span></span>
          </div>
        </div>
      </div>

      <div className="col-4">
        <p>Upcoming Appointment</p>
      </div>
      </div>
    </section>
  );
};

export default PatientMonitorDetail;
