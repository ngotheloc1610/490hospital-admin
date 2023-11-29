import { memo, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { USER } from "../../assets";
import { Link } from "react-router-dom";
import { TOTAL_STEP } from "../../constants/general.constant";

const DiagnosticReport = () => {

  const url_api = process.env.REACT_APP_API_URL;

  const [step, setStep] = useState<number>(1);

  const [isPassStep1, setIsPassStep1] = useState<boolean>(false);

  const [listBloodPressure, setListBloodPressure] = useState<any>([]);
  const [listBloodGlucose, setListBloodGlucose] = useState<any>([]);
  const [listTemperature, setListTemperature] = useState<any>([]);
  const [listBMI, setListBMI] = useState<any>([]);
  const [listHeartRate, setListHeartRate] = useState<any>([]);
  const [listCondition, setListCondition] = useState<any>([]);
  const [listBodySite, setListBodySite] = useState<any>([]);
  const [listSeverity, setListSeverity] = useState<any>([]);
  const [listDiagnosis, setListDiagnosis] = useState<any>([]);
  const [listCategory, setListCategory] = useState<any>([]);

  const [bloodPressure, setBloodPressure] = useState<string>("");
  const [bloodGlucose, setBloodGlucose] = useState<string>("");
  const [heartRate, setHeartRate] = useState<string>("");
  const [bmi, setBMI] = useState<string>("");
  const [temperature, setTemperature] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [condition, setCondition] = useState<string>("");
  const [bodySite, setBodySite] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
  const [recordedDate, setRecordedDate] = useState<string>("");

  const [finalDiagnosis, setFinalDiagnosis] = useState<string>("");
  const [cateogry, setCateogry] = useState<string>("");
  const [noteDiagnosis, setNoteDiagnosis] = useState<string>("");




  const _renderListBloodGlucose = () => {
    return (
      <>
        <option hidden>-- Additional Conditions (if applicable)</option>
        {listBloodGlucose ? (
          listBloodGlucose.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListBloodPressure = () => {
    return (
      <>
        <option hidden>-- Additional Conditions (if applicable)</option>
        {listBloodPressure ? (
          listBloodPressure.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListTemperature = () => {
    return (
      <>
        <option hidden>-- Additional Conditions (if applicable)</option>
        {listTemperature ? (
          listTemperature.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListBMI = () => {
    return (
      <>
        <option hidden>-- Additional Conditions (if applicable)</option>
        {listBMI ? (
          listBMI.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListHeartRate = () => {
    return (
      <>
        <option hidden>-- Additional Conditions (if applicable)</option>
        {listHeartRate ? (
          listHeartRate.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListCondition = () => {
    return (
      <>
        <option hidden>Shortness of breath</option>
        {listCondition ? (
          listCondition.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };
  const _renderListSeverity = () => {
    return (
      <>
        <option hidden>Select a severity</option>
        {listSeverity ? (
          listSeverity.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListBodySite = () => {
    return (
      <>
        <option hidden>Select a body site</option>
        {listBodySite ? (
          listBodySite.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListDiagnosis = () => {
    return (
      <>
        <option hidden>Select a final diagnosis</option>
        {listDiagnosis ? (
          listDiagnosis.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListCategory = () => {
    return (
      <>
        <option hidden>Select a category</option>
        {listCategory ? (
          listCategory.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderAppointmentHeader = () => {
    return (
      <div className="appointment-container-header">
        <p>
          <span className="appointment-step">
            STEP {step}/{TOTAL_STEP}
          </span>
          <span> - </span>
          <span className="fw-bold">
            {step === 2 ? "Findings and Assessment" : "Observation and Health Summary "}
          </span>
        </p>
      </div>
    );
  };

  const _renderAppointmentFooter = () => {
    return (
      <div className="appointment-container-footer">
        {step === TOTAL_STEP ? (
          <div className="d-flex justify-content-center align-item-center">
            <button
              className="button button--gray button--small me-3"
              onClick={() => { setStep(step - 1); setIsPassStep1(false) }}
            >
              Back
            </button>
            <button
              className="button button--outline button--small me-3"
            >
              Save Draft
            </button>
            <button
              className="button button--primary button--small"
            >
              Submit & Fulfilled
            </button>
          </div>
        ) : (
          <button
            className="button button--primary button--small d-block m-auto"
            onClick={() => { setStep(step + 1); setIsPassStep1(true) }}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const _renderStep1 = (

  ) => {
    return (
      <div className="row g-3">
        <div className="col-6">
          <div className="d-flex">
            <label htmlFor="bloodPressure" className="my-auto">
              Blood Pressure:
            </label>
            <div>
              <input type="text" />
              <span> / </span>
              <input type="text" />
              <span>mmHg</span>
            </div>
          </div>
          <select
            className="form-select"
            id="bloodPressure"
            onChange={(e: any) => setBloodPressure(e.target.value)}
            value={bloodPressure}
          >
            {_renderListBloodPressure()}
          </select>
        </div>
        <div className="col-6">
          <div className="d-flex">
            <label htmlFor="temperature" className="my-auto">
              Temperature:
            </label>
            <div>
              <input type="text" />
              <span>&deg;C</span>

            </div>
          </div>
          <select
            className="form-select"
            id="temperature"
            onChange={(e: any) => setTemperature(e.target.value)}
            value={temperature}
          >
            {_renderListTemperature()}
          </select>
        </div>
        <div className="col-6">
          <div className="d-flex">
            <label htmlFor="bloodGlucose" className="my-auto">
              Blood Glucose:
            </label>
            <div>
              <input type="text" />
              <span>mmol/L:</span>
            </div>
          </div>
          <select
            className="form-select"
            id="bloodGlucose"
            onChange={(e: any) => setBloodGlucose(e.target.value)}
            value={bloodGlucose}
          >
            {_renderListBloodGlucose()}
          </select>
        </div>
        <div className="col-6">
          <div className="d-flex">
            <label htmlFor="bloodGlucose" className="my-auto">
              Body Mass Index (BMI)
            </label>
            <div>
              <input type="text" disabled />

              <span>Weight</span>
              <input type="text" />
              <span>kg</span>

              <span>Height</span>
              <input type="text" />
              <span>cm</span>
            </div>
          </div>
          <select
            className="form-select"
            id="bloodGlucose"
            onChange={(e: any) => setBMI(e.target.value)}
            value={bmi}
          >
            {_renderListBMI()}
          </select>
        </div>
        <div className="col-6">
          <div className="d-flex">
            <label htmlFor="heartRate" className="my-auto">
              Heart Rate
            </label>
            <div>
              <input type="text" disabled />
              <span>bpm</span>
            </div>
          </div>
          <select
            className="form-select"
            id="heartRate"
            onChange={(e: any) => setHeartRate(e.target.value)}
            value={heartRate}
          >
            {_renderListHeartRate()}
          </select>
        </div>
        <div className="col-6">
          <label htmlFor="note" className="d-block">Note</label>
          <textarea
            className="p-3 rounded w-100"
            cols={5}
            rows={5}
            placeholder="Add notes here"
            id="note"
            value={note}
            onChange={(e: any) => setNote(e.target.value)}
          ></textarea>
        </div>
      </div>
    )
  }

  const _renderStep2 = () => {
    return (
      <div className="row g-3">
        <div className="col-6">
          <div className="d-flex justify-content-between">
            <label htmlFor="condition" className="my-auto">
              Condition
            </label>
            <select
              className="form-select"
              id="condition"
              onChange={(e: any) => setCondition(e.target.value)}
              value={condition}
            >
              {_renderListCondition()}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-between">
            <label htmlFor="bodySite" className="my-auto">
              Body Site
            </label>
            <select
              className="form-select"
              id="bodySite"
              onChange={(e: any) => setBodySite(e.target.value)}
              value={bodySite}
            >
              {_renderListBodySite()}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-between">
            <label htmlFor="severity" className="my-auto">
              Severity
            </label>
            <select
              className="form-select"
              id="severity"
              onChange={(e: any) => setSeverity(e.target.value)}
              value={severity}
            >
              {_renderListSeverity()}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-between">
            <label htmlFor="recordedDate" className="my-auto">
              Recorded Date
            </label>
            <input
              id="recordedDate"
              type="date"
              className={`form-control`}
              value={recordedDate}
              onChange={(e: any) => setRecordedDate(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <label htmlFor="note">Note</label>
            <textarea
              className="p-3 rounded w-100"
              cols={5}
              rows={5}
              placeholder="Add notes here"
              id="note"
              value={note}
              onChange={(e: any) => setNote(e.target.value)}
            ></textarea>
          </div>
        </div>

        <div className="col-6">
          <div className="d-flex justify-content-between">
            <label htmlFor="diagnosis" className="my-auto">
              Final Diagnosis<span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="diagnosis"
              onChange={(e: any) => setFinalDiagnosis(e.target.value)}
              value={finalDiagnosis}
            >
              {_renderListDiagnosis()}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex justify-content-between">
            <label htmlFor="category" className="my-auto">
              Category<span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="category"
              onChange={(e: any) => setCateogry(e.target.value)}
              value={cateogry}
            >
              {_renderListCategory()}
            </select>
          </div>
        </div>
        <div className="col-12">
          <div className="d-flex justify-content-between">
            <label htmlFor="noteDiagnosis" className="my-auto">
              Final Diagnosis Note:
            </label>
            <textarea
              className="p-3 rounded w-100"
              cols={5}
              rows={5}
              placeholder="Add notes here"
              id="noteDiagnosis"
              value={noteDiagnosis}
              onChange={(e: any) => setNoteDiagnosis(e.target.value)}
            ></textarea>
          </div>
        </div>
      </div>


    )
  }

  return (
    <Layout>
      <section className="diagnostic-report">
        <div className="container">
          <div className="d-flex justify-content-between mb-3">
            <h3 className="fw-bold">Appointment Details</h3>
            <div>
              <button className="button button--small button--primary me-2">Arrived</button>
              <button className="button button--small button--danger--outline me-2">No Show</button>
              <button className="button button--small button--danger">Cancel</button>
            </div>
          </div>

          <div className="row g-3">
            <div className="col-6 g-3">
              <div className="box p-3">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Patient details</h5>
                  <Link className="text-uppercase" to="">view full medial record</Link>
                </div>
                <div className="d-flex g-3">
                  <div>
                    <img src={USER} alt="" />
                  </div>
                  <div>
                    <p><span className="fw-bold">Name: </span></p>
                    <p><span className="fw-bold">Gender: </span></p>
                    <p><span className="fw-bold">Date of birth: </span></p>
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
                  <h5 className="fw-bold">Booking details</h5>
                </div>
                <div>
                  <p><span className="fw-bold">Location: </span></p>
                  <p><span className="fw-bold">Appointment Date: </span></p>
                  <p><span className="fw-bold">Appointment Time: </span></p>
                  <p><span className="fw-bold">Doctor: </span></p>
                  <p><span className="fw-bold">Specialty: </span></p>
                  <p><span className="fw-bold">Appointment Type: </span></p>
                  <p><span className="fw-bold">Appointment Status: </span></p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-4">
            <h5 className="fw-bold">Appointment Result</h5>
            <div className="box">
              {_renderAppointmentHeader()}
              <div className="appointment-container-body p-3">
                {isPassStep1 ? _renderStep2() : _renderStep1()}
              </div>
              {_renderAppointmentFooter()}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default memo(DiagnosticReport);
