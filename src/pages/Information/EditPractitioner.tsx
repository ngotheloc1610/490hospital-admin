import { useEffect, useRef, useState } from "react";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { API_ALL_GET_SPECIALTY, API_DETAIL_PRACTITIONER, API_UPDATE_PRACTITIONER } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import { error, success } from "../../Common/notify";
import { GENDER } from "../../constants";
import { ICON_TRASH, USER } from "../../assets";


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    birthday: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
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
    city: "",
    specialty: "",
    startDate: "",
    endDate: "",
    education: [{ time: "", content: "" }],
    specialize: [{ time: "", content: "" }],
    achievement: [{ time: "", content: "" }],
};

const EditPractitioner = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const params = useParams();
    const navigate = useNavigate();
    const inputRef = useRef<any>(null);
    const [image, setImage] = useState<any>("");

    const [practitionerInfo, setPractitionerInfo] = useState(defaultValue);
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
            start: "",
            end: ""
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
                        <label htmlFor="specialty">
                            Specialty <span className="text-danger">*</span>
                        </label>
                        <Field
                            as="select"
                            name="specialty"
                            id="specialty"
                            className={`form-select ${errors?.specialty && touched?.specialty ? "is-invalid" : ""
                                }`}
                        >
                            {specialtyList.length > 0 ? (
                                specialtyList.map((item: any) => (
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
            initialValues={practitionerInfo}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                updatePatient(values)
                actions.setSubmitting(false);
                actions.resetForm();
            }}
        >
            {({ values, errors, touched, submitForm }) => (
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
                            {_renderWorkInfo({ errors, touched })}
                            {_renderEducationInfo({ values })}
                            {_renderSpecializedActivities({ values })}
                            {_renderAchievement({ values })}
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
