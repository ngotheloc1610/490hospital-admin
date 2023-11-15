import { useState } from "react";

const ForgotPassword = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState<boolean>(false);

  const _renderForgotYourPw = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3 className="fw-bold">Forgot Your Password?</h3>
          <p>Enter your email we will send you confirmation code</p>
          <div className="w-100 title-email my-3">
            <p className="email-input">Email</p>
          </div>
          <div className="input-group mb-4">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-envelope fs-4"></i>
            </span>
            <input type="text" className="form-control" />
            <span className="input-group-text">
              <i className="bi bi-check-lg fs-4"></i>
            </span>
          </div>
          <button className="w-100 button button--large button--primary">
            Send code
          </button>
        </div>
      </div>
    );
  };

  const _renderCreateNewPw = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3 className="fw-bold">Create New Password</h3>
          <p>Create your new password to login</p>
          <div className="input-group my-3">
            <span className="input-group-text">
              <i className="bi bi-lock-fill fs-5 icon-gray"></i>
            </span>
            <input
              type={`${isShowPassword ? "text" : "password"}`}
              className="form-control"
              placeholder="Password"
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <i
                className={`bi ${
                  isShowPassword ? "bi-eye-slash" : "bi-eye-fill"
                } fs-5 icon-gray`}
              />
            </span>
          </div>

          <div className="input-group mb-4">
            <span className="input-group-text">
              <i className="bi bi-lock-fill fs-5 icon-gray"></i>
            </span>
            <input
              type={`${isShowCfPassword ? "text" : "password"}`}
              className="form-control"
              placeholder="Confirm password"
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowCfPassword(!isShowCfPassword)}
            >
              <i
                className={`bi ${
                  isShowCfPassword ? "bi-eye-slash" : "bi-eye-fill"
                } fs-5 icon-gray`}
              />
            </span>
          </div>
          <button className="button button--large button--primary w-100">
            Create password
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
          <h3 className="text-center mb-3 fw-bold">Success</h3>
          <p className="text-center mb-4">
            You have successfully reset your{" "}
            <span className="d-block m-auto mt-1">password.</span>
          </p>
          <p className="text-center">Re-directing to your dashboard...</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {_renderForgotYourPw()}
      {/* {_renderCreateNewPw()}
      {_renderSuccess()} */}
    </>
  );
};

export default ForgotPassword;
