import { useState } from "react";
import { LOGO_HOSPITAL } from "../../assets";
import Layout from "../../components/Layout";
import { GENDER_ALL, TYPE_PRACTITIONER } from "../../constants";
import { API_CREATE_PRACTITIONER } from "../../constants/api.constant";
import { defineConfigPost } from "../../Common/utils";
import axios from "axios";
import { success, warn } from "../../Common/notify";

const Practitioner = () => {
    const url_api = process.env.REACT_APP_API_URL;

    const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
    const [isShowCfPassword, setIsShowCfPassword] = useState<boolean>(false);

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cfPassword, setCfPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [birthDay, setBirthDay] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [type, setType] = useState<string>("");

    const createPractitioner = () => {
        const url = `${url_api}${API_CREATE_PRACTITIONER}`;

        const params = {
            identifier: [],
            username: username,
            password: password,
            active: true,
            name: [{
                use: name,
                text: name,
                family: name,
                given: [],
                prefix: [],
                suffix: [],
                period: null
            }],
            type: type,
            telecom: [{
                system: "",
                value: phoneNumber,
                use: "",
                rank: 0,
                period: null
            }],
            address: [],
            gender: gender,
            birthDate: birthDay,
            photo: [],
            qualification: [],
            communication: []
        }

        axios
            .post(url, params, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    success(`Create practitioner ${type} successfully!`);

                }
            })
            .catch((err) => {
                console.log("err:", err);
            });
    }

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
                                    {TYPE_PRACTITIONER.map((item: any, idx: number) => {
                                        return (
                                            <div className="form-check form-check-inline">
                                                <div>
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="type"
                                                        id={item.code}
                                                        value={item.code}
                                                        onChange={(e: any) => setType(e.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.code}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="col-6 d-flex justify-content-between ">
                                    {GENDER_ALL.map((item: any, idx: number) => {
                                        return (
                                            <div className="form-check form-check-inline">
                                                <div>
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="gender"
                                                        id={item.code}
                                                        value={item.code}
                                                        onChange={(e: any) => setGender(e.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor={item.code}>
                                                        {item.name}
                                                    </label>
                                                </div>
                                            </div>
                                        );
                                    })}
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
