import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { GENDER } from "../../../constants";
import { USER } from "../../../assets";
import { API_ALL_GET_DEPARTMENT, API_CREATE_PATIENT, API_GET_PATIENT } from "../../../constants/api.constant";
import axios from "axios";
import { defineConfigGet, defineConfigPost } from "../../../Common/utils";
import { useParams } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  phoneNumber: Yup.number()
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(10)
    .max(11)
    .required("Required"),
  email: Yup.string().email().required("Required"),
  department: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
});

const defaultValue = {
  id: "",
  name: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  phoneNumber: "",
  email: "",
  department: "",
  startDate: "",
  endDate: "",
};

const CreateEditPatient = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const params = useParams();
  const inputRef = useRef<any>(null);
  const [departmentList, setDepartmentList] = useState([]);
  const [image, setImage] = useState<any>("");

  const [patient, setPatient] = useState(defaultValue);

  useEffect(() => {
    getDepartment()
  }, [])

  useEffect(() => {
    getPatientInfo(params.patientId)
  }, [params.patientId])

  useEffect(() => {
    console.log("patient", patient);

  }, [patient])


  const getDepartment = () => {
    const url = `${url_api}${API_ALL_GET_DEPARTMENT}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          setDepartmentList(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const getPatientInfo = (id: any) => {
    const url = `${url_api}${API_GET_PATIENT}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          const data = resp.data;
          const patientDetail = {
            id: data.id,
            name: data.nameFirstRep.nameAsSingleString,
            dateOfBirth: data.birthDate,
            gender: data.gender,
            address: "",
            city: "",
            phoneNumber: data?.telecom?.find((i: any) => i?.system === "phone")?.value,
            email: data?.telecom?.find((i: any) => i?.system === "email")?.value,
            department: "",
            startDate: "",
            endDate: "",
          }
          console.log("patientDetail:", patientDetail)
          setPatient(patientDetail);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const createPatient = () => {
    const url = `${url_api}${API_CREATE_PATIENT}`;
    const param = {

    }

    axios
      .post(url, param, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

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
              className={`form-control ${errors?.name && touched?.name ? "is-invalid" : ""}`}
            />
          </div>
          <div className="col-6 mb-3">
            <label htmlFor="dateOfBirth">
              Date of birth <span className="text-danger">*</span>
            </label>
            <Field
              name="dateOfBirth"
              id="dateOfBirth"
              className="form-control"
              render={({ field }: any) => (
                <input
                  {...field}
                  type="date"
                  className={`form-control input-select ${errors?.dateOfBirth && touched?.dateOfBirth ? "is-invalid" : ""
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
            <label htmlFor="city">
              Citizen identification <span className="text-danger">*</span>
            </label>
            <Field
              name="city"
              type="text"
              id="city"
              className={`form-control ${errors?.city && touched?.city ? "is-invalid" : ""
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
    const { errors, touched } = props;

    return (
      <div className="mt-5">
        <p className="fw-bold border-top pt-2 text-dark">Work Information</p>
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="department">
              Department <span className="text-danger">*</span>
            </label>
            <Field
              as="select"
              name="department"
              id="department"
              className={`form-select ${errors?.department && touched?.department ? "is-invalid" : ""
                }`}
            >
              {departmentList.length > 0 ? (
                departmentList.map((item: any) => (
                  <>
                    <option hidden>Department</option>
                    <option value={item.codeableConcept.coding[0].code} key={item.id}>
                      {item.codeableConcept.coding[0].display}
                    </option></>
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
      initialValues={patient}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        createPatient();
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ values, errors, touched, submitForm, setFieldValue }) => (
        <>
          <Form>
            <div className="overview-container">
              <div className="div">
                <div className="row">
                  <div className="col-4">{_renderImage()}</div>
                  <div className="col-8">
                    <h3 className="fw-bold text-uppercase text-dark">
                      {patient?.id ? "edit" : "add"} new
                    </h3>
                    {_renderBasicInfo({ errors, touched })}
                  </div>
                </div>
              </div>
              {_renderWorkInfo({ errors, touched })}
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-end">
            {patient.id && (
              <button className="button button--small button--danger me-3" >
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

export default CreateEditPatient;
