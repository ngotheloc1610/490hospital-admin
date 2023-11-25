import { useState } from "react";
import Layout from "../../../components/Layout";
import { useAppSelector } from "../../../redux/hooks";
import { defineConfigGet } from "../../../Common/utils";
import { API_CHANGE_PASSWORD } from "../../../constants/api.constant";
import axios from "axios";
import { error, warn } from "../../../Common/notify";

const ChangePassword = () => {

  const [isShowOldPassword, setIsShowOldPassword] = useState<boolean>(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState<boolean>(false);
  const [isShowCfNewPassword, setIsShowCfNewPassword] = useState<boolean>(false);

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [cfNewPassword, setCfNewPassword] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const { practitioner } = useAppSelector((state) => state.practitionerSlice)

  const url_api = process.env.REACT_APP_API_URL;

  const changePassword = () => {
    const url = `${url_api}${API_CHANGE_PASSWORD}${practitioner.id}`;

    const param = {
      oldPass: oldPassword.trim(),
      newPass: newPassword.trim()
    }

    axios
      .post(url, defineConfigGet(param))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp);
          if (resp) {
            setIsSuccess(true);
          }
        }
      })
      .catch((err: any) => {
        error(err.response.data.error)
        console.log("error update patient:", err);
      });
  }

  const handleChangePassword = () => {
    if (oldPassword) {
      warn("Nhập mật khẩu cũ!");
      return;
    }
    if (oldPassword === newPassword) {
      warn("Trùng với mật khẩu cũ ! Vui lòng nhập lại.");
      return;
    }
    if (newPassword === cfNewPassword) {
      warn("Mật khẩu không trùng khớp!");
      return;
    }
    changePassword();
  }

  const _renderChangePassword = () => {
    return (
      <div className="change-password container">
        <div className="change-password-container">
          <h3 className="fw-bold">Change New Password</h3>
          <p>Change your new password to login</p>

          <div className="input-group my-3">
            <span className="input-group-text">
              <i className="bi bi-lock-fill fs-5 icon-gray"></i>
            </span>
            <input
              type={`${isShowOldPassword ? "text" : "password"}`}
              className="form-control"
              placeholder="Enter Your Old Password"
              value={oldPassword}
              onChange={(e: any) => setOldPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowOldPassword(!isShowOldPassword)}
            >
              <i
                className={`bi ${isShowOldPassword ? "bi-eye-slash" : "bi-eye-fill"
                  } fs-5 icon-gray`}
              />
            </span>
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-lock-fill fs-5 icon-gray"></i>
            </span>
            <input
              type={`${isShowNewPassword ? "text" : "password"}`}
              className="form-control"
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e: any) => setNewPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowNewPassword(!isShowNewPassword)}
            >
              <i
                className={`bi ${isShowNewPassword ? "bi-eye-slash" : "bi-eye-fill"
                  } fs-5 icon-gray`}
              />
            </span>
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-lock-fill fs-5 icon-gray"></i>
            </span>
            <input
              type={`${isShowCfNewPassword ? "text" : "password"}`}
              className="form-control"
              placeholder="Confirm New Password"
              value={cfNewPassword}
              onChange={(e: any) => setCfNewPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowCfNewPassword(!isShowCfNewPassword)}
            >
              <i
                className={`bi ${isShowCfNewPassword ? "bi-eye-slash" : "bi-eye-fill"
                  } fs-5 icon-gray`}
              />
            </span>
          </div>

          <button className="button button--large button--primary w-100" onClick={handleChangePassword}>
            Change  Password
          </button>
        </div>
      </div>
    );
  };

  const _renderSuccess = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <p className="icon-success mb-4">
            <i className="bi bi-check-lg fs-1"></i>
          </p>
          <h3 className="text-center mb-3">Success</h3>
          <p className="text-center mb-5">
            You have successfully change your
            <span className="text-center d-block mt-2">password.</span>
          </p>
          <p className="text-center">Re-directing to your dashboard...</p>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      {_renderChangePassword()}
      {isSuccess && _renderSuccess()}
    </Layout>
  );
};

export default ChangePassword;
