import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { API_ALERT_DELETE } from "../../constants/api.constant";
import { defineConfigPost } from "../../Common/utils";
import { error, success } from "../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDelete } from "../../redux/features/alert/alertSlice";
import { useState } from "react";

interface IProps {
    handleShowPopUp: any;
    idAlertSetting: string;
}

const PopUpAlert = (props: IProps) => {
    const { handleShowPopUp, idAlertSetting } = props;

    const url_api = process.env.REACT_APP_API_URL;
    const dispatch = useAppDispatch();
    const { isDelete } = useAppSelector(state => state.alertSlice)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const deleteAlert = () => {
        const url = `${url_api}${API_ALERT_DELETE}${idAlertSetting}`;
        setIsLoading(true)
        axios
            .delete(url, defineConfigPost())
            .then((resp) => {
                setIsLoading(false)
                if (resp) {
                    success("Delete Alert Successfully");
                    dispatch(setDelete(!isDelete));
                    handleShowPopUp(false);
                }
            })
            .catch((err: any) => {
                console.log("err:", err);
                setIsLoading(false)
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
export default PopUpAlert;
