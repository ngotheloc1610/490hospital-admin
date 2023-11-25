import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { API_ACCEPT_APPOINTMENT } from "../../../constants/api.constant";
import { defineConfigGet } from "../../../Common/utils";
import { success } from "../../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTriggerAccept } from "../../../redux/features/appointment/appointmentSlice";

interface IProps {
  handleShowPopUp: any;
  appointmentId: string;
}

const PopUpAccept = (props: IProps) => {
  const { handleShowPopUp, appointmentId } = props;

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { triggerAccept } = useAppSelector(state => state.appointmentSlice)

  const acceptAppointment = () => {
    const url = `${url_api}${API_ACCEPT_APPOINTMENT}${appointmentId}`;

    const params = {
      idPractitioner: "",
      namePractitioner: ""
    }

    axios
      .post(url, defineConfigGet(params))
      .then((resp) => {
        if (resp) {
          dispatch(setTriggerAccept(!triggerAccept))
          success("Accept Successfully");
          handleShowPopUp(false);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
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
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpAccept;
