import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

import EditPractitioner from "./EditPractitioner";
import { defineConfigGet } from "../../Common/utils";
import Layout from "../../components/Layout";
import { API_PROFILE_PRACTITIONER } from "../../constants/api.constant";
import { USER } from "../../assets";
import moment from "moment";
import { FORMAT_DATE } from "../../constants/general.constant";

const Information = () => {
    const inputRef = useRef<any>(null);
    const [practitioner, setPractitioner] = useState<any>({});
    const [image, setImage] = useState<any>("");

    const outlet = useOutlet();
    const navigate = useNavigate();
    const url_api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        getPractitionerInfo()
    }, []);

    const getPractitionerInfo = () => {
        const url = `${url_api}${API_PROFILE_PRACTITIONER}`;

        axios
            .get(url, defineConfigGet({}))
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


    const handleChangeImage = (event: any) => {
        const file = event.target.files[0];
        setImage(file);
    };

    const handlePickImage = () => {
        inputRef.current.click();
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
                            <td>{practitioner.period?.start}</td>
                        </tr>
                        <tr>
                            <th scope="row">End date</th>
                            <td>{practitioner.period?.end}</td>
                        </tr>
                        <tr>
                            <th scope="row">Position</th>
                            <td>{practitioner?.organization?.display}</td>
                        </tr>
                        <tr>
                            <th scope="row">Specialty</th>
                            <td>{practitioner.specialty?.length > 0 && practitioner.specialty.map((spec: any) => {
                                return <span>{spec.coding[0].display}</span>
                            })}</td>
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
                        {practitioner.educations?.length > 0 && practitioner.educations.map((edu: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        {edu.year}
                                    </th>
                                    <td>
                                        {edu.detail}
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
                        {practitioner.experiences?.length > 0 && practitioner.experiences.map((exper: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        <span>{exper.timeStart} - {exper.timeEnd}</span>
                                    </th>
                                    <td>
                                        {exper.detail}
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
                        {practitioner.achievements?.length > 0 && practitioner.achievements.map((achi: any) => {
                            return (
                                <tr>
                                    <th scope="row" style={{ width: "15%" }}>
                                        {achi.time}
                                    </th>
                                    <td>
                                        {achi.detial}
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
                                                <td>{practitioner?.gender}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Date of birth</th>
                                                <td>{moment(practitioner?.dateOfBirth, 'ddd MMM DD HH:mm:ss z YYYY').format(FORMAT_DATE)}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>{practitioner?.address}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Citizen identification</th>
                                                <td>{practitioner?.city}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Phone number</th>
                                                <td>{practitioner?.phoneNumber}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Email</th>
                                                <td>
                                                    {
                                                        practitioner?.email
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-4">
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
                                    </div>
                                </div>
                            </div>

                            {/* {_renderWorkInfo()}
                            {_renderEducationInfo()}
                            {_renderSpecializedActivities()}
                            {_renderAchievement()} */}

                        </div>
                    </>
                }
            </section>
        </Layout>

    )
}

export default Information