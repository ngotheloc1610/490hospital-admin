import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import { defineConfigPost } from "../../Common/utils";
import { success } from "../../Common/notify";

interface IPropsConfirm {
  handleCloseConfirmPopup: (value: boolean) => void;
}

const PopUpConfirm = (props: IPropsConfirm) => {
  const { handleCloseConfirmPopup } = props;

  const url_api = process.env.REACT_APP_API_URL;

  const handleDelete = () => {
    // const url = `${url_api}${API_DELETE_PATIENT}/${patientDetail.id}`;
    // axios.delete(url, defineConfigPost()).then(resp => {
    //     if (resp) {
    //         success("Delete Successfully");
    //         handleCloseConfirmPopup(false);
    //         setIsDelete(true);
    //     }
    // }).catch(err => {
    //     console.log("err:", err)
    // })
  };

  return (
    <>
      <Modal
        centered
        show={true}
        onHide={() => {
          handleCloseConfirmPopup(false);
        }}
      >
        <Modal.Body className="mt-2 mb-2">
          <span>
            <i className="bi bi-exclamation-circle text-warning"></i>
          </span>
          <span className="ms-3 fs-18 fw-600 text-center">
            Are you sure to delete <span className="fw-bold">{}</span> in Department
            list？
          </span>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="button button--small button--outline"
            onClick={() => {
              handleCloseConfirmPopup(false);
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
