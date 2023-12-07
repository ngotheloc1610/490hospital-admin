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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setPractitioner } from "../../redux/features/practitioner/practitionerSlice";

const Information = () => {
    const [practitionerInfo, setPractitionerInfo] = useState<any>({});

    const outlet = useOutlet();
    const navigate = useNavigate();
    const url_api = process.env.REACT_APP_API_URL;
    const { triggerEdit } = useAppSelector((state) => state.practitionerSlice)
    const dispatch = useAppDispatch();

    useEffect(() => {
        getProfilePractitioner()
    }, [triggerEdit]);

    const getProfilePractitioner = () => {
        const url = `${url_api}${API_PROFILE_PRACTITIONER}`;

        axios
            .get(url, defineConfigPost())
            .then((resp: any) => {
                if (resp) {
                    setPractitionerInfo(resp.data);
                }
            })
            .catch((err) => {
                console.log("error get profile practitioner:", err);
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
                            <td>{practitionerInfo?.startWork ? moment(practitionerInfo.startWork).format(FORMAT_DATE) : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">End date</th>
                            <td>{practitionerInfo?.endWork ? moment(practitionerInfo.endWork).format(FORMAT_DATE) : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Room</th>
                            <td>{practitionerInfo?.desRoom ? practitionerInfo.desRoom : "-"}</td>
                        </tr>
                        <tr>
                            <th scope="row">Specialty</th>
                            <td>{practitionerInfo?.displaySpecialty ? practitionerInfo.displaySpecialty : "-"}</td>
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
                                        {moment(item.qualificationPeriodStart).format(FORMAT_DATE)} - {moment(item.qualificationPeriodEnd).format(FORMAT_DATE)}
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
                                        {moment(item.qualificationPeriodStart).format(FORMAT_DATE)} - {moment(item.qualificationPeriodEnd).format(FORMAT_DATE)}
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
                                        {moment(item.qualificationPeriodStart).format(FORMAT_DATE)} - {moment(item.qualificationPeriodEnd).format(FORMAT_DATE)}
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

    return (
        <Layout>
            <section className="patient-detail container" >
                {outlet ? <EditPractitioner /> :
                    <>
                        <div>
                            <div className="pb-3 mb-3 d-flex justify-content-between">
                                <h3 className="fw-bold text-uppercase">{practitionerInfo?.name}</h3>
                                <div>
                                    <button className="button button--info button--small me-3" onClick={() => { navigate("/change-password"); dispatch(setPractitioner(practitionerInfo)) }}>Change Password</button>
                                    <button className="button button--primary button--small" onClick={() => navigate(`/information/${practitionerInfo?.id}`)}>Edit</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <th scope="row">Gender</th>
                                                <td>{practitionerInfo?.gender ? practitionerInfo.gender : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Date of birth</th>
                                                <td>{practitionerInfo?.dateOfBirth ? moment(practitionerInfo.dateOfBirth, 'ddd MMM DD HH:mm:ss z YYYY').format(FORMAT_DATE) : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Address</th>
                                                <td>{practitionerInfo?.address ? practitionerInfo.address : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Citizen identification</th>
                                                <td>{practitionerInfo?.identification ? practitionerInfo.identification : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Phone number</th>
                                                <td>{practitionerInfo?.phoneNumber ? practitionerInfo.phoneNumber : "-"}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row">Email</th>
                                                <td>{practitionerInfo?.email ? practitionerInfo.email : "-"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-4">
                                    <div className="h-100 d-flex flex-column">
                                        <div className="h-100">
                                            <img
                                                src={practitionerInfo?.photo?.length > 0 ? practitionerInfo?.photo[0]?.url : USER}
                                                alt="img practitioner"
                                                className={`d-block m-auto ${practitionerInfo ? "" : "bg-image"}`}
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {_renderWorkInfo()}
                            {_renderEducationInfo()}
                            {_renderSpecializedActivities()}
                            {_renderAchievement()}
                        </div>
                    </>
                }
            </section>
        </Layout>

    )
}

export default Information