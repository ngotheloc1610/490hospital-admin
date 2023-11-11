import { useEffect, useState } from "react";
import { LOGO_HOSPITAL } from "../../assets";
import Layout from "../../components/Layout";
import { GENDER, TYPE_PRACTITIONER } from "../../constants";
import { API_ALL_GET_SPECIALTY, API_CREATE_PRACTITIONER } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import axios from "axios";
import { success, warn } from "../../Common/notify";

const Practitioner = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowCfPassword, setIsShowCfPassword] = useState<boolean>(false);

    const [listSpecialty, setListSpecialty] = useState([]);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cfPassword, setCfPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [birthDay, setBirthDay] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [specialty, setSpecialty] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    useEffect(() => {
        getSpecialty();
    }, [])


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


    const createPractitioner = () => {
        const url = `${url_api}${API_CREATE_PRACTITIONER}`;

        const params = {
            username: username,
            password: password,
            identifier: [],
            name: name,
            phoneNumber: phoneNumber,
            type: type,
            dateOfBirth: birthDay,
            photo: "",
            city: "",
            district: "",
            state: "",
            address: "",
            address2: "",
            gender: gender,
            country: "",
            postalCode: "",
            code: specialty,
            start: startDate,
            end: endDate,
        }

        axios
            .post(url, params, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)
                    success(`Create practitioner ${type} successfully!`);

                }
            })
            .catch((err) => {
                console.log("err:", err);
            });
    }

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
    const _renderListGender = () => {
        return (
            <>
                <option hidden>Gender</option>
                {GENDER.map((item: any) => (
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
                {listSpecialty.length > 0 ? (
                    listSpecialty.map((item: any) => (
                        <option value={item.code} key={item.code}>
                            {item.name}
                        </option>
                    ))
                ) : (
                    <option disabled>No option</option>
                )}
            </>
        );
    };

    const handleCreatePractitioner = () => {
        if (password !== cfPassword) {
            warn("Mật khẩu không trùng khớp!");
            return;
        }
        createPractitioner();
    }

    return (
        <Layout>
            <section className="practitioner">
                <div className="practitioner-container">
                    <div className="practitioner-container-header">
                        <img src={LOGO_HOSPITAL} alt="" />
                        <h3>Create Practitioner</h3>
                    </div>

                    <div className="practitioner-container-body mt-3">
                        <div className="container">
                            <div className="row mb-3">
                                <div className="col-6">
                                    <div className="input-group">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="bi bi-person-fill fs-5 icon-gray"></i>
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e: any) => setUsername(e.target.value)}
                                        />
                                        <span className="input-group-text"></span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        className="form-control h-100"
                                        placeholder="Full name"
                                        value={name}
                                        onChange={(e: any) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock-fill fs-5 icon-gray"></i>
                                        </span>
                                        <input
                                            type={`${isShowPassword ? "text" : "password"}`}
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e: any) => setPassword(e.target.value)}
                                        />
                                        <span
                                            className="input-group-text"
                                            onClick={() => setIsShowPassword(!isShowPassword)}
                                        >
                                            <i
                                                className={`bi ${isShowPassword ? "bi-eye-slash" : "bi-eye-fill"
                                                    } fs-5 icon-gray`}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="date"
                                        className="form-control h-100"
                                        placeholder="Date of birth"
                                        value={birthDay}
                                        onChange={(e: any) => setBirthDay(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <i className="bi bi-lock-fill fs-5 icon-gray"></i>
                                        </span>
                                        <input
                                            type={`${isShowCfPassword ? "text" : "password"}`}
                                            className="form-control"
                                            placeholder="Confirm Password"
                                            value={cfPassword}
                                            onChange={(e: any) => setCfPassword(e.target.value)}
                                        />
                                        <span
                                            className="input-group-text"
                                            onClick={() => setIsShowCfPassword(!isShowCfPassword)}
                                        >
                                            <i
                                                className={`bi ${isShowCfPassword ? "bi-eye-slash" : "bi-eye-fill"
                                                    } fs-5 icon-gray`}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <input
                                        type="text"
                                        className="form-control h-100"
                                        placeholder="Phone number"
                                        value={phoneNumber}
                                        onChange={(e: any) => setPhoneNumber(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3 ">
                                <div className="col-6 d-flex">
                                    <select
                                        className="form-select"
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        {_renderListType()}
                                    </select>
                                </div>
                                <div className="col-6 d-flex justify-content-between ">
                                    <select
                                        className="form-select"
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        {_renderListGender()}
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-6">
                                    <input
                                        type="date"
                                        className="form-control h-100"
                                        placeholder="Start Date"
                                        value={startDate}
                                        onChange={(e: any) => setStartDate(e.target.value)}
                                    />
                                </div>
                                <div className="col-6">
                                    <input
                                        type="date"
                                        className="form-control h-100"
                                        placeholder="End Date"
                                        value={endDate}
                                        onChange={(e: any) => setEndDate(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3 ">
                                <div className="col-6 d-flex">
                                    <select
                                        className="form-select"
                                        onChange={(e) => setSpecialty(e.target.value)}
                                    >
                                        {_renderListSpecialty()}
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="practitioner-container-footer">
                        <button className="button button--large button--primary w-100" onClick={() => handleCreatePractitioner()}>
                            Create
                        </button>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Practitioner;
