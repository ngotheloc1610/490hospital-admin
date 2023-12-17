import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { ICON_PENCIL, ICON_TRASH, USER } from "../../assets";
import { useParams } from "react-router-dom";
import { FORMAT_DATE, TOTAL_STEP } from "../../constants/general.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import axios from "axios";
import { API_DIAGNOSTIC_BMI, API_DIAGNOSTIC_BODY_SITE, API_DIAGNOSTIC_BOOK_DETAIL, API_DIAGNOSTIC_CATEGORY, API_DIAGNOSTIC_CONDITION, API_DIAGNOSTIC_CONDITION_BY_PATIENT, API_DIAGNOSTIC_CREATE_DIAGNOSTIC, API_DIAGNOSTIC_PATIENT_PROFILE } from "../../constants/api.constant";
import moment from "moment";
import { ALERT_STATUS, BLOOD_GLUCOSE, BLOOD_PRESSURE, BMI, HEART_RATE, TEMPERATURE } from "../../constants";
import PopUpArrived from "../../components/common/PopupArrvied";
import PopUpNoShow from "../../components/common/PopupNoShow";
import PopUpDeny from "../../components/common/PopUpDeny";
import Select from 'react-select'
import { warn } from "../../Common/notify";
import { useAppSelector } from "../../redux/hooks";

const DiagnosticReport = () => {

  const url_api = process.env.REACT_APP_API_URL;

  const params = useParams();
  const { triggerArrived, triggerDeny, triggerNoShow, appointment } = useAppSelector(state => state.appointmentSlice)
  const { idEncounter } = useAppSelector(state => state.diagnosticSlice)

  const [step, setStep] = useState<number>(1);

  const [isPassStep1, setIsPassStep1] = useState<boolean>(false);

  const [listCondition, setListCondition] = useState<any>([]);
  const [listBodySite, setListBodySite] = useState<any>([]);
  const [listDiagnosis, setListDiagnosis] = useState<any>([]);
  const [listCategory, setListCategory] = useState<any>([]);

  const [bloodPressures, setBloodPressures] = useState<any>([]);
  const [bloodGlucoses, setBloodGlucoses] = useState<any>([]);
  const [heartRates, setHeartRates] = useState<any>([]);
  const [bmis, setBMIs] = useState<any>([]);
  const [temperatures, setTemperatures] = useState<any>([]);

  const [finalDiagnosis, setFinalDiagnosis] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [noteDiagnosis, setNoteDiagnosis] = useState<string>("");

  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);

  const [indexBloodPressure1, setIndexBloodPressure1] = useState<number>(0)
  const [indexBloodPressure2, setIndexBloodPressure2] = useState<number>(0)
  const [indexBloodGlucose, setIndexBloodGlucose] = useState<number>(0)
  const [indexHeartRate, setIndexHeartRate] = useState<number>(0)
  const [indexTemperature, setIndexTemperature] = useState<number>(0)
  const [indexBMI, setIndexBMI] = useState<number>(0);

  const [isShowPopUpArrived, setIsShowPopUpArrived] = useState<boolean>(false);
  const [isShowPopUpNoShow, setIsShowPopUpNoShow] = useState<boolean>(false);
  const [isShowPopUpCancel, setIsShowPopUpCancel] = useState<boolean>(false);

  const [listCurrentCondition, setListCurrentCondition] = useState<any>([{
    condition: "",
    bodySite: "",
    severity: "",
    recordedDate: "",
    note: "",
  }])

  const [listExtraCondition, setListExtraCondition] = useState([{
    condition: "",
    bodySite: "",
    severity: "",
    recordedDate: "",
    note: "",
  }])

  const [bookingDetail, setBookingDetail] = useState<any>({
    appointmentDate: "",
    time: "",
    typeOfAppointment: "",
    nameDoctor: "",
    specialty: "",
    room: "",
    appointmentStatus: ""
  })
  const [patientDetail, setPatientDetail] = useState<any>(null);
  const [listPreviousEncounter, setListPreviousEncounter] = useState<any>([]);

  useEffect(() => {
    getCondition()
    getBodySite()
    getCategory()
  }, [])

  useEffect(() => {
    if (params.encounterId) {
      getPreviousEncounter(params.encounterId)
    }
  }, [params.encounterId])

  useEffect(() => {
    if (appointment?.idAppointment) {
      getProfilePatient(appointment?.idAppointment)
      getBookingDetail(appointment?.idAppointment)
    }
  }, [appointment?.idAppointment])

  useEffect(() => {
    if (appointment?.idAppointment) {
      getBookingDetail(appointment?.idAppointment)
    }
  }, [triggerArrived, triggerDeny, triggerNoShow])

  useEffect(() => {
    if (height !== 0 && weight !== 0) {
      calcBMI()
    }
  }, [height, weight])

  const handleSubmit = () => {
    if (!indexBMI || !indexBloodGlucose || !indexBloodPressure1 || !indexBloodPressure2 || !indexHeartRate || !indexTemperature
    ) {
      warn("Vui lòng điền đủ hết chỉ số bệnh nhân!");
      return;
    }

    createDiagnostic()
  }

  const handleChangeBloodPressures = (values: any) => {
    setBloodPressures(values || []);
  };
  const handleChangeBloodGlucoses = (values: any) => {
    setBloodGlucoses(values || []);
  };
  const handleChangeHeartRates = (values: any) => {
    setHeartRates(values || []);
  };
  const handleChangeTemperatures = (values: any) => {
    setTemperatures(values || []);
  };
  const handleChangeBMIs = (values: any) => {
    setBMIs(values || []);
  };

  const createDiagnostic = () => {
    const url = `${url_api}${API_DIAGNOSTIC_CREATE_DIAGNOSTIC}`;

    let extraConditions: any = []
    let currentConditions: any = []
    let interpretationBloodPressure: any = [];
    let interpretationBloodGlucose: any = [];
    let interpretationHeartRate: any = [];
    let interpretationTemperature: any = [];
    let interpretationBMI: any = [];

    bloodPressures.forEach((item: any) => interpretationBloodPressure.push(item.value))
    temperatures.forEach((item: any) => interpretationTemperature.push(item.value))
    heartRates.forEach((item: any) => interpretationHeartRate.push(item.value))
    bloodGlucoses.forEach((item: any) => interpretationBloodGlucose.push(item.value))
    bmis.forEach((item: any) => interpretationBMI.push(item.value))

    let listObservation: any = [
      {
        codeObseDisplay: "Blood Pressure",
        effectiveDateTime: null,
        componentCode: [`Systolic Blood Pressure/${indexBloodPressure1}`, `Diastolic Blood Pressure/${indexBloodPressure2}`],
        interpretation: interpretationBloodPressure
      },

      {
        codeObseDisplay: "Blood Glucose",
        effectiveDateTime: null,
        componentCode: [`Blood Glucose/${indexBloodGlucose}`],
        interpretation: interpretationBloodGlucose
      },
      {
        codeObseDisplay: "Temperature",
        effectiveDateTime: null,
        componentCode: [`Temperature/${indexTemperature}`],
        interpretation: interpretationTemperature
      },
      {
        codeObseDisplay: "Heart Rate",
        effectiveDateTime: null,
        componentCode: [`Heart Rate/${indexHeartRate}`],
        interpretation: interpretationHeartRate
      },
      {
        codeObseDisplay: "BMI",
        effectiveDateTime: null,
        componentCode: [`Weight/${weight}`, `Height/${height}`],
        interpretation: interpretationBMI
      },
    ]

    listCurrentCondition.forEach((item: any) => currentConditions.push({
      type: "Normal",
      severity: item.severity,
      codeDisplay: item.condition,
      bodySite: item.bodySite,
      encounterId: params.encounterId,
      recordedDate: new Date(item.recordedDate).toISOString,
      noteText: item.note,
      createAt: new Date().toISOString()
    }))

    listExtraCondition.forEach((item: any) => extraConditions.push({
      type: "Extra",
      severity: item.severity,
      codeDisplay: item.condition,
      bodySite: item.bodySite,
      encounterId: params.encounterId,
      recordedDate: new Date(item.recordedDate).toISOString,
      noteText: item.note,
      createAt: new Date().toISOString()
    }))

    const rqParams = {
      IdEncounter: params.encounterId ? params.encounterId : idEncounter,
      subjectReferencePatient: patientDetail.id,
      subjectDisplay: patientDetail?.nameFirstRep?.text,
      categoryDisplay: category,
      codeDiaDisplay: finalDiagnosis,
      noteDia: noteDiagnosis,
      conditionListTransfers: [...extraConditions, ...currentConditions],
      observationListTransfers: [...listObservation],

    }

    axios
      .post(url, rqParams, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
        }
      })
      .catch((err: any) => {
        console.log("error create diagnostic:", err);
      });
  }

  const calcBMI = () => {
    const url = `${url_api}${API_DIAGNOSTIC_BMI}`;

    const params = {
      weight: weight,
      height: height
    }

    axios
      .get(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          setIndexBMI(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error calc bmi for patient:", err);
      });
  }


  const getCondition = () => {
    const url = `${url_api}${API_DIAGNOSTIC_CONDITION}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListCondition(resp.data);
          setListDiagnosis(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get condition:", err);
      });
  }

  const getBodySite = () => {
    const url = `${url_api}${API_DIAGNOSTIC_BODY_SITE}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListBodySite(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get body site:", err);
      });
  }

  const getCategory = () => {
    const url = `${url_api}${API_DIAGNOSTIC_CATEGORY}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListCategory(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get category:", err);
      });
  }

  const getProfilePatient = (idAppointment: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_PATIENT_PROFILE}${idAppointment}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setPatientDetail(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get encounter by appointment:", err);
      });
  }

  const getBookingDetail = (idAppointment: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_BOOK_DETAIL}${idAppointment}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setBookingDetail(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get encounter by appointment:", err);
      });
  }

  const getPreviousEncounter = (encounterId: string) => {
    const url = `${url_api}${API_DIAGNOSTIC_CONDITION_BY_PATIENT}${encounterId}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListPreviousEncounter(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get encounter by appointment:", err);
      });
  }

  const _renderListCondition = () => {
    return (
      <>
        <option hidden>Select a condition</option>
        {listCondition ? (
          listCondition.map((item: any) => (
            <option value={item.code} key={item.code}>
              {item.display}
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
        {
          ALERT_STATUS.map((item: any) => (
            <option value={item.value} key={item.value}>
              {item.title}
            </option>
          ))
        }
      </>
    );
  };

  const _renderListBodySite = () => {
    return (
      <>
        <option hidden>Select a body site</option>
        {listBodySite ? (
          listBodySite.map((item: any) => (
            <option value={item.code} key={item.code}>
              {item.display}
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
            <option value={item.display} key={item.code}>
              {item.display}
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
            <option value={item.display} key={item.code}>
              {item.display}
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
              className="button button--primary button--small"
              onClick={() => handleSubmit()}
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

  const _renderStep1 = () => {
    return (
      <div>
        <div className="row g-3 box mt-1">
          <div className="col-6">
            <div className="d-flex mb-2">
              <label htmlFor="bloodPressure" className="my-auto fw-bold">
                Blood Pressure:
              </label>
              <div className="ms-2">
                <input type="number" className="input-small" value={indexBloodPressure1} onChange={(e: any) => setIndexBloodPressure1(e.target.value)} />
                <span> / </span>
                <input type="number" className="input-small" value={indexBloodPressure2} onChange={(e: any) => setIndexBloodPressure2(e.target.value)} />
                <span className="ms-1">mmHg</span>
              </div>
            </div>
            <Select
              options={BLOOD_PRESSURE}
              isMulti
              onChange={handleChangeBloodPressures}
              value={bloodPressures}
              placeholder="-- Additional Conditions (if applicable)"
            />
          </div>
          <div className="col-6">
            <div className="d-flex mb-2">
              <label htmlFor="temperature" className="my-auto fw-bold">
                Temperature:
              </label>
              <div className="ms-2">
                <input type="number" className="input-small" value={indexTemperature} onChange={(e: any) => setIndexTemperature(e.target.value)} />
                <span className="ms-1">&deg;C</span>
              </div>
            </div>
            <Select
              options={TEMPERATURE}
              isMulti
              onChange={handleChangeTemperatures}
              value={temperatures}
              placeholder="-- Additional Conditions (if applicable)"
            />
          </div>
          <div className="col-6">
            <div className="d-flex mb-2">
              <label htmlFor="bloodGlucose" className="my-auto fw-bold">
                Blood Glucose:
              </label>
              <div className="ms-2">
                <input type="number" className="input-small" value={indexBloodGlucose} onChange={(e: any) => setIndexBloodGlucose(e.target.value)} />
                <span className="ms-1">mmol/L</span>
              </div>
            </div>
            <Select
              options={BLOOD_GLUCOSE}
              isMulti
              onChange={handleChangeBloodGlucoses}
              value={bloodGlucoses}
              placeholder="-- Additional Conditions (if applicable)"
            />
          </div>
          <div className="col-6">
            <div className="d-flex mb-2">
              <label htmlFor="bmi" className="my-auto fw-bold">
                Body Mass Index (BMI):
              </label>
              <div className="d-flex justify-content-between ms-3">
                <div className="me-3">
                  <input type="text" value={indexBMI} disabled className="input-small" />
                </div>

                <div className="d-flex">
                  <div className="me-3">
                    <span className="me-2">Weight:</span>
                    <input type="number" value={weight} onChange={(e: any) => setWeight(e.target.value)} className="input-small" />
                    <span className="ms-1">kg</span>
                  </div>

                  <div>
                    <span className="me-2">Height:</span>
                    <input type="number" value={height} onChange={(e: any) => setHeight(e.target.value)} className="input-small" />
                    <span className="ms-1">cm</span>
                  </div>
                </div>
              </div>
            </div>
            <Select
              options={BMI}
              isMulti
              onChange={handleChangeBMIs}
              value={bmis}
              placeholder="-- Additional Conditions (if applicable)"
            />
          </div>
          <div className="col-12 mb-3">
            <div className="d-flex mb-2">
              <label htmlFor="heartRate" className="my-auto fw-bold">
                Heart Rate:
              </label>
              <div className="ms-2">
                <input type="number" className="input-small" value={indexHeartRate} onChange={(e: any) => setIndexHeartRate(e.target.value)} />
                <span className="ms-1">bpm</span>
              </div>
            </div>
            <Select
              options={HEART_RATE}
              isMulti
              onChange={handleChangeHeartRates}
              value={heartRates}
              placeholder="-- Additional Conditions (if applicable)"
            />
          </div>
        </div>

        <div className="mt-3 box p-3">
          <div className="d-flex justify-content-between">
            <p className="fw-bold my-auto">
              Reported conditions (Problem list and Previous Encounter)
            </p>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Condition Name</th>
                <th scope="col">Body site</th>
                <th scope="col">Severity</th>
                <th scope="col">Clinical Status</th>
                <th scope="col">Onset</th>
                <th scope="col">Recorded date</th>
                <th scope="col">Note</th>
                <th scope="col">Encounter</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {listPreviousEncounter && listPreviousEncounter.length > 0 && listPreviousEncounter.map((item: any, idx: number) => {
                return (
                  <tr>
                    <td>{item?.conditionName}</td>
                    <td>{item?.bodySite}</td>
                    <td>{item?.severity}</td>
                    <td>{item?.clinicalStatus}</td>
                    <td>{item?.onset}</td>
                    <td>{item.recordedDate ? moment(item.recordedDate).format(FORMAT_DATE) : ""}</td>
                    <td>{item?.note}</td>
                    <td>{item.encounterDate ? moment(item.encounterDate).format(FORMAT_DATE) : ""}</td>
                    <td>
                      <span className="ms-1 cursor-pointer">
                        <ICON_PENCIL />
                      </span>
                      <span className="ms-1 cursor-pointer">
                        <ICON_TRASH />
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const _renderStep2 = () => {
    return (
      <div>
        <div className="box mb-3">
          <h6 className="fw-bold p-3">Current Condition</h6>
          {listCurrentCondition.map((item: any, idx: number) => {
            return (
              <div className="row g-3 px-3 mb-3">
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`condition${idx}`} className="my-auto fw-bold">
                      Condition
                    </label>
                    <select
                      className="form-select"
                      id={`condition${idx}`}
                      onChange={(e: any) => {
                        const updatedList = [...listCurrentCondition];
                        updatedList[idx].condition = e.target.value;
                        setListCurrentCondition(updatedList);
                      }}
                      value={item.condition}
                    >
                      {_renderListCondition()}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`bodySite${idx}`} className="my-auto fw-bold">
                      Body Site
                    </label>
                    <select
                      className="form-select"
                      id={`bodySite${idx}`}
                      onChange={(e: any) => {
                        const updatedList = [...listCurrentCondition];
                        updatedList[idx].bodySite = e.target.value;
                        setListCurrentCondition(updatedList);
                      }}
                      value={item.bodySite}
                    >
                      {_renderListBodySite()}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`severity${idx}`} className="my-auto fw-bold">
                      Severity
                    </label>
                    <select
                      className="form-select"
                      id={`severity${idx}`}
                      onChange={(e: any) => {
                        const updatedList = [...listCurrentCondition];
                        updatedList[idx].severity = e.target.value;
                        setListCurrentCondition(updatedList);
                      }}
                      value={item.severity}
                    >
                      {_renderListSeverity()}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`recordedDate${idx}`} className="my-auto fw-bold">
                      Recorded Date
                    </label>
                    <input
                      id={`recordedDate${idx}`}
                      type="date"
                      className={`form-control`}
                      value={item.recordedDate}
                      onChange={(e: any) => {
                        const updatedList = [...listCurrentCondition];
                        updatedList[idx].recordedDate = e.target.value;
                        setListCurrentCondition(updatedList);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`note${idx}`} className="fw-bold">Note</label>
                    <textarea
                      className="p-3 rounded w-100"
                      cols={5}
                      rows={5}
                      placeholder="Add notes here"
                      id={`note${idx}`}
                      value={item.note}
                      onChange={(e: any) => {
                        const updatedList = [...listCurrentCondition];
                        updatedList[idx].note = e.target.value;
                        setListCurrentCondition(updatedList);
                      }}
                    ></textarea>
                  </div>
                </div>
                <div className="col-12">
                  <button className="button button--smaller button--primary d-block ms-auto" onClick={() => {
                    const updatedList = [...listCurrentCondition];
                    updatedList.splice(idx, 1);
                    setListCurrentCondition(updatedList);
                  }}><span className="text-white"><ICON_TRASH /></span></button>
                </div>
              </div>
            )
          })}

          <div className="p-3">
            <button className="button button--outline button--smaller" onClick={() => setListCurrentCondition([...listCurrentCondition, {
              condition: "",
              bodySite: "",
              severity: "",
              recordedDate: "",
              note: "",
            }])}><i className="bi bi-plus-circle me-2"></i> Add new condition</button>
          </div>
        </div>

        <div className="box mb-3">
          <h6 className="fw-bold p-3">Extra Condition</h6>
          {listExtraCondition.map((item: any, idx: number) => {
            return (
              <div className="row g-3 px-3 mb-3">
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`condition${idx}`} className="my-auto fw-bold">
                      Condition
                    </label>
                    <select
                      className="form-select"
                      id={`condition${idx}`}
                      onChange={(e: any) => {
                        const updatedList = [...listExtraCondition];
                        updatedList[idx].condition = e.target.value;
                        setListExtraCondition(updatedList);
                      }}
                      value={item.condition}
                    >
                      {_renderListCondition()}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`bodySite${idx}`} className="my-auto fw-bold">
                      Body Site
                    </label>
                    <select
                      className="form-select"
                      id={`bodySite${idx}`}
                      onChange={(e: any) => {
                        const updatedList = [...listExtraCondition];
                        updatedList[idx].bodySite = e.target.value;
                        setListExtraCondition(updatedList);
                      }}
                      value={item.bodySite}
                    >
                      {_renderListBodySite()}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`severity${idx}`} className="my-auto fw-bold">
                      Severity
                    </label>
                    <select
                      className="form-select"
                      id={`severity${idx}`}
                      onChange={(e: any) => {
                        const updatedList = [...listExtraCondition];
                        updatedList[idx].severity = e.target.value;
                        setListExtraCondition(updatedList);
                      }}
                      value={item.severity}
                    >
                      {_renderListSeverity()}
                    </select>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`recordedDate${idx}`} className="my-auto fw-bold">
                      Recorded Date
                    </label>
                    <input
                      id={`recordedDate${idx}`}
                      type="date"
                      className={`form-control`}
                      value={item.recordedDate}
                      onChange={(e: any) => {
                        const updatedList = [...listExtraCondition];
                        updatedList[idx].recordedDate = e.target.value;
                        setListExtraCondition(updatedList);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <label htmlFor={`note${idx}`} className="fw-bold">Note</label>
                    <textarea
                      className="p-3 rounded w-100"
                      cols={5}
                      rows={5}
                      placeholder="Add notes here"
                      id={`note${idx}`}
                      value={item.note}
                      onChange={(e: any) => {
                        const updatedList = [...listExtraCondition];
                        updatedList[idx].note = e.target.value;
                        setListExtraCondition(updatedList);
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-12">
                  <button className="button button--smaller button--primary d-block ms-auto" onClick={() => {
                    const updatedList = [...listExtraCondition];
                    updatedList.splice(idx, 1);
                    setListExtraCondition(updatedList);
                  }}><span className="text-white"><ICON_TRASH /></span></button>
                </div>
              </div>
            )
          })}

          <div className="p-3">
            <button className="button button--outline button--smaller" onClick={() => setListExtraCondition([...listExtraCondition, {
              condition: "",
              bodySite: "",
              severity: "",
              recordedDate: "",
              note: "",
            }])}><i className="bi bi-plus-circle me-2"></i> Add new condition</button>
          </div>
        </div>

        <div className="box">
          <div className="row g-3 p-3">
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="diagnosis" className="my-auto fw-bold">
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
                <label htmlFor="category" className="my-auto fw-bold">
                  Category<span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="category"
                  onChange={(e: any) => setCategory(e.target.value)}
                  value={category}
                >
                  {_renderListCategory()}
                </select>
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <label htmlFor="noteDiagnosis" className="my-auto fw-bold ">
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
        </div>

      </div>
    )
  }

  return (
    <Layout>
      <section className="diagnostic-report mt-3">
        <div className="container">
          <div className="d-flex justify-content-between mb-3">
            <h3 className="fw-bold">Appointment Details</h3>
            <div>
              {bookingDetail?.appointmentStatus.toLowerCase() !== "arrived" && <button className="button button--small button--primary me-2" onClick={() => { setIsShowPopUpArrived(true) }}>Arrived</button>}
              {(bookingDetail?.appointmentStatus.toLowerCase() !== "arrived" || bookingDetail?.appointmentStatus.toLowerCase() !== "cancel") && <>
                <button className="button button--small button--danger--outline me-2" onClick={() => { setIsShowPopUpNoShow(true) }}>No Show</button>
                <button className="button button--small button--danger" onClick={() => { setIsShowPopUpCancel(true) }}>Cancel</button>
              </>}
            </div>
          </div>

          <div className="row g-3">
            <div className="col-6 g-3">
              <div className="box p-3">
                <div className="d-flex justify-content-between">
                  <h5 className="fw-bold">Patient details</h5>
                  {/* <Link className="text-uppercase" to="">view full medial record</Link> */}
                </div>
                <div className="d-flex g-3">
                  <div className="w-25 me-3">
                    <img src={patientDetail?.photo[0]?.url ? patientDetail?.photo[0]?.url : USER} alt="img patient" className="w-100 h-100 object-fit-cover" />
                  </div>
                  <div>
                    <p><span className="fw-bold">Name: </span><span>{patientDetail && patientDetail?.nameFirstRep?.text}</span></p>
                    <p><span className="fw-bold">Gender: </span><span>{patientDetail && patientDetail?.gender}</span></p>
                    <p><span className="fw-bold">Date of birth: </span><span>{patientDetail && moment(patientDetail?.birthDate).format(FORMAT_DATE)}</span></p>
                    <p><span className="fw-bold">Address: </span><span>{patientDetail && patientDetail?.addressFirstRep?.text}</span></p>
                    <p><span className="fw-bold">Citizen identification: </span><span>{patientDetail && patientDetail?.identifierFirstRep?.value}</span></p>
                    <p><span className="fw-bold">Phone number: </span><span>{patientDetail && patientDetail?.telecom.filter((item: any) => item.system === "phone")[0]?.value}</span></p>
                    <p><span className="fw-bold">Email: </span><span>{patientDetail && patientDetail?.telecom.filter((item: any) => item.system === "email")[0]?.value}</span></p>
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
                  <p><span className="fw-bold">Appointment Date: </span><span>{bookingDetail.appointmentDate}</span></p>
                  <p><span className="fw-bold">Appointment Time: </span><span>{bookingDetail.time}</span></p>
                  <p><span className="fw-bold">Doctor: </span><span>{bookingDetail.nameDoctor}</span></p>
                  <p><span className="fw-bold">Specialty: </span><span>{bookingDetail.specialty}</span></p>
                  <p><span className="fw-bold">Room: </span><span>{bookingDetail.room}</span></p>
                  <p><span className="fw-bold">Appointment Type: </span><span>{bookingDetail.typeOfAppointment}</span></p>
                  <p><span className="fw-bold">Appointment Status: </span><span>{bookingDetail.appointmentStatus}</span></p>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-4">
            <h5 className="fw-bold">Appointment Result</h5>
            {bookingDetail?.appointmentStatus.toLowerCase() === "arrived" ? <div className="box">
              {_renderAppointmentHeader()}
              <div className="appointment-container-body p-3">
                {isPassStep1 ? _renderStep2() : _renderStep1()}
              </div>
              {_renderAppointmentFooter()}
            </div> : <div className="text-danger text-reset">
              No result appointment
            </div>}

          </div>
        </div>
      </section>

      {isShowPopUpArrived && <PopUpArrived handleShowPopUp={setIsShowPopUpArrived} />}
      {isShowPopUpNoShow && <PopUpNoShow handleShowPopUp={setIsShowPopUpNoShow} />}
      {isShowPopUpCancel && <PopUpDeny handleShowPopUp={setIsShowPopUpCancel} />}
    </Layout>
  );
};

export default DiagnosticReport;
