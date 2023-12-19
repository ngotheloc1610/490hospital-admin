import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { error, success } from "../../Common/notify";
import { defineConfigGet } from "../../Common/utils";
import { API_NO_SHOW_APPOINTMENT } from "../../constants/api.constant";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTriggerNoShow } from "../../redux/features/appointment/appointmentSlice";
import { KEY_LOCAL_STORAGE } from "../../constants/general.constant";
import { useState } from "react";


interface IProps {
    handleShowPopUp: any;
}

const PopUpNoShow = (props: IProps) => {
    const { handleShowPopUp } = props;

    const { triggerNoShow, appointment } = useAppSelector(state => state.appointmentSlice)
    const dispatch = useAppDispatch();

    const url_api = process.env.REACT_APP_API_URL;
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const noshowAppointment = () => {
        const url = `${url_api}${API_NO_SHOW_APPOINTMENT}${appointment?.idAppointment}`;

        const accountID: any = localStorage.getItem(KEY_LOCAL_STORAGE.ID);

        const params = {
            idPatient: accountID,
        }
        setIsLoading(true)

        axios
            .post(url, defineConfigGet(params))
            .then((resp) => {
                setIsLoading(false)
                if (resp) {
                    dispatch(setTriggerNoShow(!triggerNoShow))
                    success("No Show Successfully");
                    handleShowPopUp(false);
                }
            })
            .catch((err: any) => {
                console.log("error accept appointment:", err);
                setIsLoading(false)
                error(err.response.data.error || err.response.data.error.message);

            });
    };

    const handleNoshow = () => {
        noshowAppointment();
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
                        Are you sure to no show appointment？
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
                        onClick={() => handleNoshow()}
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
export default PopUpNoShow;
