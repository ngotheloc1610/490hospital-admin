import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { API_DENY_APPOINTMENT } from "../../../constants/api.constant";
import { defineConfigGet } from "../../../Common/utils";
import { success } from "../../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTriggerDeny } from "../../../redux/features/appointment/appointmentSlice";

interface IProps {
  handleShowPopUp: any;
  appointmentId: string;
}

const PopUpDeny = (props: IProps) => {
  const { handleShowPopUp, appointmentId } = props;

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { triggerDeny } = useAppSelector(state => state.appointmentSlice)

  const denyAppointment = () => {
    const url = `${url_api}${API_DENY_APPOINTMENT}${appointmentId}`;

    const params = {
      idPractitioner: "",
      namePractitioner: ""
    }

    axios
      .post(url, defineConfigGet(params))
      .then((resp) => {
        if (resp) {
          dispatch(setTriggerDeny(!triggerDeny))
          success("Deny Successfully");
          handleShowPopUp(false);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  };

  const handleDeny = () => {
    denyAppointment();
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
            Are you sure to deny appointment？
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
            onClick={() => handleDeny()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpDeny;
