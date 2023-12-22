import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { defineConfigGet } from "../../Common/utils";
import { API_BLOCK_PRACTITIONER } from "../../constants/api.constant";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { success } from "../../Common/notify";
import { setShowPopUpConfirmBlock, setTriggerBlock } from "../../redux/features/practitioner/practitionerSlice";
import { useState } from "react";


const PopUpConfirmBlock = () => {

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const { practitioner, triggerBlock } = useAppSelector((state) => state.practitionerSlice)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [reason, setReason] = useState<string>("")

  const blockPatient = () => {
    const url = `${url_api}${API_BLOCK_PRACTITIONER}${practitioner.id}`;

    setIsLoading(true)

    axios
      .get(url, defineConfigGet({ reason: reason }))
      .then((resp: any) => {
        if (resp) {
          setIsLoading(false)
          if (practitioner?.practitionerTarget?.active === true) {
            success("Unblock Successfully");
          } else {
            success("Block Successfully");
          }
          dispatch(setTriggerBlock(!triggerBlock));
          dispatch(setShowPopUpConfirmBlock(false));
        }
      })
      .catch((err) => {
        setIsLoading(false)
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
            Are you sure to {practitioner?.practitionerTarget?.active ? "block" : "unblock"}
            <span className="fw-bold">{practitioner?.nameFirstRep?.text}</span> in practitioner
            list？
          </span>
          <input className="form-control mt-3" value={reason} onChange={(e: any) => setReason(e.target.value)} placeholder="Reason block/unblock practitioner..." />
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
export default PopUpConfirmBlock;
