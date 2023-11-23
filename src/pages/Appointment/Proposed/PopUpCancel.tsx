import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { API_CANCEL_APPOINTMENT } from "../../../constants/api.constant";
import { defineConfigPost } from "../../../Common/utils";
import { success } from "../../../Common/notify";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setTriggerNoShow } from "../../../redux/features/appointment/appointmentSlice";

interface IProps {
  handleShowPopUp: any;
  appointmentId: string;
}

const PopUpCancel = (props: IProps) => {
  const { handleShowPopUp, appointmentId } = props;

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { triggerNoShow } = useAppSelector(state => state.appointmentSlice)

  const cancelAppointment = () => {
    const url = `${url_api}${API_CANCEL_APPOINTMENT}${appointmentId}`;
    axios
      .post(url, defineConfigPost())
      .then((resp) => {
        if (resp) {
          dispatch(setTriggerNoShow(!triggerNoShow))
          success("Canceled Successfully");
          handleShowPopUp(false);
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
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
            onClick={() => handleCancel()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpCancel;
