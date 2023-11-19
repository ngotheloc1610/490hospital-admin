import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";
import moment from "moment";

import EditPractitioner from "./EditPractitioner";
import { defineConfigPost } from "../../Common/utils";
import { API_PROFILE_PRACTITIONER } from "../../constants/api.constant";
import { USER } from "../../assets";
import { FORMAT_DATE } from "../../constants/general.constant";
import Layout from "../../components/Layout";

const Information = () => {
    const [practitioner, setPractitioner] = useState<any>({});

    const outlet = useOutlet();
    const navigate = useNavigate();
    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getPractitionerInfo()
    }, []);

    const getPractitionerInfo = () => {
        const url = `${url_api}${API_PROFILE_PRACTITIONER}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    console.log("resp:", resp)
                    setPractitioner(resp.data);
                }
            })
            .catch((err) => {
                console.log("err:", err);
            });
    }

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
                            <td>{practitioner.start ? moment(practitioner.start).format(FORMAT_DATE) : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">End date</th>
                            <td>{practitioner.end ? moment(practitioner.end).format(FORMAT_DATE) : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Position</th>
                            <td>{practitioner.desRoom ? practitioner.desRoom : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Specialty</th>
                            <td>{practitioner.displaySpecialty ? practitioner.displaySpecialty : "-"}</td>
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
                        {practitioner.educations && practitioner.educations.map((item: any) => {
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
                        {practitioner.experiences && practitioner.experiences.map((item: any) => {
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
                        {practitioner.achievements && practitioner.achievements.map((item: any) => {
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

    return (
        <Layout>
            <section className="patient-detail container">
                {outlet ? <EditPractitioner /> :
                    <>
                        <div>
                            <div className="pb-3 mb-3 d-flex justify-content-between">
                                <h3 className="fw-bold text-uppercase">{practitioner?.nameFirstRep?.text}</h3>
                                <div>
                                    <button className="button button--info button--small me-3" onClick={() => navigate("/change-password")}>Change Password</button>
                                    <button className="button button--primary button--small" onClick={() => navigate(`/information/${practitioner.id}`)}>Edit</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Gender</th>
                                                <td>{practitioner.gender ? practitioner.gender : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Date of birth</th>
                                                <td>{practitioner.dateOfBirth ? moment(practitioner.dateOfBirth, 'ddd MMM DD HH:mm:ss z YYYY').format(FORMAT_DATE) : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>{practitioner.address ? practitioner.address : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Citizen identification</th>
                                                <td>{practitioner.city ? practitioner.city : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Phone number</th>
                                                <td>{practitioner.phoneNumber ? practitioner.phoneNumber : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Email</th>
                                                <td>{practitioner.email ? practitioner.email : "-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-4">
                                    <div className="h-100 d-flex flex-column">
                                        <div className="h-100">
                                            <img
                                                src={practitioner ? `data:${practitioner.photo[0]?.contentType};base64,${practitioner.photo[0]?.data}` : USER}
                                                alt=""
                                                className={`h-100 w-100 d-block m-auto ${practitioner ? "" : "bg-image"}`}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {_renderWorkInfo()}
                            {/* {_renderEducationInfo()}
                            {_renderSpecializedActivities()}
                            {_renderAchievement()}  */}

                        </div>
                    </>
                }
            </section>
        </Layout>

    )
}

export default Information