import { useEffect, useRef, useState } from "react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { API_MEDIA_UPLOAD_PROFILE, API_PROFILE_PRACTITIONER, API_UPDATE_PROFILE_PRACTITIONER } from "../../constants/api.constant";
import { defineConfigPost } from "../../Common/utils";
import { error, success, warn } from "../../Common/notify";
import { GENDER } from "../../constants";
import { USER } from "../../assets";
import { FORMAT_DATE, KEY_LOCAL_STORAGE } from "../../constants/general.constant";
import moment from "moment";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTriggerBack, setTriggerEdit } from "../../redux/features/practitioner/practitionerSlice";

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    birthday: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    email: Yup.string().email('Địa chỉ email không hợp lệ').required("Required"),
    address: Yup.string().required("Required"),
    identifier: Yup.string().required("Required"),
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
};

const EditPractitioner = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();
    const inputRef = useRef<any>(null);
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [practitioner, setPractitioner] = useState<any>(defaultValue);
    const [practitionerInfo, setPractitionerInfo] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isPickImage, setIsPickImage] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { triggerEdit, triggerBack } = useAppSelector((state) => state.practitionerSlice)

    useEffect(() => {
        getProfilePractitioner()
    }, [])

    useEffect(() => {
        if (selectedFile) {
            uploadImage()
        }
    }, [selectedFile])

    const uploadImage = async () => {

        const url = `${url_api}${API_MEDIA_UPLOAD_PROFILE}`;

        if (!selectedFile) {
            warn('Please select an image file before uploading.');
            return;
        }

        const formData: FormData = new FormData();
        formData.append('file', selectedFile);

        setIsLoading(true);

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

    const getProfilePractitioner = () => {
        const url = `${url_api}${API_PROFILE_PRACTITIONER}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    const data = resp.data;
                    const dataConverted = {
                        id: data.id,
                        name: data.name,
                        birthday: data.dateOfBirth,
                        gender: data.gender,
                        phoneNumber: data.phoneNumber,
                        email: data.email,
                        address: data.address,
                        identifier: data.identification !== "null" ? data.identification : "",
                    }

                    console.log("data:", data)
                    setPractitionerInfo(data);
                    setPractitioner(dataConverted);
                }
            })
            .catch((err: any) => {
                console.log("error get profile practitioner:", err);
                error(err.response.data.error);
            });
    }

    const updatePatient = (values: any, actions: any) => {
        const url = `${url_api}${API_UPDATE_PROFILE_PRACTITIONER}`;

        const param = {
            username: values.email,
            email: values.email,
            password: null,
            identification: values.identifier,
            name: values.name,
            phoneNumber: values.phoneNumber,
            dateOfBirth: values.birthday,
            gender: values.gender,
            address: values.address,
            idSpecialty: null,
            displaySpecialty: null,
            desRoom: null,
            idRoom: null,
            startWork: null,
            endWork: null,
            type: null,
            qualifications: null
        }

        axios
            .put(url, param, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    actions.setSubmitting(false);
                    actions.resetForm();
                    dispatch(setTriggerEdit(!triggerEdit))
                    success("Update Successfully!");
                    navigate("/information");
                }
            })
            .catch((err: any) => {
                error(err.response.data.error.message || err.response.data.error)
                console.log("error update profile practitioner:", err);
            });
    }

    const handleChangeImage = (event: any) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setIsPickImage(true)
        } else {
            warn('Please select a valid image file.');
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
                            <td>{practitionerInfo.startWork ? moment(practitionerInfo.startWork).format(FORMAT_DATE) : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">End date</th>
                            <td>{practitionerInfo.endWork ? moment(practitionerInfo.endWork).format(FORMAT_DATE) : "-"}</td>
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
                        {practitionerInfo.qualificationsEdu && practitionerInfo.qualificationsEdu.map((item: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        {item.qualificationPeriodStart ? moment(item.qualificationPeriodStart).format(FORMAT_DATE) : ""} - {item.qualificationPeriodEnd ? moment(item.qualificationPeriodEnd).format(FORMAT_DATE) : ""}
                                    </th>
                                    <td>
                                        {item.qualificationText}
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
                        {practitionerInfo.qualificationsSpecActivities && practitionerInfo.qualificationsSpecActivities.map((item: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        {item.qualificationPeriodStart ? moment(item.qualificationPeriodStart).format(FORMAT_DATE) : ""} - {item.qualificationPeriodEnd ? moment(item.qualificationPeriodEnd).format(FORMAT_DATE) : ""}
                                    </th>
                                    <td>
                                        {item.qualificationText}
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
                        {practitionerInfo.qualificationsAchive && practitionerInfo.qualificationsAchive.map((item: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        {item.qualificationPeriodStart ? moment(item.qualificationPeriodStart).format(FORMAT_DATE) : ""} - {item.qualificationPeriodEnd ? moment(item.qualificationPeriodEnd).format(FORMAT_DATE) : ""}
                                    </th>
                                    <td>
                                        {item.qualificationText}
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
            <form onClick={handlePickImage}>
                <div className="h-100 d-flex flex-column" >
                    <div className="h-100">
                        {!isLoading ? !isPickImage ? <img
                            src={practitionerInfo?.photo ? practitionerInfo?.photo : USER}
                            alt="img patient"
                            className={`${practitionerInfo?.photo ? "" : "bg-image"} w-100 h-350 object-fit-cover p-2 border`}
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
                    <p className="button button--small button--primary w-100 mx-auto mt-3 p-3">
                        {selectedFile ? "Edit" : "Add"} profile picture
                    </p>
                </div>
            </form>
        );
    };

    return (
        <Formik
            initialValues={practitioner}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
                updatePatient(values, actions)

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
                            onClick={() => { navigate("/information"); dispatch(setTriggerBack(!triggerBack)) }}
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
