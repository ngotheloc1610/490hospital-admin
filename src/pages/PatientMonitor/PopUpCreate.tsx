import { Button, Modal } from "react-bootstrap";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface IProps {
  setIsShowPopUp: any;
}

const PopUpCreate = (props: IProps) => {
  const { setIsShowPopUp } = props;

  const url_api = process.env.REACT_APP_API_URL;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [condition, setCondition] = useState<string>("");
  const [bodySite, setBodySite] = useState<string>("");
  const [severity, setSeverity] = useState<string>("");
  const [clinicalStatus, setClinicalStatus] = useState<string>("");
  const [recordedDate, setRecordedDate] = useState<string>("");
  const [onsetDate, setOnsetDate] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const [listCondition, setListCondition] = useState<any>([]);
  const [listBodySite, setListBodySite] = useState<any>([]);
  const [listSeverity, setListSeverity] = useState<any>([]);
  const [listClinicalStatus, setListClinicalStatus] = useState<any>([]);

  const handleCreate = () => {};

  const _renderListCondition = () => {
    return (
      <>
        <option hidden>Select conditions</option>
        {listCondition ? (
          listCondition.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListBodySite = () => {
    return (
      <>
        <option hidden>Select a status</option>
        {listBodySite ? (
          listBodySite.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListSeverity = () => {
    return (
      <>
        <option hidden>Select severity level</option>
        {listSeverity ? (
          listSeverity.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  const _renderListClinicalStatus = () => {
    return (
      <>
        <option hidden>Select a status</option>
        {listClinicalStatus ? (
          listClinicalStatus.map((item: any) => (
            <option value={item.name} key={item.code}>
              {item.name}
            </option>
          ))
        ) : (
          <option disabled>No option</option>
        )}
      </>
    );
  };

  return (
    <>
      <Modal
        centered
        size="xl"
        show={true}
        onHide={() => {
          setIsShowPopUp(false);
        }}
      >
        <Modal.Header>
          <span className="fw-bold">Previous Problem</span>
        </Modal.Header>
        <Modal.Body className="mt-2 mb-2">
          <div className="row g-3">
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="condition" className="my-auto">
                  Condition<span className="text-danger">*</span>
                </label>
                <select
                  style={{ width: "75%" }}
                  className="form-select"
                  id="condition"
                  onChange={(e: any) => setCondition(e.target.value)}
                  value={condition}
                >
                  {_renderListCondition()}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="bodySite" className="my-auto">
                  Body Site
                </label>
                <select
                  style={{ width: "75%" }}
                  className="form-select"
                  id="bodySite"
                  onChange={(e: any) => setBodySite(e.target.value)}
                  value={bodySite}
                >
                  {_renderListBodySite()}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="severity" className="my-auto">
                  Severity
                </label>
                <select
                  style={{ width: "75%" }}
                  className="form-select"
                  id="severity"
                  onChange={(e: any) => setSeverity(e.target.value)}
                  value={severity}
                >
                  {_renderListSeverity()}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="clinicalStatus" className="my-auto">
                  Clinical Status<span className="text-danger">*</span>
                </label>
                <select
                  style={{ width: "75%" }}
                  className="form-select"
                  id="clinicalStatus"
                  onChange={(e: any) => setClinicalStatus(e.target.value)}
                  value={clinicalStatus}
                >
                  {_renderListClinicalStatus()}
                </select>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="recordedDate" className="my-auto">
                  Recorded Date
                </label>
                <input
                  style={{ width: "75%" }}
                  id="recordedDate"
                  type="date"
                  className={`form-control`}
                  value={recordedDate}
                  onChange={(e: any) => setRecordedDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <label htmlFor="onsetDate" className="my-auto">
                  Onset Date
                </label>
                <input
                  style={{ width: "75%" }}
                  id="onsetDate"
                  type="date"
                  className={`form-control`}
                  value={onsetDate}
                  onChange={(e: any) => setOnsetDate(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="d-flex justify-content-between">
                <label htmlFor="note">Note</label>
                <textarea
                  style={{ width: "88%" }}
                  className="p-3 rounded"
                  cols={5}
                  rows={5}
                  placeholder="Add notes here"
                  id="note"
                  value={note}
                  onChange={(e: any) => setNote(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button
            className="button button--small button--outline"
            onClick={() => {
              setIsShowPopUp(false);
            }}
          >
            No
          </Button>
          <Button
            className="button button--small button--primary"
            onClick={() => handleCreate()}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PopUpCreate;
