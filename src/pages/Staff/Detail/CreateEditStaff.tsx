import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { GENDER } from "../../../constants";
import { USER } from "../../../assets";
import { API_ALL_GET_SPECIALTY, API_DETAIL_PRACTITIONER, API_MEDIA_UPLOAD_BY_ADMIN, API_UPDATE_PRACTITIONER } from "../../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../../Common/utils";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { error, success, warn } from "../../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTriggerBack, setTriggerEdit } from "../../../redux/features/practitioner/practitionerSlice";
import { KEY_LOCAL_STORAGE } from "../../../constants/general.constant";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  birthday: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  identifier: Yup.string().required("Required"),
  specialty: Yup.string().required("Required"),
  startDate: Yup.string().required("Required"),
  endDate: Yup.string().required("Required"),
});

const defaultValue = {
  id: "",
  name: "",
  birthday: "",
  gender: "",
  phoneNumber: "",
  email: "",
  address: "",
  identifier: "",
  specialty: "",
  startDate: "",
  endDate: ""
};

const CreateEditStaff = () => {
  const inputRef = useRef<any>(null);
  const navigate = useNavigate();
  const params = useParams();

  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isPickImage, setIsPickImage] = useState<boolean>(false)
  const [specialtyList, setSpecialtyList] = useState<any>([]);
  const [staff, setStaff] = useState<any>(defaultValue);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { triggerEdit, triggerBack } = useAppSelector((state) => state.practitionerSlice)

  useEffect(() => {
    getStaffInfo(params.staffId)
  }, [params.staffId, triggerEdit])

  useEffect(() => {
    getSpecialty()
  }, [])

  useEffect(() => {
    if (selectedFile) {
      uploadImage()
    }
  }, [selectedFile])

  const uploadImage = async () => {

    const url = `${url_api}${API_MEDIA_UPLOAD_BY_ADMIN}`;

    if (!selectedFile) {
      warn('Please select an image file before uploading.');
      return;
    }

    const formData: FormData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', staff?.id)

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

  const getStaffInfo = (id: string | undefined) => {
    const url = `${url_api}${API_DETAIL_PRACTITIONER}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const data = resp.data;
          const dataConverted: any = {
            id: data?.id,
            name: data?.name,
            birthday: data?.dateOfBirth !== "null" ? data?.dateOfBirth : null,
            gender: data?.gender,
            phoneNumber: data?.phoneNumber,
            email: data?.email,
            address: data?.address,
            specialty: data?.idSpecialty,
            identifier: data?.identification !== "null" ? data?.identification : null,
            startDate: moment(data?.startWork).format("YYYY-MM-DD"),
            endDate: moment(data?.endWork).format("YYYY-MM-DD"),
            photo: data?.photo
          }
          setStaff(dataConverted);
        }
      })
      .catch((err) => {
        console.log("error get info practitioner (Staff):", err);
      });
  }

  const getSpecialty = () => {
    const url = `${url_api}${API_ALL_GET_SPECIALTY}`;

    axios
      .get(url, defineConfigGet({ page: 0, size: 100 }))
      .then((resp: any) => {
        if (resp) {
          setSpecialtyList(resp.data);
        }
      })
      .catch((err: any) => {
        console.log("error get specialty:", err);
      });
  }

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

    const paramsRq = {
      username: values.email,
      email: values.email,
      identification: values.identifier,
      name: values.name,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.birthday,
      gender: values.gender,
      address: values.address,
      idSpecialty: idSpecialty,
      displaySpecialty: displaySpecialty,
      startWork: new Date(values.startDate),
      endWork: new Date(values.endDate),
      type: "Staff",
      qualifications: null,
    }

    axios
      .put(url, paramsRq, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          actions.setSubmitting(false);
          actions.resetForm();
          dispatch(setTriggerEdit(!triggerEdit))
          navigate(`/staff/overview/${params.staffId}`);
          success("Update information success!");
        }
      })
      .catch((err) => {
        console.log("error update practitioner (Staff):", err);
        error(err.response.data.error || err.response.data.error.message);
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

  const handleUpdate = (values: any, actions: any) => {
    const startDate = new Date(values.startDate).toISOString()
    const endDate = new Date(values.endDate).toISOString()
    if (startDate > endDate) {
      warn("start working is greater than end working!")
      return;
    }
    updatePractitioner(values, actions);
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
    const { errors, touched } = props;

    return (
      <div className="mt-5">
        <p className="fw-bold border-top pt-2 text-dark">Work Information</p>
        <div className="row">
          <div className="col-12 mb-3">
            <label htmlFor="department">
              Specialty <span className="text-danger">*</span>
            </label>
            <Field
              as="select"
              name="specialty"
              id="specialty"
              className={`form-select ${errors?.specialty && touched?.specialty ? "is-invalid" : ""
                }`}
            >
              {specialtyList ? (
                specialtyList.map((item: any) => (
                  <option value={item.id} key={item.code}>
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
          {!isLoading ? !isPickImage ? <img
            src={staff?.photo ? staff?.photo : USER}
            alt="img patient"
            className={`${staff?.photo ? "" : "bg-image"} w-100 h-400 object-fit-cover p-2 border`}
          /> : <img
            src={selectedFile ? URL.createObjectURL(selectedFile) : USER}
            alt="img admin"
            className={`d-block m-auto ${selectedFile ? "" : "bg-image"} w-100 h-400 object-fit-cover`}
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
        <p className="button button--small button--primary w-100 mx-auto mt-3 p-3">
          {staff?.photo ? "Edit" : "Add"} profile picture
        </p>
      </div>
    );
  };

  return (
    <Formik
      initialValues={staff}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        handleUpdate(values, actions)
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
              {_renderWorkInfo({ errors, touched })}
            </div>
          </Form>
          <div className="mt-3 d-flex justify-content-end">
            <button className="button button--small button--danger me-3" onClick={() => { navigate(`/staff/overview/${params.staffId}`); dispatch(setTriggerBack(!triggerBack)) }}>
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

export default CreateEditStaff;
