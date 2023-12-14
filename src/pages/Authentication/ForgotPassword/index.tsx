import { useState } from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setForgotPassword } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { API_FORGOT_PASSWORD, API_SEND_MAIL, API_VERIFY_CODE } from "../../../constants/api.constant";
import { error, success, warn } from "../../../Common/notify";
import { defineConfigPost } from "../../../Common/utils";
import axios from "axios";
import OTPInput from "otp-input-react";

const ForgotPassword = () => {
  const url_api = process.env.REACT_APP_API_URL;

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState(false);

  const [email, setEmail] = useState<string>("");
  const [OTP, setOTP] = useState<string>("");
  const [password, setPassword] = useState<string>("")
  const [cfPassword, setCfPassword] = useState<string>("")

  const [isSendMail, setIsSendMail] = useState<boolean>(false)
  const [isCreateNewPass, setIsCreateNewPass] = useState<boolean>(false)
  const [isVerifyCode, setIsVerifyCode] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState(false)

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
      email: email.trim(),
      newPass: null,
      oldPass: null
    }

    setIsLoading(true)

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          if (resp.data === "successful") {
            setIsSendMail(true);
            success(resp.data)

          } else {
            error(resp.data)
          }

          setIsLoading(false)
        }
      })
      .catch((err: any) => {
        console.log("err:", err);
      });
  }

  const handleVerifyCode = () => {
    verifyCode();
  }

  const verifyCode = () => {
    const url = `${url_api}${API_VERIFY_CODE}`;

    const params = {
      email: email.trim(),
      newPass: OTP.trim(),
      oldPass: null
    }
    setIsLoading(true)

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          if (resp.data === "successful") {
            setIsVerifyCode(true);
            setIsSendMail(true);
            success(resp.data)
          } else {
            error(resp.data)
          }

          setIsLoading(false)

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
      email: email.trim(),
      newPass: password.trim(),
      oldPass: null
    }

    setIsLoading(true)

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          console.log("resp:", resp)
          if (resp.data === "change pass successful") {
            setIsCreateNewPass(true);
            setIsVerifyCode(true);
            setIsSendMail(true);
            success(resp.data)
          } else {
            error(resp.data)
          }

          setIsLoading(false)

        }
      })
      .catch((err: any) => {
        console.log("err:", err);
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
            {isLoading && <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>} <span className="ms-2">Send code</span>
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
            {isLoading && <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>} <span className="ms-2">Create password</span>
          </button>
        </div>
      </div>
    );
  };

  const _renderVerifyCode = () => {
    return (
      <div className="forgot">
        <div className="forgot-container">
          <h3>Enter Verification Code</h3>
          <p>Enter code that we have sent to your Email</p>
          <OTPInput inputClassName="custom-otp-input" value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
          <button className="button button--large button--large--primary w-100 mt-3" onClick={() => handleVerifyCode()}>
            {isLoading && <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>} <span className="ms-2">Verify</span>
          </button>
          <p className="mt-3 text-center text-reset cursor-pointer" onClick={() => handleSendMail()}>
            Resend code
          </p>
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
          <p className="text-center" onClick={() => {
            dispatch(setForgotPassword(false))
            navigate("/login")
          }}>Re-directing to your login...</p>
        </div>
      </div>
    );
  };

  return (
    <>
      {!isSendMail && !isCreateNewPass && !isVerifyCode && _renderForgotYourPw()}
      {isSendMail && !isVerifyCode && _renderVerifyCode()}
      {isSendMail && isVerifyCode && !isCreateNewPass && _renderCreateNewPw()}
      {isSendMail && isCreateNewPass && isVerifyCode && _renderSuccess()}
    </>
  );
};

export default ForgotPassword;
