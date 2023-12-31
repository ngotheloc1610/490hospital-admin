import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";

import { GENDER } from "../../../../constants";
import { USER } from "../../../../assets";
import { API_GET_PATIENT, API_MEDIA_UPLOAD_BY_ADMIN, API_UPDATE_PATIENT } from "../../../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../../../Common/utils";
import { setTriggerUpdate } from "../../../../redux/features/patient/patientSlice";
import { error, success, warn } from "../../../../Common/notify";
import { KEY_LOCAL_STORAGE } from "../../../../constants/general.constant";
import { setTriggerBack } from "../../../../redux/features/practitioner/practitionerSlice";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(3).required("Required"),
  dateOfBirth: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  identifier: Yup.string().required("Required"),
  phoneNumber: Yup.number().required("Required"),
  email: Yup.string().email().required("Required"),
});

const defaultValue = {
  id: "",
  name: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  identifier: "",
  phoneNumber: "",
  email: "",
};

const CreateEditPatient = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>(null);

  const [patientInfo, setPatientInfo] = useState<any>(defaultValue);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isPickImage, setIsPickImage] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { triggerUpdate } = useAppSelector(state => state.patientSlice);
  const { triggerBack } = useAppSelector(state => state.practitionerSlice);

  useEffect(() => {
    getPatientInfo(params.patientId)
  }, [params.patientId])

  useEffect(() => {
    if (selectedFile) {
      uploadImage()
    }
  }, [selectedFile])


  const getPatientInfo = (id: any) => {
    const url = `${url_api}${API_GET_PATIENT}${id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          const data = resp.data;
          const patientDetail = {
            id: data?.id,
            name: data?.name,
            dateOfBirth: data?.dateOfBirth,
            gender: data?.gender,
            phoneNumber: data?.phoneNumber,
            email: data?.email,
            address: data?.address,
            identifier: data?.identifier,
            photo: data?.photo
          }
          setPatientInfo(patientDetail);
        }
      })
      .catch((err: any) => {
        console.log("error get info patient:", err);
      });
  }

  const uploadImage = async () => {

    const url = `${url_api}${API_MEDIA_UPLOAD_BY_ADMIN}`;

    if (!selectedFile) {
      warn('Please select an image file before uploading.');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', patientInfo?.id)

    setIsLoading(true)

    try {
      const config = {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}`,
          "Content-Type": "multipart/form-data",
        },
      }

      const { data } = await axios.post(url, formData, config)
      if (data === "Successful!") {
        setIsLoading(false)
        success("Upload image Successful!")
      }
    } catch (err: any) {
      console.log(err);
      setIsLoading(false)
      error(err.response.data.error)
    }
  }

  const updatePatient = (values: any, actions: any) => {
    const url = `${url_api}${API_UPDATE_PATIENT}${values.id}`;

    const param = {
      username: values.email,
      email: values.email,
      name: values.name,
      identifier: values.identifier,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth,
      address: values.address,
      gender: values.gender,
    }

    axios
      .put(url, param, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          actions.setSubmitting(false);
          actions.resetForm();
          dispatch(setTriggerUpdate(!triggerUpdate));
          success("Update patient successfully!");
          navigate(`/patient/information/${values.id}`);
        }
      })
      .catch((err: any) => {
        error(err.response.data.error || err.response.data.error.message)
        console.log("error update patient:", err);
      });
  }

  const handleChangeImage = (event: any) => {
    const file = event.target.files[0];
    setSelectedFile(file)
    setIsPickImage(true);
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

  const _renderImage = () => {
    return (
      <div className="h-100 d-flex flex-column" onClick={handlePickImage}>
        <div className="h-100">
          {!isLoading ? !isPickImage ? <img
            src={patientInfo?.photo ? patientInfo?.photo : USER}
            alt="img patient"
            className={`${patientInfo?.photo ? "" : "bg-image"} w-100 h-350 object-fit-cover p-2 border`}
          /> : <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : USER}
            alt="img admin"
            className={`d-block m-auto ${selectedFile ? "" : "bg-image"} w-100 h-350 object-fit-cover`}
            style={{ objectFit: "cover" }}
          /> : <div className="d-flex justify-content-center bg-light h-100">
            <div className="spinner-border my-auto" style={{ width: "5rem", height: "5rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div></div>}
          <input
            type="file"
            className="d-none"
            ref={inputRef}
            onChange={handleChangeImage}
          />
        </div>
        <p className="button button--small button--primary w-100 p-3 mx-auto mt-3">
          {patientInfo?.photo ? "Edit" : "Add"} profile picture
        </p>
      </div>
    );
  };

  return (
    <Formik
      initialValues={patientInfo}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        updatePatient(values, actions)
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
                      edit information
                    </h3>
                    {_renderBasicInfo({ errors, touched })}
                  </div>
                </div>
              </div>
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-end">
            <button
              className="button button--small button--danger me-3"
              onClick={() => { navigate(`/patient/information/${patientInfo?.id}`); dispatch(setTriggerBack(!triggerBack)) }}
            >
              Back
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
