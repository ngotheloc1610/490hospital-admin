import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setForgotPassword } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { API_FORGOT_PASSWORD, API_SEND_MAIL } from "../../../constants/api.constant";
import { error, warn } from "../../../Common/notify";
import { defineConfigGet } from "../../../Common/utils";
import axios from "axios";

const ForgotPassword = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [cfPassword, setCfPassword] = useState<string>("")
  const [isSendMail, setIsSendMail] = useState<boolean>(false);
  const [isCreateNewPass, setIsCreateNewPass] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleBackLogin = () => {
    dispatch(setForgotPassword(false))
    navigate("/login")
  }

  const handleSendMail = () => {
    if (!email) {
      warn("Vui lòng nhập email!");
      return;
    }

    sendMail()
  }

  const handleChangePassword = () => {
    if (!password || !cfPassword) {
      warn("Vui lòng điền mật khẩu!");
      return;
    }
    if (password !== cfPassword) {
      warn("Mật khẩu không trùng khớp!");
      return;
    }

    changePassword()
  }

  const sendMail = () => {
    const url = `${url_api}${API_SEND_MAIL}`;

    const params = {
      email: email
    }

    axios
      .post(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          setIsSendMail(true);
        }
      })
      .catch((err: any) => {
        console.log("error Login:", err);
        error(err.message || err.response.data.error || err.response.data.error.message)
      });
  }

  const changePassword = () => {
    const url = `${url_api}${API_FORGOT_PASSWORD}`;

    const params = {
      email: email,
      newPass: password
    }

    axios
      .post(url, defineConfigGet(params))
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          setIsCreateNewPass(true);
        }
      })
      .catch((err: any) => {
        console.log("error Login:", err);
        error(err.message || err.response.data.error || err.response.data.error.message)
      });
  }

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
            <input type="email" className="form-control" value={email} onChange={(e: any) => setEmail(e.target.value)} />
            <span className="input-group-text">
              <i className="bi bi-check-lg fs-4"></i>
            </span>
          </div>
          <button className="w-100 button button--large button--primary" onClick={() => handleSendMail()}>
            Send code
          </button>
          <button className="w-100 button button--large button--outline mt-3" onClick={() => handleBackLogin()}>
            Back to Login
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
              value={password}
              onChange={(e: any) => setPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              <i
                className={`bi ${isShowPassword ? "bi-eye-slash" : "bi-eye-fill"
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
              value={cfPassword}
              onChange={(e: any) => setCfPassword(e.target.value)}
            />
            <span
              className="input-group-text"
              onClick={() => setIsShowCfPassword(!isShowCfPassword)}
            >
              <i
                className={`bi ${isShowCfPassword ? "bi-eye-slash" : "bi-eye-fill"
                  } fs-5 icon-gray`}
              />
            </span>
          </div>
          <button className="button button--large button--primary w-100" onClick={() => handleChangePassword()}>
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
            You have successfully reset your
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
      {isSendMail && _renderCreateNewPw()}
      {isSendMail && isCreateNewPass && _renderSuccess()}
    </>
  );
};

export default ForgotPassword;
