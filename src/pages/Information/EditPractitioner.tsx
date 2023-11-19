import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { API_ALL_GET_SPECIALTY, API_DETAIL_PRACTITIONER, API_UPDATE_PRACTITIONER } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import { error, success } from "../../Common/notify";
import { GENDER } from "../../constants";
import { USER } from "../../assets";
import { FORMAT_DATE } from "../../constants/general.constant";
import moment from "moment";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    birthday: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
});

const defaultValue = {
    id: "",
    name: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    city: "",
    photo: [],
};

const EditPractitioner = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const params = useParams();
    const navigate = useNavigate();
    const inputRef = useRef<any>(null);
    const [image, setImage] = useState<any>("");

    const [practitionerInfo, setPractitionerInfo] = useState<any>(defaultValue);
    const [specialtyList, setListSpecialty] = useState([]);

    useEffect(() => {
        getSpecialty();
    }, [])

    useEffect(() => {
        getInformation(params.practitionerId)
    }, [params.practitionerId])

    const getSpecialty = () => {
        const url = `${url_api}${API_ALL_GET_SPECIALTY}`;

        axios
            .get(url, defineConfigGet({ page: 0, size: 100 }))
            .then((resp: any) => {
                if (resp) {
                    setListSpecialty(resp.data.content);
                }
            })
            .catch((err: any) => {
                console.log("err:", err);
            });
    }

    const getInformation = (id: any) => {
        const url = `${url_api}${API_DETAIL_PRACTITIONER}${id}`;

        axios
            .get(url, defineConfigGet({}))
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)

                }
            })
            .catch((err: any) => {
                console.log("err:", err);
            });
    }

    const updatePatient = (values: any) => {
        const url = `${url_api}${API_UPDATE_PRACTITIONER}${values.id}`;

        const param = {
            username: values.name,
            email: values.email,
            password: "",
            identifier: [],
            name: values.name,
            phoneNumber: values.phoneNumber,
            dateOfBirth: values.dateOfBirth,
            photo: "",
            city: values.city,
            district: "",
            state: "",
            address: values.address,
            address2: "",
            gender: values.gender,
            country: "",
            postalCode: "",
            system: "",

        }

        axios
            .put(url, param, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    success("Update Successfully!!!");
                    navigate("/information");
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


    const _renderWorkInfo = () => {
        return (
            <div className="mt-5">
                <p className="fw-bold border-top pt-2 text-dark">Work information</p>
                <table className="table">
                    <tbody>
                        <tr>
                            <th scope="row" style={{ width: "15%" }}>
                                Starting date
                            </th>
                            <td>{practitionerInfo.start ? moment(practitionerInfo.start).format(FORMAT_DATE) : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">End date</th>
                            <td>{practitionerInfo.end ? moment(practitionerInfo.end).format(FORMAT_DATE) : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Specialty</th>
                            <td>{practitionerInfo.displaySpecialty ? practitionerInfo.displaySpecialty : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Room</th>
                            <td>{practitionerInfo.desRoom ? practitionerInfo.desRoom : "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    };

    const _renderEducationInfo = () => {
        return (
            <div className="mt-3">
                <p className="fw-bold border-top pt-2 text-dark">Education</p>
                <table className="table">
                    <tbody>
                        {practitionerInfo.educations && practitionerInfo.educations.map((item: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        {item.year}
                                    </th>
                                    <td>
                                        {item.detail}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    const _renderSpecializedActivities = () => {
        return (
            <div className="mt-3">
                <p className="fw-bold border-top pt-2 text-dark">
                    Specialized activities
                </p>
                <table className="table">
                    <tbody>
                        {practitionerInfo.experiences && practitionerInfo.experiences.map((item: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        <span>{item.timeStart} - {item.timeEnd}</span>
                                    </th>
                                    <td>
                                        {item.detail}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    const _renderAchievement = () => {
        return (
            <div className="mt-3">
                <p className="fw-bold border-top pt-2 text-dark">Achievement</p>
                <table className="table">
                    <tbody>
                        {practitionerInfo.achievements && practitionerInfo.achievements.map((item: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        {item.time}
                                    </th>
                                    <td>
                                        {item.detial}
                                    </td>
                                </tr>
                            )
                        })}
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
                        src={practitionerInfo.photo.length > 0 ? `data:${practitionerInfo.photo[0]?.contentType};base64,${practitionerInfo.photo[0]?.data}` : image ? image : USER}
                        alt="img admin"
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
            initialValues={practitionerInfo}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                updatePatient(values)
                actions.setSubmitting(false);
                actions.resetForm();
            }}
        >
            {({ errors, touched, submitForm }) => (
                <div className="mb-5">
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
                            {_renderWorkInfo()}
                            {_renderEducationInfo()}
                            {_renderSpecializedActivities()}
                            {_renderAchievement()}
                        </div>
                    </Form>
                    <div className="mt-3 d-flex justify-content-end">
                        <button
                            className="button button--small button--danger me-3"
                            onClick={() => navigate("/information")}
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
                </div>
            )}
        </Formik>
    );
};

export default EditPractitioner;
