import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { API_ACCEPT_APPOINTMENT } from "../../constants/api.constant";
import { defineConfigPost } from "../../Common/utils";
import { error, success } from "../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setTriggerAccept } from "../../redux/features/appointment/appointmentSlice";
import { KEY_LOCAL_STORAGE } from "../../constants/general.constant";
import { useState } from "react";

interface IProps {
  handleShowPopUp: any;
}

const PopUpAccept = (props: IProps) => {
  const { handleShowPopUp } = props;

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { triggerAccept, appointment } = useAppSelector(state => state.appointmentSlice)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const acceptAppointment = () => {
    const url = `${url_api}${API_ACCEPT_APPOINTMENT}${appointment?.idAppointment}`;

    const accountID: any = localStorage.getItem(KEY_LOCAL_STORAGE.ID);
    const accountName: any = localStorage.getItem(KEY_LOCAL_STORAGE.NAME);

    const params = {
      reference: accountID,
      display: accountName,
      type: "",
      identifier: null
    }
    setIsLoading(true)

    axios
      .post(url, params, defineConfigPost())
      .then((resp) => {
        setIsLoading(false)
        if (resp) {
          dispatch(setTriggerAccept(!triggerAccept))
          success("Accept Successfully");
          handleShowPopUp(false);
        }
      })
      .catch((err: any) => {
        console.log("error accept appointment:", err);
        setIsLoading(false)
        error(err.response.data.error || err.response.data.error.message);

      });
  };

  const handleAccept = () => {
    acceptAppointment();
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
            Are you sure to accept appointment？
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
            onClick={() => handleAccept()}
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
export default PopUpAccept;
