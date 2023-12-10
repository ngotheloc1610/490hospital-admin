import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { defineConfigGet } from "../../Common/utils";
import { API_BLOCK_PATIENT } from "../../constants/api.constant";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowPopUpConfirmBlock, setTriggerBlock } from "../../redux/features/patient/patientSlice";
import { success } from "../../Common/notify";


const PopUpConfirmBlock = () => {

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { triggerBlock, patient } = useAppSelector((state) => state.patientSlice)

  const blockPatient = () => {
    const url = `${url_api}${API_BLOCK_PATIENT}${patient?.id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          if (resp.data.active === true) {
            success("Unblock Successfully");
          } else {
            success("Block Successfully");
          }
          dispatch(setTriggerBlock(!triggerBlock));
          dispatch(setShowPopUpConfirmBlock(false));
        }
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }

  const handleBlock = () => {
    blockPatient()
  };

  return (
    <>
      <Modal
        centered
        show={true}
        onHide={() => {
          dispatch(setShowPopUpConfirmBlock(false));
        }}
      >
        <Modal.Body className="mt-2 mb-2">
          <span>
            <i className="bi bi-exclamation-circle text-warning"></i>
          </span>
          <span className="ms-3 fs-18 fw-600 text-center">
            Are you sure to block
            <span className="fw-bold"> {patient?.nameFirstRep?.text || patient?.name}</span> in Patient
            list？
          </span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="button button--small button--outline"
            onClick={() => {
              dispatch(setShowPopUpConfirmBlock(false));
            }}
          >
            No
          </Button>
          <Button
            className="button button--small button--primary"
            onClick={() => handleBlock()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpConfirmBlock;
