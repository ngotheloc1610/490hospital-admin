import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { API_PRACTITIONER_CANCEL_APPOINTMENT } from "../../constants/api.constant";
import { defineConfigGet, defineConfigPost } from "../../Common/utils";
import { error, success } from "../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTriggerCancel } from "../../redux/features/appointment/appointmentSlice";
import { KEY_LOCAL_STORAGE } from "../../constants/general.constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface IProps {
  handleShowPopUp: any;
}

const PopUpCancel = (props: IProps) => {
  const { handleShowPopUp } = props;

  const url_api = process.env.REACT_APP_API_URL;
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const dispatch = useAppDispatch();
  const { triggerDeny, appointment } = useAppSelector(state => state.appointmentSlice)

  const cancelAppointment = () => {
    const accountID: any = localStorage.getItem(KEY_LOCAL_STORAGE.ID);
    const accountName: any = localStorage.getItem(KEY_LOCAL_STORAGE.NAME);
    const url = `${url_api}${API_PRACTITIONER_CANCEL_APPOINTMENT}${appointment?.idAppointment}`;
    setIsLoading(true)

    const params = {
      reference: accountID,
      display: accountName,
      type: "",
      identifier: null
    }

    axios
      .post(url, params, defineConfigPost())
      .then((resp) => {
        setIsLoading(false)
        if (resp) {
          dispatch(setTriggerCancel(!triggerDeny))
          success("Cancel Successfully");
          handleShowPopUp(false);
          navigate('/book-appointment');
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
        setIsLoading(false)
        error(err.response.data.error);

      });
  };

  const handleCancel = () => {
    cancelAppointment();
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
            Are you sure to cancel appointment？
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
            onClick={() => handleCancel()}
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
export default PopUpCancel;
