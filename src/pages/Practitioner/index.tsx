import { useEffect, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import Layout from "../../components/Layout";
import { TYPE_PRACTITIONER } from "../../constants";
import {
  API_ALL_GET_SPECIALTY,
  API_CREATE_PRACTITIONER,
  API_GET_ROOM_BY_SPECIALTY,
} from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import { error, success, warn } from "../../Common/notify";
import { ICON_TRASH } from "../../assets";
import { IPractitioner } from "../../interface/general.interface";
import { TYPE_DOCTOR } from "../../constants/general.constant";

const validationSchema = Yup.object().shape({
  username: Yup.string().email('Địa chỉ email không hợp lệ').required("Required"),
  fullname: Yup.string().required("Required").matches(/^[a-zA-Z0-9_]+$/),
  type: Yup.string().required("Required"),
  room: Yup.string().optional(),
  specialty: Yup.string().required("Required"),
  startDate: Yup.date().required("Required").max(Yup.ref('endDate'), 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc'),
  endDate: Yup.date().required("Required").min(Yup.ref('startDate'), 'Ngày kết thúc phải lớn hơn ngày bắt đầu'),
});

const defaultValue: IPractitioner = {
  id: "",
  username: "",
  fullname: "",
  type: "",
  room: "",
  specialty: "",
  startDate: "",
  endDate: "",
  education: [{ start: "", end: "", content: "" }],
  specialize: [{ start: "", end: "", content: "" }],
  achievement: [{ start: "", end: "", content: "" }],
};

const Practitioner = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const [listSpecialty, setListSpecialty] = useState<any>([]);
  const [listRoom, setListRoom] = useState<any>([]);
  const [specialtyId, setSpecialtyId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getSpecialty();
  }, []);

  useEffect(() => {
    if (specialtyId) {
      getRoom(specialtyId);
    }
  }, [specialtyId])

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
        console.log("error get specialties:", err);
      });
  };

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

  const createPractitioner = (values: any, actions: any) => {
    const url = `${url_api}${API_CREATE_PRACTITIONER}`;

    const idSpecialty = listSpecialty.filter((item: any) => {
      return item.id === values.specialty;
    })[0]?.id;
    const displaySpecialty = listSpecialty.filter((item: any) => {
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
      username: values.username,
      name: values.fullname,
      idSpecialty: idSpecialty,
      displaySpecialty: displaySpecialty,
      desRoom: values.type === "STAFF" ? null : desRoom,
      idRoom: values.type === "STAFF" ? null : idRoom,
      type: values.type,
      startWork: new Date(values.startDate),
      endWork: new Date(values.endDate),
      qualifications: values.type === "STAFF" ? null : [...educations, ...specializes, ...achievements],
      photo: null,
      identifier: null
    };

    setIsLoading(true);

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        setIsLoading(false)
        if (resp) {
          actions.setSubmitting(false);
          actions.resetForm();
          success(`Create practitioner ${values.type} successfully!`);
        }
      })
      .catch((err) => {
        console.log("error create practitioner:", err);
        setIsLoading(false)
        error(err.response.data.error || err.response.data.error.message);
      });
  };

  const handleCreatePractitioner = (values: any, actions: any) => {
    if (values.password !== values.cfPassword) {
      warn("Mật khẩu không trùng khớp!");
      return;
    }
    createPractitioner(values, actions);
  };

  const _renderListType = () => {
    return (
      <>
        <option hidden>Type of practitioner</option>
        {TYPE_PRACTITIONER.map((item: any) => (
          <option value={item.code} key={item.code}>
            {item.name}
          </option>
        ))}
      </>
    );
  };

  const _renderListSpecialty = () => {
    return (
      <>
        <option hidden>Specialty</option>
        {listSpecialty ? (
          listSpecialty.map((item: any) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
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

  const _renderBasicInfo = (props: any) => {
    const { errors, touched, values, handleChange } = props;

    return (
      <div>
        <p className="fw-bold text-dark">Basic Information</p>
        <div className="row">
          <div className="row mb-3">
            <div className="col-6">
              <label htmlFor="username" className="form-label">
                Username <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  <i className="bi bi-person-fill fs-5 icon-gray"></i>
                </span>
                <input
                  id="username"
                  type="text"
                  className={`form-control ${errors?.username && touched?.username ? "is-invalid" : ""}`}
                  placeholder="Username"
                  value={values.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col-6">
              <label htmlFor="fullname" className="form-label">
                Fullname <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <input
                  id="fullname"
                  type="text"
                  className={`form-control ${errors?.fullname && touched?.fullname ? "is-invalid" : ""}`}
                  placeholder="Full name"
                  value={values.fullname}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="row mb-3 ">
            <div className="col-12">
              <label htmlFor="type" className="form-label">
                Type of Practitioner <span className="text-danger">*</span>
              </label>
              <div className="input-group">
                <select
                  id="type"
                  className={`form-select ${errors?.type && touched?.type ? "is-invalid" : ""}`}
                  onChange={handleChange}
                >
                  {_renderListType()}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const _renderWorkInfo = (props: any) => {
    const { values, errors, touched, handleChange, setFieldValue } = props;

    return (
      <div className="mt-5">
        <p className="fw-bold border-top pt-2 text-dark">Work Information</p>
        <div className="row mb-3">
          <div className="col-6">
            <label htmlFor="startDate" className="form-label">
              Start Date <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                id="startDate"
                type="date"
                className={`form-control ${errors?.startDate && touched?.startDate ? "is-invalid" : ""}`}
                value={values.startDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="endDate" className="form-label">
              End Date <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <input
                id="endDate"
                type="date"
                className={`form-control ${errors?.endDate && touched?.endDate ? "is-invalid" : ""}`}
                value={values.end}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="row mb-3 ">
          <div className="col-6">
            <label htmlFor="specialty" className="form-label">
              Specialty <span className="text-danger">*</span>
            </label>
            <div className="input-group">
              <select
                id="specialty"
                className={`form-select ${errors?.specialty && touched?.specialty ? "is-invalid" : ""}`}
                onChange={(e: any) => {
                  setSpecialtyId(e.target.value);
                  setFieldValue("specialty", e.target.value)
                }}
              >
                {_renderListSpecialty()}
              </select>
            </div>
          </div>

          {values.type === TYPE_DOCTOR &&
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
            </div>}


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
                          arrayHelpers.push({ start: "", end: "", content: "" })
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

  return (
    <Layout>
      <section className="practitioner">
        <div className="practitioner-container container">
          <Formik
            initialValues={defaultValue}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              handleCreatePractitioner(values, actions);
            }}
          >
            {({ values, errors, touched, submitForm, handleChange, setFieldValue }) => (
              <>
                <Form>
                  <div className="practitioner-container-body mt-3">
                    <div>
                      {_renderBasicInfo({ values, errors, touched, handleChange })}
                      {_renderWorkInfo({ values, errors, touched, handleChange, setFieldValue })}
                      {values.type === TYPE_DOCTOR &&
                        <>
                          {_renderEducationInfo({ values, handleChange })}
                          {_renderSpecializedActivities({ values, handleChange })}
                          {_renderAchievement({ values, handleChange })}
                        </>
                      }
                    </div>
                  </div>
                </Form>
                <div className="mt-3 d-flex justify-content-end">
                  <button
                    className="button button--small button--primary"
                    onClick={submitForm}
                  >
                    {isLoading && <span className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </span>} <span className="ms-2">Save</span>
                  </button>
                </div>
              </>
            )}
          </Formik>
        </div>
      </section>
    </Layout>
  );
};

export default Practitioner;
