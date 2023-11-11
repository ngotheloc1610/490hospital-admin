import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useAppDispatch } from "../../../../redux/hooks";

import { GENDER } from "../../../../constants";
import { USER } from "../../../../assets";
import { API_GET_PATIENT, API_UPDATE_PATIENT } from "../../../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../../../Common/utils";
import { setPatient, setShowPopUpConfirm } from "../../../../redux/features/patient/patientSlice";
import { error, success } from "../../../../Common/notify";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  // phoneNumber: Yup.number()
  //   .positive("A phone number can't start with a minus")
  //   .integer("A phone number can't include a decimal point")
  //   .min(10)
  //   .max(11)
  //   .required("Required"),
  email: Yup.string().email().required("Required"),
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
  photo: []
};

const CreateEditPatient = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const params = useParams();
  const navigate = useNavigate();
  const inputRef = useRef<any>(null);
  const [image, setImage] = useState<any>("");

  const [patientInfo, setPatientInfo] = useState<any>(defaultValue);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getPatientInfo(params.patientId)
  }, [params.patientId])

  const getPatientInfo = (id: any) => {
    const url = `${url_api}${API_GET_PATIENT}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          const data = resp.data;
          const patientDetail = {
            id: data.id,
            name: data.nameFirstRep.nameAsSingleString,
            dateOfBirth: data.birthDate,
            gender: data.gender,
            phoneNumber: data?.telecom?.find((i: any) => i?.system === "phone")?.value,
            email: data?.telecom?.find((i: any) => i?.system === "email")?.value,
            address: data?.addressFirstRep?.text,
            city: data?.addressFirstRep?.city,
            photo: data?.photo
          }
          setPatientInfo(patientDetail);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const updatePatient = (values: any) => {
    const url = `${url_api}${API_UPDATE_PATIENT}${values.id}`;

    const param = {
      id: values.id,
      username: values.name,
      email: values.email,
      active: true,
      name: values.name,
      phoneNumber: values.phoneNumber,
      type: "PATIENT",
      dateOfBirth: values.dateOfBirth,
      city: values.city,
      district: "",
      ward: "",
      address: values.address,
      address2: "",
      gender: values.gender,
      country: "",
      postalCode: "",
    }

    axios
      .put(url, param, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          success("Update Successfully!!!");
          navigate("/patient");
          console.log("resp:", resp)
        }
      })
      .catch((err: any) => {
        if (err.response.data.status === 401) {
          error(err.response.data.error)
        }
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

  const handleDelete = () => {
    dispatch(setShowPopUpConfirm(true))
    dispatch(setPatient(patientInfo))
  }

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

  const _renderImage = () => {
    return (
      <div className="h-100 d-flex flex-column" onClick={handlePickImage}>
        <div className="h-100">
          <img
            src={patientInfo.photo.length > 0 ? `data:${patientInfo.photo[0]?.contentType};base64,${patientInfo.photo[0]?.data}` : USER}
            alt="imagee"
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
      initialValues={patientInfo}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        updatePatient(values)
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ errors, touched, submitForm }) => (
        <>
          <Form>
            <div className="overview-container">
              <div className="div">
                <div className="row">
                  <div className="col-4">{_renderImage()}</div>
                  <div className="col-8">
                    <h3 className="fw-bold text-uppercase text-dark">
                      {patientInfo?.id ? "edit" : "add"} new
                    </h3>
                    {_renderBasicInfo({ errors, touched })}
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-end">
            {patientInfo.id && (
              <button className="button button--small button--danger me-3" onClick={() => handleDelete()}>
                Delete
              </button>
            )}

            <button
              className="button button--small button--danger me-3"
              onClick={() => navigate("/patient")}
            >
              Cancel
            </button>

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
