import { Button, Modal } from "react-bootstrap";
import { API_INBOX_ROOM_CREATE } from "../../constants/api.constant";
import axios from "axios";
import { defineConfigPost } from "../../Common/utils";

interface IProps {
    handleShowPopUp: any
}

const PopUpCreateRoom = (props: IProps) => {

    const {handleShowPopUp} = props

  const url_api = process.env.REACT_APP_API_URL;

  const createRoom = () => {
    const url = `${url_api}${API_INBOX_ROOM_CREATE}`;

    const params = {
        patientId: "",
        organizationId: ""
    }

    axios
        .post(url, params, defineConfigPost())
        .then((resp: any) => {
            if (resp) {
            console.log("resp:", resp)
            }
        })
        .catch((err) => {
            // error(err.response.data.errors.message)
            console.log("err:", err);
        });
  }

  const handleCreateRoom = ( ) =>{

  }


  return (
    <>
      <Modal
        centered
        show={true}
        onHide={() => {
            handleShowPopUp(false)
        }}
      >
        <Modal.Header  onClick={() => {
                handleShowPopUp(false)
        }}>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-2 mb-2">
         
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="button button--small button--outline"
            onClick={() => {
                handleShowPopUp(false)
            }}
          >
            Close
          </Button>
          <Button
            className="button button--small button--primary"
            onClick={() => handleCreateRoom()}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PopUpCreateRoom;
