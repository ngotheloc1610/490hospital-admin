import { useState } from "react";

interface IPropForgotPassword {}

const ForgotPassword = (props: IPropForgotPassword) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState(false);

  const _renderForgotYourPw = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3>Forgot Your Password?</h3>
          <p>Enter your email we will send you confirmation code</p>
          <div className="w-100 title-email mb-4">
            <p className="email-input">Email</p>
          </div>
          <div className="input-group mb-4">
            <label htmlFor="email">
              <i className="bi bi-envelope fs-4"></i>
            </label>
            <input type="email" className="form-control" id="email" />
            <span className="icon-email">
              <i className="bi bi-check-lg fs-4"></i>
            </span>
          </div>
          <button className="w-100 button button--large button--large--primary">
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
          <h3>Create New Password</h3>
          <p>Create your new password to login</p>
          <div className="input-group mb-4 mt-4">
            <label htmlFor="cfPassword">
              <i className="bi bi-lock-fill fs-5"></i>
            </label>
            <input
              type={isShowPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm Password"
              id="cfPassword"
            />
            <button onClick={() => setIsShowPassword(!isShowPassword)} className="btn-hidden">
              <i
                className={`bi ${
                  isShowPassword ? "bi-eye-slash" : "bi-eye-fill"
                } fs-5`}
              />
            </button>
          </div>

          <div className="input-group mb-4">
            <label htmlFor="cfPassword">
              <i className="bi bi-lock-fill fs-5"></i>
            </label>
            <input
              type={isShowCfPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm Password"
              id="cfPassword"
            />
            <button onClick={() => setIsShowCfPassword(!isShowCfPassword)} className="btn-hidden">
              <i
                className={`bi ${
                  isShowCfPassword ? "bi-eye-slash" : "bi-eye-fill"
                } fs-5`}
              />
            </button>
          </div>
          <button className="button button--large button--large--primary w-100">Create password</button>
        </div>
      </div>
    );
  };

  const _renderSuccess = () => {
    return (
      <div className="forgot">
        <p className="icon-success mb-4">
          <i className="bi bi-check-lg fs-1"></i>
        </p>
        <h3 className="text-center mb-3">Success</h3>
        <p className="text-center mb-5">You have successfully reset your password.</p>
        <p className="text-center">Re-directing to your homepage...</p>
      </div>
    );
  };

  return (
    <>
      {/* {_renderForgotYourPw()} */}
      {/* {_renderCreateNewPw()} */}
      {_renderSuccess()}
    </>
  );
};

export default ForgotPassword;
