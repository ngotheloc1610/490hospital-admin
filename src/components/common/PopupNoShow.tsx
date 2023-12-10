import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { error, success } from "../../Common/notify";
import { defineConfigGet } from "../../Common/utils";
import { API_NO_SHOW_APPOINTMENT } from "../../constants/api.constant";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";


interface IProps {
    handleShowPopUp: any;
    appointment: any;
}

const PopUpNoShow = (props: IProps) => {
    const { handleShowPopUp, appointment } = props;

    const { profile } = useAppSelector(state => state.practitionerSlice)
    const { triggerAccept } = useAppSelector(state => state.appointmentSlice)
    const dispatch = useAppDispatch();

    const url_api = process.env.REACT_APP_API_URL;


    const noshowAppointment = () => {
        const url = `${url_api}${API_NO_SHOW_APPOINTMENT}${appointment.idAppointment}`;

        const params = {
            idPatient: profile?.id,
        }

        axios
            .post(url, defineConfigGet(params))
            .then((resp) => {
                if (resp) {
                    //   dispatch(setTriggerAccept(!triggerAccept))
                    success("No Show Successfully");
                    handleShowPopUp(false);
                }
            })
            .catch((err: any) => {
                console.log("error accept appointment:", err);
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
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default PopUpNoShow;
