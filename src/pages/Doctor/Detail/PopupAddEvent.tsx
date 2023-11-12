import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { defineConfigPost } from "../../../Common/utils";
import { success } from "../../../Common/notify";

interface IPropsConfirm {
  handleCloseConfirmPopup: (value: boolean) => void;
}

const PopUpAddEvent = (props: IPropsConfirm) => {
  const { handleCloseConfirmPopup } = props;

  const url_api = process.env.REACT_APP_API_URL;


  return (
    <>
      <Modal
        centered
        show={true}
        onHide={() => {
          handleCloseConfirmPopup(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Modal body text goes here.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleCloseConfirmPopup(false);
          }}>Close</Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpAddEvent;
