import { useEffect, useRef, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

import { GENDER } from "../../../constants";
import { ICON_TRASH, USER } from "../../../assets";
import { defineConfigGet, defineConfigPost } from "../../../Common/utils";
import axios from "axios";
import { API_ALL_GET_SPECIALTY, API_DETAIL_PRACTITIONER, API_GET_ROOM_BY_SPECIALTY, API_UPDATE_PRACTITIONER } from "../../../constants/api.constant";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { success } from "../../../Common/notify";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  birthday: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  identifier: Yup.string().required("Required"),
  specialty: Yup.string().required("Required"),
  room: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
});

const defaultValue: any = {
  id: "",
  name: "",
  birthday: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  identifier: "",
  specialty: "",
  room: "",
  startDate: "",
  endDate: "",
  education: [{ start: "", end: "", content: "" }],
  specialize: [{ start: "", end: "", content: "" }],
  achievement: [{ start: "", end: "", content: "" }],
};

const CreateEditDoctor = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const params = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);

  const [specialtyList, setListSpecialty] = useState<any>([]);
  const [image, setImage] = useState<any>("");
  const [listRoom, setListRoom] = useState<any>([]);
  const [specialtyId, setSpecialtyId] = useState<string>("");
  const [doctor, setDoctor] = useState<any>(defaultValue);

  useEffect(() => {
    getSpecialty();
  }, [])

  useEffect(() => {
    if (specialtyId) {
      getRoom(specialtyId);
    }
  }, [specialtyId])

  useEffect(() => {
    getDoctorInfo(params.doctorId)
  }, [params.doctorId])

  const getDoctorInfo = (id: string | undefined) => {
    const url = `${url_api}${API_DETAIL_PRACTITIONER}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          const data = resp.data;
          const dataConverted: any = {
            id: data.id,
            name: data.practitioner.display,
            birthday: data.practitionerTarget?.birthDate,
            gender: data.practitionerTarget?.gender,
            phoneNumber: data.practitionerTarget?.telecom.filter((item: any) => item.system === "phone").value,
            email: data.practitionerTarget?.telecom.filter((item: any) => item.system === "email").value,
            address: data.addressFirstRep?.text,
            identifier: data.practitionerTarget?.identifierFirstRep.value,
            specialty: data.specialty[0].coding[0].display,
            startDate: moment(data.period.start).format("YYYY-MM-DD"),
            endDate: moment(data.period.end).format("YYYY-MM-DD"),
            education: [{ time: "", content: "" }],
            specialize: [{ time: "", content: "" }],
            achievement: [{ time: "", content: "" }],
          }
          console.log("dataConverted:", dataConverted)
          setDoctor(dataConverted);
        }
      })
      .catch((err) => {
        console.log("error get info practitioner(Doctor):", err);
      });
  }

  const getSpecialty = () => {
    const url = `${url_api}${API_ALL_GET_SPECIALTY}`;

    axios
      .get(url, defineConfigGet({ page: 0, size: 100 }))
      .then((resp: any) => {
        if (resp) {
          setListSpecialty(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get API list specialty", err);
      });
  }

  const getRoom = (specialtyId: string) => {
    const url = `${url_api}${API_GET_ROOM_BY_SPECIALTY}${specialtyId}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          setListRoom(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get rooms:", err);
      });
  };

  const updatePractitioner = (values: any, actions: any) => {
    const url = `${url_api}${API_UPDATE_PRACTITIONER}${values.id}`;

    const idSpecialty = specialtyList.filter((item: any) => {
      return item.id === values.specialty;
    })[0]?.id;
    console.log(specialtyList.filter((item: any) => {
      return item.id === values.specialty;
    }));
    const displaySpecialty = specialtyList.filter((item: any) => {
      return item.id === values.specialty;
    })[0]?.name;

    const idRoom = listRoom.filter((item: any) => {
      return item.id === values.room;
    })[0]?.id;
    const desRoom = listRoom.filter((item: any) => {
      return item.id === values.room;
    })[0]?.describe;

    let educations: any = [];
    let specializes: any = [];
    let achievements: any = [];

    values.education.forEach((item: any) => educations.push({
      qualificationSystem: "http://example.org/qualifications",
      qualificationCode: "Edu",
      qualificationDisplay: item.content,
      qualificationText: item.content,
      qualificationPeriodStart: new Date(item.start),
      qualificationPeriodEnd: new Date(item.end)
    }))

    values.specialize.forEach((item: any) => specializes.push({
      qualificationSystem: "http://example.org/qualifications",
      qualificationCode: "SpecActivities",
      qualificationDisplay: item.content,
      qualificationText: item.content,
      qualificationPeriodStart: new Date(item.start),
      qualificationPeriodEnd: new Date(item.end)
    }))

    values.achievement.forEach((item: any) => achievements.push({
      qualificationSystem: "http://example.org/qualifications",
      qualificationCode: "Achieve",
      qualificationDisplay: item.content,
      qualificationText: item.content,
      qualificationPeriodStart: new Date(item.start),
      qualificationPeriodEnd: new Date(item.end)
    }))

    const params = {
      username: values.email,
      email: values.email,
      identifier: values.identifier,
      name: values.name,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.birthday,
      photo: null,
      gender: values.gender,
      address: values.address,
      idSpecialty: idSpecialty,
      displaySpecialty: displaySpecialty,
      desRoom: desRoom,
      idRoom: idRoom,
      startWork: new Date(values.startDate),
      endWork: new Date(values.endDate),
      type: "Doctor",
      qualifications: [...educations, ...specializes, ...achievements],
    }

    axios
      .put(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          actions.setSubmitting(false);
          actions.resetForm();
          navigate(`/doctor/overview/${values.id}`);
          success("Update information success!");
        }
      })
      .catch((err) => {
        console.log("error update practitioner (Doctor):", err);
      });
  }

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handlePickImage = () => {
    inputRef.current.click();
  };

  const _renderBasicInfo = (props: any) => {
    const { errors, touched } = props;

    return (
      <div>
        <p className="fw-bold border-top pt-2 text-dark">Basic Information</p>
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="name">
              Name <span className="text-danger">*</span>
            </label>
            <Field
              name="name"
              id="name"
              className={`form-control ${errors?.name && touched?.name ? "is-invalid" : ""
                }`}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="birthday">
              Date of birth <span className="text-danger">*</span>
            </label>
            <Field
              name="birthday"
              id="birthday"
              className="form-control"
              render={({ field }: any) => (
                <input
                  {...field}
                  type="date"
                  className={`form-control input-select ${errors?.birthday && touched?.birthday ? "is-invalid" : ""
                    }`}
                  max="9999-12-31"
                />
              )}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="gender">
              Gender <span className="text-danger">*</span>
            </label>
            <Field
              as="select"
              name="gender"
              id="gender"
              className={`form-select ${errors?.gender && touched?.gender ? "is-invalid" : ""
                }`}
            >
              {GENDER.map((item: any) => (
                <option value={item.code} key={item.code}>
                  {item.name}
                </option>
              ))}
            </Field>
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="address">
              Address <span className="text-danger">*</span>
            </label>
            <Field
              name="address"
              type="text"
              id="address"
              className={`form-control ${errors?.address && touched?.address ? "is-invalid" : ""
                }`}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="identifier">
              Citizen identification <span className="text-danger">*</span>
            </label>
            <Field
              name="identifier"
              type="text"
              id="identifier"
              className={`form-control ${errors?.identifier && touched?.identifier ? "is-invalid" : ""
                }`}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="phoneNumber">
              Phone number <span className="text-danger">*</span>
            </label>
            <Field
              name="phoneNumber"
              id="phoneNumber"
              className={`form-control ${errors?.phoneNumber && touched?.phoneNumber ? "is-invalid" : ""
                }`}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="email">
              Email address <span className="text-danger">*</span>
            </label>
            <Field
              name="email"
              type="email"
              id="email"
              className={`form-control ${errors?.email && touched?.email ? "is-invalid" : ""
                }`}
            />
          </div>
        </div>
      </div>
    );
  };

  const _renderWorkInfo = (props: any) => {
    const { errors, touched, handleChange, setFieldValue } = props;

    return (
      <div className="mt-5">
        <p className="fw-bold border-top pt-2 text-dark">Work Information</p>
        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="specialty">
              Specialty <span className="text-danger">*</span>
            </label>
            <Field
              as="select"
              name="specialty"
              id="specialty"
              className={`form-select ${errors?.specialty && touched?.specialty ? "is-invalid" : ""
                }`}
              onChange={(e: any) => {
                setSpecialtyId(e.target.value);
                setFieldValue("specialty", e.target.value)
              }}
            >
              {specialtyList.length > 0 ? (
                specialtyList.map((item: any) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option disabled>No option</option>
              )}
            </Field>
          </div>

          <div className="col-6">
            <label htmlFor="room" className="form-label">
              Room <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <select
                id="room"
                className={`form-select ${errors?.room && touched?.room ? "is-invalid" : ""}`}
                onChange={handleChange}
              >
                {_renderListRoom()}
              </select>
            </div>
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="startDate">
              Starting date <span className="text-danger">*</span>
            </label>
            <Field
              name="startDate"
              id="startDate"
              className="form-control is-invalid"
              render={({ field }: any) => (
                <input
                  {...field}
                  type="date"
                  className={`form-control input-select ${errors?.startDate && touched?.startDate ? "is-invalid" : ""
                    }`}
                  max="9999-12-31"
                />
              )}
            />
          </div>

          <div className="col-6 mb-3">
            <label htmlFor="endDate">
              End date <span className="text-danger">*</span>
            </label>
            <Field
              name="endDate"
              id="endDate"
              className="form-control is-invalid"
              render={({ field }: any) => (
                <input
                  {...field}
                  type="date"
                  className={`form-control input-select ${errors?.endDate && touched?.endDate ? "is-invalid" : ""
                    }`}
                  max="9999-12-31"
                />
              )}
            />
          </div>

        </div>
      </div>
    );
  };

  const _renderEducationInfo = (props: any) => {
    const { values, handleChange } = props;
    return (
      <div className="mt-3">
        <p className="fw-bold border-top pt-2 text-dark">Education</p>
        <table className="table rounded">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Time</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <FieldArray
              name="education"
              render={(arrayHelpers) => (
                <>
                  {values.education.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex">
                          <input
                            id={`education[${index}].start`}
                            type="date"
                            className="form-control"
                            value={values.education.start}
                            onChange={handleChange}
                          />
                          <input
                            id={`education[${index}].end`}
                            type="date"
                            className="form-control"
                            value={values.education.end}
                            onChange={handleChange}
                          />
                        </div>
                      </td>
                      <td className="d-flex">
                        <Field
                          name={`education[${index}].content`}
                          className="form-control"
                        />
                        {values.education.length > 1 && (
                          <span className="m-auto">
                            <ICON_TRASH
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>
                      <button
                        className="button-add"
                        onClick={() =>
                          arrayHelpers.push({ time: "", content: "" })
                        }
                      >
                        <i className="bi bi-plus-circle-fill"></i>
                        <span className="ms-1">Add more</span>
                      </button>
                    </td>
                  </tr>
                </>
              )}
            />
          </tbody>
        </table>
      </div>
    );
  };

  const _renderSpecializedActivities = (props: any) => {
    const { values, handleChange } = props;
    return (
      <div className="mt-3">
        <p className="fw-bold border-top pt-2 text-dark">
          Specialized activities
        </p>
        <table className="table rounded">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Time</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <FieldArray
              name="specialize"
              render={(arrayHelpers) => (
                <>
                  {values.specialize.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex">
                          <input
                            id={`specialize[${index}].start`}
                            type="date"
                            className="form-control"
                            value={values.specialize.start}
                            onChange={handleChange}
                          />
                          <input
                            id={`specialize[${index}].end`}
                            type="date"
                            className="form-control"
                            value={values.specialize.end}
                            onChange={handleChange}
                          />
                        </div>
                      </td>
                      <td className="d-flex">
                        <Field
                          name={`specialize[${index}].content`}
                          className="form-control"
                        />
                        {values.specialize.length > 1 && (
                          <span className="m-auto">
                            <ICON_TRASH
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>
                      <button
                        className="button-add"
                        onClick={() =>
                          arrayHelpers.push({ time: "", content: "" })
                        }
                      >
                        <i className="bi bi-plus-circle-fill"></i>
                        <span className="ms-1">Add more</span>
                      </button>
                    </td>
                  </tr>
                </>
              )}
            />
          </tbody>
        </table>
      </div>
    );
  };

  const _renderAchievement = (props: any) => {
    const { values, handleChange } = props;
    return (
      <div className="mt-3">
        <p className="fw-bold border-top pt-2 text-dark">Achievement</p>
        <table className="table rounded">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>Time</th>
              <th>Content</th>
            </tr>
          </thead>
          <tbody>
            <FieldArray
              name="achievement"
              render={(arrayHelpers) => (
                <>
                  {values.achievement.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <div className="d-flex">
                          <input
                            id={`achievement[${index}].start`}
                            type="date"
                            className="form-control"
                            value={values.achievement.start}
                            onChange={handleChange}
                          />
                          <input
                            id={`achievement[${index}].end`}
                            type="date"
                            className="form-control"
                            value={values.achievement.end}
                            onChange={handleChange}
                          />
                        </div>
                      </td>
                      <td className="d-flex">
                        <Field
                          name={`achievement[${index}].content`}
                          className="form-control"
                        />
                        {values.achievement.length > 1 && (
                          <span className="m-auto">
                            <ICON_TRASH
                              onClick={() => arrayHelpers.remove(index)}
                            />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td>
                      <button
                        className="button-add"
                        onClick={() =>
                          arrayHelpers.push({ time: "", content: "" })
                        }
                      >
                        <i className="bi bi-plus-circle-fill"></i>
                        <span className="ms-1">Add more</span>
                      </button>
                    </td>
                  </tr>
                </>
              )}
            />
          </tbody>
        </table>
      </div>
    );
  };

  const _renderImage = () => {
    return (
      <div className="h-100 d-flex flex-column" onClick={handlePickImage}>
        <div className="h-100">
          <img
            src={doctor?.photo?.length > 0 ? `data:${doctor?.photo[0]?.contentType};base64,${doctor?.photo[0]?.data}` : image ? image : USER}
            alt=""
            className={`d-block m-auto ${image ? "" : "bg-image"}`}
            style={{ objectFit: "cover" }}
          />
          <input
            type="file"
            className="d-none"
            ref={inputRef}
            onChange={handleChangeImage}
          />
        </div>
        <button className="button button--small button--primary w-90 mx-auto mt-3">
          {image ? "Edit" : "Add"} profile picture
        </button>
      </div>
    );
  };

  const _renderListRoom = () => {
    return (
      <>
        <option hidden>Room</option>
        {listRoom ? (
          listRoom.map((item: any) => (
            <option value={item.id} key={item.code}>
              {item.codeableConcept.coding[0].display}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  return (
    <Formik
      initialValues={doctor}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log("values:", values)
        updatePractitioner(values, actions);
      }}
    >
      {({ values, errors, touched, submitForm, handleChange, setFieldValue }) => (
        <>
          <Form>
            <div className="overview-container">
              <div className="div">
                <div className="row">
                  <div className="col-4">{_renderImage()}</div>
                  <div className="col-8">
                    <h3 className="fw-bold text-uppercase text-dark">
                      edit information
                    </h3>
                    {_renderBasicInfo({ errors, touched })}
                  </div>
                </div>
              </div>
              {_renderWorkInfo({ errors, touched, handleChange, setFieldValue })}
              {_renderEducationInfo({ values, handleChange })}
              {_renderSpecializedActivities({ values, handleChange })}
              {_renderAchievement({ values, handleChange })}
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-end">
            <button className="button button--small button--danger me-3" onClick={() => navigate(`/doctor/overview/${doctor?.id}`)}>
              Back
            </button>

            {/* <button className="button button--small button--danger me-3">
              Delete
            </button> */}

            <button
              className="button button--small button--primary"
              onClick={submitForm}
            >
              Save
            </button>
          </div>
        </>
      )}
    </Formik>
  );
};

export default CreateEditDoctor;
