import { useCallback, useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/Layout";
import { FORMAT_DATE, FORMAT_DATE_DEFAULT, FORMAT_DATE_TIME, TOTAL_STEP } from "../../constants/general.constant";
import { useAppSelector } from "../../redux/hooks";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import { error, warn } from "../../Common/notify";
import { API_CREATE_APPOINTMENT, API_GET_DOCTOR_APPOINTMENT, API_GET_PATIENT_APPOINTMENT, API_GET_SPECIALTY_APPOINTMENT, API_SCHEDULE_GET_APPOINTMENT } from "../../constants/api.constant";
import { LIST_TIME, TYPE_OF_APPOINTMENT } from "../../constants";
import { ICON_GRADUATION, ICON_PEOPLE_TEAM, USER } from "../../assets";

const BookAppointment = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const { isLogin } = useAppSelector((state) => state.authSlice)
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);

  const [isBooking, setIsBooking] = useState<boolean>(false);
  const [isPassStep1, setIsPassStep1] = useState<boolean>(false);
  const [triggerTime, setTriggerTime] = useState<boolean>(false);

  const [listSpecialty, setListSpecialty] = useState<any>([]);
  const [listDoctor, setListDoctor] = useState([]);
  const [listPatient, setListPatient] = useState([]);

  const [patient, setPatient] = useState<any>({});

  const [date, setDate] = useState<string>(moment().format(FORMAT_DATE_DEFAULT));
  const [startTime, setStartTime] = useState<string>("")
  const [endTime, setEndTime] = useState<string>("")

  const [startDate, setStartDate] = useState<string>(
    moment(`${date} ${startTime}`).format(FORMAT_DATE_TIME)
  );
  const [endDate, setEndDate] = useState<string>(
    moment(`${date} ${endTime}`).format(FORMAT_DATE_TIME)
  );

  const [timeBusy, setTimeBusy] = useState<any>([]);
  const [specialty, setSpecialty] = useState<string>("");
  const [typeOfAppointment, setTypeOfAppointment] = useState<string>("");
  const [doctor, setDoctor] = useState<any>();
  const [description, setDescription] = useState<string>("");
  const [namePatient, setNamePatient] = useState<string>("");

  useEffect(() => {
    getSpecialty();
  }, [])

  useEffect(() => {
    if (specialty) {
      getDoctor(specialty);
    }
  }, [specialty])

  useEffect(() => {
    if (date && doctor?.id) {
      getSlot(doctor?.id, date);
    }
  }, [date, doctor])

  useEffect(() => {
    setStartDate(moment(`${date} ${startTime}`).format(FORMAT_DATE_TIME));
    setEndDate(moment(`${date} ${endTime}`).format(FORMAT_DATE_TIME));
  }, [startTime, endTime, date]);

  const getPatient = () => {
    const url = `${url_api}${API_GET_PATIENT_APPOINTMENT}`;

    axios.get(url, defineConfigGet({ namePatient: namePatient })).then((resp: any) => {
      if (resp) {
        setListPatient(resp.data);
      }
    }).catch((err: any) => {
      console.log("error get list patient:", err)
    })
  }

  const getSpecialty = () => {
    const url = `${url_api}${API_GET_SPECIALTY_APPOINTMENT}`;

    axios.get(url, defineConfigPost()).then((resp: any) => {
      if (resp) {
        setListSpecialty(resp.data);
      }
    }).catch((err: any) => {
      console.log("error get specialty:", err)
    })
  }

  const getDoctor = (specialty: string) => {
    const url = `${url_api}${API_GET_DOCTOR_APPOINTMENT}`;

    axios.get(url, defineConfigGet({ specialtyName: specialty })).then((resp: any) => {
      if (resp) {
        setListDoctor(resp.data);
      }
    }).catch((err: any) => {
      console.log("error get list doctor for specialty:", err)
    })
  }

  const getSlot = (doctorId: any, date: string) => {
    const url = `${url_api}${API_SCHEDULE_GET_APPOINTMENT}`;

    axios.get(url, defineConfigGet({ doctorID: doctorId, date: new Date(date).toISOString() })).then((resp: any) => {
      if (resp) {
        setTimeBusy(resp.data)
      }
    }).catch((err: any) => {
      console.log("error get scheduler for doctor:", err)
    })
  }

  const createAppointment = () => {
    const url = `${url_api}${API_CREATE_APPOINTMENT}`;

    const params = {
      identifier: [],
      status: "No Show",
      cancellationReason: null,
      cancellationDate: null,
      serviceCategory: [],
      serviceType: [],
      specialty: [{
        coding: [
          {
            system: null,
            code: listSpecialty.filter((item: any) => item.name === specialty)[0].code,
            display: specialty
          }
        ]
      }],
      appointmentType: {
        coding: [
          {
            system: null,
            code: typeOfAppointment,
            display: null
          }
        ]
      },
      reasonCode: [],
      reasonReference: [],
      priority: 0,
      description: description,
      supportingInformation: [],
      start: new Date(startDate).toISOString(),
      end: new Date(endDate).toISOString(),
      minutesDuration: 0,
      created: new Date().toISOString(),
      comment: "",
      patientInstruction: [],
      basedOn: [],

      participant: [
        {
          actor: {
            reference: `Patient/${patient?.id}`,
            identifier: {
              value: patient?.id
            },
            display: patient?.nameFirstRep?.text
          },
          status: "Accepted"
        },
        {
          actor: {
            reference: `Practitioner/${doctor?.id}`,
            identifier: {
              value: doctor?.id
            },
            display: doctor?.practitionerTarget?.nameFirstRep.text
          },
          status: "Accepted"
        }
      ],
      requestedPeriod: null,
      slot: []
    }

    axios.post(url, params, defineConfigPost()).then((resp: any) => {
      if (resp) {
        setIsBooking(true);
      }
    }).catch((err: any) => {
      setIsBooking(false);
      error(err.response.data.error);
      console.log("error book appointment:", err)
    })
  }

  const handleNext = () => {
    if (patient && typeOfAppointment && specialty && doctor && date && startTime && endTime) {
      setIsPassStep1(true);
      setStep(step + 1);
    } else {
      warn("Chưa điền hết thông tin!");
    }
  };

  const handleBook = () => {
    if (isLogin) {
      createAppointment();
    } else {
      warn("Bạn chưa đăng nhập! Vui lòng đăng nhập trước khi book lịch");
    }
  };

  const handleCancel = () => {
    setIsPassStep1(false);
    setStep(step - 1);
  };

  const handleSearchPatient = () => {
    getPatient()
  }

  const disabled = (item: any) => {
    if (timeBusy.length > 0) {
      const existedBusy = timeBusy.find((time: any) => {
        return moment(time.start).format("HH:mm:ss") === item.startTime && moment(time.end).format("HH:mm:ss") === item.endTime;
      })

      if (existedBusy) {
        return true;
      }
      return false;
    }
    return false;
  }

  const _renderTimeBook = useCallback(
    () => {
      return (
        <div className="col-9">
          <label className="mb-3 fw-bold">Select a timeslot</label>
          <span className="ms-3 fw-light fst-italic">Duration 60 mins</span>
          <div className="row g-3">
            {LIST_TIME.map((item: any, idx: number) => {
              return (
                <div className="col-4">
                  <button type="button" className={`w-100 p-3 ${startTime === item.startTime && endTime === item.endTime ? "time-selected" : ""}`}
                    onClick={() => { setStartTime(item.startTime); setEndTime(item.endTime); setTriggerTime(!triggerTime) }}
                    disabled={disabled(item)}
                  >
                    {item.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    [triggerTime, timeBusy],
  )

  const _renderListSpecialty = () => {
    return (
      <>
        <option hidden>Select Specialty</option>
        {listSpecialty ? (
          listSpecialty.map((item: any) => (
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

  const _renderListTypeOfAppointment = () => {
    return (
      <>
        <option hidden>Type of appointment</option>
        {
          TYPE_OF_APPOINTMENT.map((item: any) => (
            <option value={item.code} key={item.code}>
              {item.display}
            </option>
          ))
        }
      </>
    )
  }

  const _renderAppointmentHeader = () => {
    return (
      <div className="appointment-container-header">
        <p>
          <span className="appointment-step">
            STEP {step}/{TOTAL_STEP}
          </span>
          <span> - </span>
          <span className="fw-bold">
            {step === 2 ? "CONFIRMATION" : "APPOINTMENT INFORMATION"}
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
              className="button button--primary button--small me-3"
              onClick={() => handleBook()}
            >
              Book
            </button>
            <button
              className="button button--gray button--small"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="button button--primary button--small d-block m-auto"
            onClick={() => handleNext()}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  const _renderStep1 = () => {
    return (
      <div className="container">
        <div className="border-bottom pb-3">
          <h5 className="mb-3 fw-bold">Patient Details</h5>
          <div className="row m-auto" style={{ width: "70%" }}>
            <div className="col-8 d-flex justify-content-between">
              <label htmlFor="patient">Select Patient </label>
              <div className="input-group mb-3" style={{ width: "70%" }}>
                <input type="text" className="form-control" id="patient" placeholder="Enter patient name or patient email" value={namePatient} onChange={(e: any) => setNamePatient(e.target.value)} />
              </div>
            </div>
            <div className="col-4">
              <button className="button button--primary button--small" onClick={() => handleSearchPatient()}>Apply</button>
            </div>
          </div>

          <div>
            {listPatient.length > 0 && <table className="table table-striped">
              <thead className="table-light">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Date of Birth</th>
                  <th scope="col">Phone number</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {listPatient.map((item: any, idx: number) => {
                  const email = item.telecom?.find(
                    (i: any) => i?.system === "email"
                  )?.value;
                  const phone = item.telecom?.find(
                    (i: any) => i?.system === "phone"
                  )?.value;

                  return (
                    <tr className={`${idx % 2 === 1 ? "table-light" : ""} ${patient?.id === item.id ? "table-dark" : ""}`} onClick={() => { setPatient(item); }}>
                      <td >
                        {item.nameFirstRep.text}
                      </td>
                      <td >{item.gender}</td>
                      <td >{item.birthDate}</td>
                      <td >
                        {phone}
                      </td>
                      <td >{email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>}

          </div>
        </div>

        <div className="mt-3">
          <h5 className="mb-3 fw-bold">Booking details</h5>
          <div className="m-auto" style={{ width: "70%" }}>
            <div className="d-flex justify-content-between mb-4">
              <label htmlFor="typeOfAppointment" className="my-auto">Type of appointment</label>
              <select
                style={{ width: "75%" }}
                className="form-select"
                id="typeOfAppointment"
                onChange={(e: any) => setTypeOfAppointment(e.target.value)}
                value={typeOfAppointment}
              >
                {_renderListTypeOfAppointment()}
              </select>
            </div>

            <div className="d-flex justify-content-between">
              <label htmlFor="specialty" className="my-auto">Select specialty</label>
              <select
                style={{ width: "75%" }}
                className="form-select"
                id="specialty"
                onChange={(e: any) => {
                  setSpecialty(e.target.value)
                }}
                value={specialty}
              >
                {_renderListSpecialty()}
              </select>
            </div>
          </div>

          <div className="mt-3">
            <h5 className="fw-bold mb-3">Select Doctor</h5>
            <div className="row">
              {listDoctor && listDoctor.map((item: any, idx: number) => {
                const name = item?.practitioner?.display;
                const photo = item?.practitionerTarget?.photo[0];
                const src = `data:${photo?.contentType};base64,${photo?.data}`;

                return (
                  <div className={`col-6 row mb-3 ${item.id === doctor?.id ? "doctor-selected" : ""}`} onClick={() => setDoctor(item)}>
                    <div className='col-4'>
                      <img src={src} alt="img doctor" />
                    </div>
                    <div className='col-8'>
                      <h3 className='mb-3'>{name}</h3>
                      <p className='ms-3'><span><ICON_GRADUATION /></span>  {item.educations && item.educations.map((edu: any) => {
                        return (
                          <span>{edu.detail}</span>
                        )
                      })}</p>
                      <p className='ms-3'><span><ICON_PEOPLE_TEAM /></span> {item.specialty && item.specialty.map((spec: any) => {
                        return (
                          <span>
                            {spec.coding[0].display}
                          </span>
                        )
                      })}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-3">
            <h5 className="mb-3 fw-bold">Select date and time</h5>

            <div className="row gx-5">
              <div className="col-3">
                <label htmlFor="date" className="mb-3 fw-bold">Choose a date </label>
                <div className="input-group">
                  <input
                    id="date"
                    type="date"
                    className="form-control"
                    autoComplete="new-password"
                    value={date}
                    min={moment().format(FORMAT_DATE_DEFAULT)}
                    max={moment().add(7, 'days').format(FORMAT_DATE_DEFAULT)}
                    onChange={(e: any) => setDate(moment(e.target.value).format(FORMAT_DATE_DEFAULT))}
                  />
                </div>
                <p className="fw-light fst-italic text-center pt-3">See next 7 days</p>
              </div>

              {_renderTimeBook()}

              <div className="col-12 mt-3">
                <label htmlFor="description" className="fw-bold mb-3">Description</label>
                <div className="form-floating">
                  <textarea className="w-100 p-3 rounded" cols={10} rows={10} placeholder="Enter description" id="description" value={description} onChange={(e: any) => setDescription(e.target.value)}></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderStep2 = () => {
    const specialtyCode = listSpecialty.find((item: any) => item.name === specialty)?.code;
    const specialtyDisplay = listSpecialty.find((item: any) => item.name === specialty)?.name;

    return (
      <div className="border border-3 rounded p-3">
        <div className="border-bottom">
          <p className="fw-bold text-uppercase">patient details</p>
          <div className="row">
            <div className="col-3">
              <img src={USER} alt="img patient" />
            </div>
            <div className="col-9">
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Name</td>
                    <td>{patient?.nameFirstRep?.text}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{patient?.gender}</td>
                  </tr>
                  <tr>
                    <td>Date of birth</td>
                    <td>{moment(patient?.birthDate).format(FORMAT_DATE)}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{patient?.addressFirstRep?.text}</td>
                  </tr>
                  <tr>
                    <td>Citizen identification</td>
                    <td>{patient?.identifierFirstRep?.value}</td>
                  </tr>
                  <tr>
                    <td>Phone number</td>
                    <td>{patient?.telecom.filter((item: any) => item.system === "phone")[0]?.value}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{patient?.telecom.filter((item: any) => item.system === "email")[0]?.value}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="mt-5 border-bottom">
          <p className="fw-bold text-uppercase">booking details</p>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>Appointment Date</td>
                <td>{moment(startDate).format("ddd, DD MMM YYYY")}</td>
              </tr>
              <tr>
                <td>Appointment time</td>
                <td>
                  <span>{moment(startDate).format("HH:mm A")}</span> - <span>{moment(endDate).format("HH:mm A")}</span>
                </td>
              </tr>
              <tr>
                <td>Doctor</td>
                <td>{doctor?.practitioner?.display}</td>
              </tr>
              <tr>
                <td>Type of appointment</td>
                <td>{TYPE_OF_APPOINTMENT.find(item => item.code === typeOfAppointment)?.display}</td>
              </tr>
              <tr>
                <td>Specialty</td>
                <td>
                  {"["}<span className="text-info">{specialtyCode}</span>{"]"} {specialtyDisplay && "- "}
                  {specialtyDisplay}</td>
              </tr>
              <tr>
                <td>Room</td>
                <td>
                  {doctor?.location.map((item: any) => item.display)}
                </td>
              </tr>
              <tr>
                <td>Status</td>
                <td><span className="text-warning">No Show</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <label htmlFor="description" className="mb-3 fw-bold">Description</label>
          <div className="form-floating">
            <textarea className="w-100 p-3 rounded" cols={5} rows={5} placeholder="Enter description" id="description" value={description} onChange={(e: any) => setDescription(e.target.value)}></textarea>
          </div>
        </div>
      </div>
    );
  };

  const _renderBookingSuccess = () => {
    return (
      <div className="container booking-success">
        <div className="w-50 m-auto">
          <p className="icon-success mb-3">
            <i className="bi bi-check-lg fs-1"></i>
          </p>
          <h3 className="text-center mb-3">Booking Success</h3>
          <p className="text-center mb-5 text-gray">
            <span className="d-block mb-1">
              Your appointment has been successfully
            </span>
            <span className="d-block mb-1">
              booked, please regularly check your
            </span>
            <span className="d-block mb-1">schedule to keep up with the</span>
            <span className="d-block">appointment time</span>
          </p>
          <button className="button button--large button--primary d-block m-auto" onClick={() => navigate("/appointment")}>
            Return to list appointment
          </button>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <section className="appointment-page container p-5">
        <div className="appointment-container bg-white">
          {isBooking ? (
            _renderBookingSuccess()
          ) : (
            <>
              {_renderAppointmentHeader()}
              <div className="appointment-container-body">
                {isPassStep1 ? _renderStep2() : _renderStep1()}
              </div>
              {_renderAppointmentFooter()}
            </>
          )}
        </div>
      </section>
    </Layout>

  );
};

export default BookAppointment;
