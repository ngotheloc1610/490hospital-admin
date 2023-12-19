import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { API_DIAGNOSTIC_CREATE_ENCOUNTER } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import { error, success } from "../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTriggerArrived } from "../../redux/features/appointment/appointmentSlice";
import { setIdEncounter } from "../../redux/features/diagnostic/diagnosticSlice";
import { useState } from "react";

interface IProps {
    handleShowPopUp: any;
}

const PopUpArrived = (props: IProps) => {
    const { handleShowPopUp } = props;

    const { triggerArrived, appointment } = useAppSelector(state => state.appointmentSlice)
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const url_api = process.env.REACT_APP_API_URL;

    const arrivedAppointment = () => {
        const url = `${url_api}${API_DIAGNOSTIC_CREATE_ENCOUNTER}${appointment?.idAppointment}`;

        const param = {
            param: appointment?.specialty
        }
        setIsLoading(true)

        axios
            .post(url, param, defineConfigPost())
            .then((resp) => {
                setIsLoading(false)
                if (resp) {
                    dispatch(setIdEncounter(resp.data.id))
                    dispatch(setTriggerArrived(!triggerArrived))
                    success("Arrived Successfully");
                    handleShowPopUp(false);
                }
            })
            .catch((err: any) => {
                console.log("error accept appointment:", err);
                setIsLoading(false)
                error(err.response.data.error || err.response.data.error.message);

            });
    };

    const handleArrived = () => {
        arrivedAppointment();
    };

    return (
        <>
            <Modal
                centered
                show={true}
                onHide={() => {
                    handleShowPopUp(false);
                }}
            >
                <Modal.Body className="mt-2 mb-2">
                    <span>
                        <i className="bi bi-exclamation-circle text-warning"></i>
                    </span>
                    <span className="ms-3 fs-18 fw-600 text-center">
                        Are you sure to arrived appointment？
                    </span>
                </Modal.Body>
                <Modal.Footer className="justify-content-center">
                    <Button
                        className="button button--small button--outline"
                        onClick={() => {
                            handleShowPopUp(false);
                        }}
                    >
                        No
                    </Button>
                    <Button
                        className="button button--small button--primary"
                        onClick={() => handleArrived()}
                    >
                        {isLoading &&
                            <span className="spinner-border my-auto" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </span>}
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default PopUpArrived;
