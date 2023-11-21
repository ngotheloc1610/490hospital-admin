import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { defineConfigGet } from "../../Common/utils";
import { API_BLOCK_PRACTITIONER } from "../../constants/api.constant";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { success } from "../../Common/notify";
import { setListBlock, setShowPopUpConfirmBlock, setTriggerBlock } from "../../redux/features/practitioner/practitionerSlice";


const PopUpConfirmBlock = () => {

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { practitioner, listBlock,triggerBlock } = useAppSelector((state) => state.practitionerSlice)

  const blockPatient = () => {
    const url = `${url_api}${API_BLOCK_PRACTITIONER}${practitioner.id}`;

    axios
      .get(url, defineConfigGet({}))
      .then((resp: any) => {
        if (resp) {
          success("Block Successfully");
          dispatch(setTriggerBlock(!triggerBlock));
          dispatch(setShowPopUpConfirmBlock(false));
          dispatch(setListBlock([...listBlock, practitioner.id]));
        }
      })
      .catch((err) => {
        console.log("error block practitioner:", err);
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
            <span className="fw-bold">{practitioner?.nameFirstRep?.text}</span> in practitioner
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
