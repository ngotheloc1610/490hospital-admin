import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { API_ALERT_DELETE } from "../../constants/api.constant";
import { defineConfigPost } from "../../Common/utils";
import { error, success } from "../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDelete } from "../../redux/features/alert/alertSlice";

interface IProps {
    handleShowPopUp: any;
    idAlertSetting: string;
}

const PopUpAlert = (props: IProps) => {
    const { handleShowPopUp, idAlertSetting } = props;

    const url_api = process.env.REACT_APP_API_URL;
    const dispatch = useAppDispatch();
    const { isDelete } = useAppSelector(state => state.alertSlice)

    const deleteAlert = () => {
        const url = `${url_api}${API_ALERT_DELETE}${idAlertSetting}`;

        axios
            .delete(url, defineConfigPost())
            .then((resp) => {
                if (resp) {
                    success("Delete Alert Successfully");
                    dispatch(setDelete(!isDelete));
                    handleShowPopUp(false);
                }
            })
            .catch((err: any) => {
                console.log("err:", err);
                error(err.response.data.error);

            });
    };

    const handleDeleteAlert = () => {
        deleteAlert();
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
                        Are you sure to delete alert?
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
                        onClick={() => handleDeleteAlert()}
                    >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default PopUpAlert;
