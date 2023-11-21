import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { GENDER } from "../../../constants";
import { USER } from "../../../assets";
import { API_ALL_GET_SPECIALTY, API_DETAIL_PRACTITIONER, API_UPDATE_PRACTITIONER } from "../../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../../Common/utils";
import axios from "axios";
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
  
  const [image, setImage] = useState<any>("");
  const [specialtyList, setSpecialtyList] = useState<any>([]);
  const [staff, setStaff] = useState<any>(defaultValue);

  const url_api = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getStaffInfo(params.staffId)
  }, [params.staffId])

  useEffect(() => {
    getSpecialty()
  }, [])

  const getStaffInfo = (id: string | undefined) => {
    const url = `${url_api}${API_DETAIL_PRACTITIONER}${id}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const data = resp.data;
          console.log("resp:", resp)
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

    const params = {

    }

    axios
      .put(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          actions.setSubmitting(false);
          actions.resetForm();
          navigate(`/staff/overview/${values.id}`);
          success("Update information success!");
        }
      })
      .catch((err) => {
        console.log("error update practitioner (Staff):", err);
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
                  <option value={item.name} key={item.code}>
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
          <img
            src={staff?.photo?.length > 0 ? `data:${staff.photo[0]?.contentType};base64,${staff.photo[0]?.data}` : image ? image : USER}
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

  return (
    <Formik
      initialValues={staff}
      enableReinitialize={true}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log("values:", values)
        updatePractitioner(values, actions)
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
            <button className="button button--small button--danger me-3" onClick={() => navigate(`/staff/overview/${staff?.id}`)}>
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

export default CreateEditStaff;
