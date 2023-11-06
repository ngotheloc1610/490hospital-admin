import { useState } from "react";

const ChangePassword = () => {

    const [isShowOldPassword, setIsShowOldPassword] = useState<boolean>(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState<boolean>(false);
  const [isShowCfNewPassword, setIsShowCfNewPassword] = useState<boolean>(false);

  const _renderChangePassword = () => {
    return (
      <div className="change-password">
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
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowOldPassword(!isShowOldPassword)}
            >
              <i
                className={`bi ${
                    isShowOldPassword ? "bi-eye-slash" : "bi-eye-fill"
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
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowNewPassword(!isShowNewPassword)}
            >
              <i
                className={`bi ${
                    isShowNewPassword ? "bi-eye-slash" : "bi-eye-fill"
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
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowCfNewPassword(!isShowCfNewPassword)}
            >
              <i
                className={`bi ${
                    isShowCfNewPassword ? "bi-eye-slash" : "bi-eye-fill"
                } fs-5 icon-gray`}
              />
            </span>
          </div>

          <button className="button button--large button--primary w-100">
          Change  Password
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {_renderChangePassword()}
    </>
  );
};

export default ChangePassword;
