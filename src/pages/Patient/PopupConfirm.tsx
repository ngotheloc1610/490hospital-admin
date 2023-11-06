import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { defineConfigPost } from "../../Common/utils";
import { success } from "../../Common/notify";
import { API_DELETE_PATIENT } from "../../constants/api.constant";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowPopUpConfirm, setTriggerDelete } from "../../redux/features/patient/patientSlice";
import { useNavigate } from "react-router-dom";


const PopUpConfirm = () => {

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { triggerDelete, patient } = useAppSelector((state) => state.patientSlice)


  const handleDelete = () => {
    const url = `${url_api}${API_DELETE_PATIENT}${patient.id}`;
    axios.delete(url, defineConfigPost()).then(resp => {
      if (resp) {
        success("Delete Successfully");
        dispatch(setTriggerDelete(!triggerDelete));
        dispatch(setShowPopUpConfirm(false));
        navigate("/patient");
      }
    }).catch((err: any) => {
      console.log("err:", err)
    })
  };

  return (
    <>
      <Modal
        centered
        show={true}
        onHide={() => {
          dispatch(setShowPopUpConfirm(false));
        }}
      >
        <Modal.Body className="mt-2 mb-2">
          <span>
            <i className="bi bi-exclamation-circle text-warning"></i>
          </span>
          <span className="ms-3 fs-18 fw-600 text-center">
            Are you sure to delete
            <span className="fw-bold">{patient?.nameFirstRep?.nameAsSingleString || patient?.name}</span> in Patient
            list？
          </span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="button button--small button--outline"
            onClick={() => {
              dispatch(setShowPopUpConfirm(false));
            }}
          >
            No
          </Button>
          <Button
            className="button button--small button--primary"
            onClick={() => handleDelete()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpConfirm;
