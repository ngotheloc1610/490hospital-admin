import { useRef, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";

import { GENDER } from "../../../constants";
import { ICON_TRASH, USER } from "../../../assets";
import { IDoctorDetail } from "../../../interface/general.interface";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  birthday: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  residence: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  department: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  level: Yup.string().required("Required"),
});

const defaultValue: IDoctorDetail = {
  id: "",
  name: "",
  birthday: "",
  gender: "",
  phoneNumber: "",
  email: "",
  residence: "",
  city: "",
  department: "",
  position: "",
  startDate: "",
  level: "",
  education: [{ time: "", content: "" }],
  specialize: [{ time: "", content: "" }],
  achievement: [{ time: "", content: "" }],
};

const CreateEditDepartment = () => {
  const inputRef = useRef<any>(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [image, setImage] = useState<any>("");

  const [doctor, setDoctor] = useState<IDoctorDetail>(defaultValue);

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0];
    setImage(file);
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
              className={`form-control ${
                errors?.name && touched?.name ? "is-invalid" : ""
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
                  className={`form-control input-select ${
                    errors?.birthday && touched?.birthday ? "is-invalid" : ""
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
              className={`form-select ${
                errors?.gender && touched?.gender ? "is-invalid" : ""
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
            <label htmlFor="residence">
              Current residence <span className="text-danger">*</span>
            </label>
            <Field
              name="residence"
              type="text"
              id="residence"
              className={`form-control ${
                errors?.residence && touched?.residence ? "is-invalid" : ""
              }`}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="city">
              Citizen identification <span className="text-danger">*</span>
            </label>
            <Field
              name="city"
              type="text"
              id="city"
              className={`form-control ${
                errors?.city && touched?.city ? "is-invalid" : ""
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
              className={`form-control ${
                errors?.phoneNumber && touched?.phoneNumber ? "is-invalid" : ""
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
              className={`form-control ${
                errors?.email && touched?.email ? "is-invalid" : ""
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  const _renderWorkInfo = (props: any) => {
    const { errors, touched } = props;

    return (
      <div className="mt-5">
        <p className="fw-bold border-top pt-2 text-dark">Work Information</p>
        <div className="row">
          <div className="col-6 mb-3">
            <label htmlFor="department">
              Department <span className="text-danger">*</span>
            </label>
            <Field
              as="select"
              name="department"
              id="department"
              className={`form-select ${
                errors?.department && touched?.department ? "is-invalid" : ""
              }`}
            >
              {departmentList.length > 0 ? (
                departmentList.map((item: any) => (
                  <option value={item.code} key={item.code}>
                    {item.name}
                  </option>
                ))
              ) : (
                <option disabled>No option</option>
              )}
            </Field>
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
                  className={`form-control input-select ${
                    errors?.startDate && touched?.startDate ? "is-invalid" : ""
                  }`}
                  max="9999-12-31"
                />
              )}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="position">
              Position <span className="text-danger">*</span>
            </label>
            <Field
              name="position"
              type="text"
              id="position"
              className={`form-control ${
                errors?.position && touched?.position ? "is-invalid" : ""
              }`}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="level">
              Level <span className="text-danger">*</span>
            </label>
            <Field
              name="level"
              id="level"
              className={`form-control ${
                errors?.level && touched?.level ? "is-invalid" : ""
              }`}
            />
          </div>
        </div>
      </div>
    );
  };

  const _renderEducationInfo = (props: any) => {
    const { values } = props;
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
                  {values.education.map((edu: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <Field
                          name={`education[${index}].time`}
                          className="form-control"
                        />
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
    const { values } = props;
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
                  {values.specialize.map((edu: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <Field
                          name={`specialize[${index}].time`}
                          className="form-control"
                        />
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
    const { values } = props;
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
                  {values.achievement.map((edu: any, index: number) => (
                    <tr key={index}>
                      <td>
                        <Field
                          name={`achievement[${index}].time`}
                          className="form-control"
                        />
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
            src={image ? URL.createObjectURL(image) : USER}
            alt=""
            className={`h-100 w-100 d-block m-auto ${image ? "" : "bg-image"}`}
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

  return (
    <Formik
      initialValues={doctor}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log("values:", values);
        console.log("actions:", actions);
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ values, errors, touched, submitForm }) => (
        <>
          <Form>
            <div className="overview-container">
              <div className="div">
                <div className="row">
                  <div className="col-4">{_renderImage()}</div>
                  <div className="col-8">
                    <h3 className="fw-bold text-uppercase text-dark">
                      {doctor?.id ? "edit" : "add"} new
                    </h3>
                    {_renderBasicInfo({ errors, touched })}
                  </div>
                </div>
              </div>
              {_renderWorkInfo({ errors, touched })}
              {_renderEducationInfo({ values })}
              {_renderSpecializedActivities({ values })}
              {_renderAchievement({ values })}
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-end">
            {doctor.id && (
              <button className="button button--small button--danger me-3">
                Delete
              </button>
            )}

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

export default CreateEditDepartment;
