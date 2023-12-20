import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LOGO_HOSPITAL } from "../../../assets";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { API_LOGIN, API_PROFILE_PRACTITIONER } from "../../../constants/api.constant";
import { defineConfigPost } from "../../../Common/utils";
import { KEY_LOCAL_STORAGE, TYPE_ADMIN } from "../../../constants/general.constant";
import { useAppDispatch } from "../../../redux/hooks";
import { setForgotPassword, setLogin } from "../../../redux/features/auth/authSlice";
import { error } from "../../../Common/notify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const url_api = process.env.REACT_APP_API_URL;

  const requestLogin = () => {
    const url = `${url_api}${API_LOGIN}`;

    const params = {
      username: username.trim(),
      password: password.trim()
    }

    setIsLoading(true);


    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        setIsLoading(false);
        if (resp) {

          const accessToken = resp.data.accessToken;

          localStorage.setItem(KEY_LOCAL_STORAGE.AUTHEN, accessToken);

          const decoded: any = jwtDecode<JwtPayload>(accessToken);

          localStorage.setItem(KEY_LOCAL_STORAGE.EXP, decoded.exp);
          localStorage.setItem(KEY_LOCAL_STORAGE.IAT, decoded.iat);
          localStorage.setItem(KEY_LOCAL_STORAGE.SUB, decoded.sub);
          localStorage.setItem(KEY_LOCAL_STORAGE.TYPE, decoded.aud);
          getProfilePractitioner();
          dispatch(setLogin(true));
          dispatch(setForgotPassword(false))
          if (decoded.aud === TYPE_ADMIN) {
            navigate("/dashboard/patient")
          } else {
            navigate("/monitor")
          }
        }
      })
      .catch((err: any) => {
        console.log("error Login:", err);
        setIsLoading(false);
        error(err.response.data.error.message)
      });
  }

  const getProfilePractitioner = () => {
    const url = `${url_api}${API_PROFILE_PRACTITIONER}`;

    axios
      .get(url, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          localStorage.setItem(KEY_LOCAL_STORAGE.ID, resp.data.id);
          localStorage.setItem(KEY_LOCAL_STORAGE.NAME, resp.data.name);
          localStorage.setItem(KEY_LOCAL_STORAGE.IMAGE, resp.data.photo)
        }
      })
      .catch((err) => {
        console.log("error get profile practitioner:", err);
      });
  }

  const handleLogin = () => {
    requestLogin()
  }

  const handleKeyEnter = (event: any) => {
    if (username !== '' && password !== '') {
      if (event.key === 'Enter') {
        requestLogin();
      }
    }
  }

  const handleForgot = () => {
    dispatch(setForgotPassword(true));
    navigate("/forgot-password")
  }


  return (
    <div className="contain" onKeyDown={handleKeyEnter}>
      <div className="login-container">
        <div className="login-container-header">
          <img src={LOGO_HOSPITAL} alt="" />
          <h3>Login</h3>
        </div>
        <div className="login-container-body mt-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-person-fill fs-5 icon-gray"></i>
            </span>
            <input type="text" className="form-control" placeholder="Gmail" value={username} onChange={(e: any) => setUsername(e.target.value)} />
            <span className="input-group-text"></span>
          </div>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill fs-5 icon-gray"></i>
            </span>
            <input
              type={`${isShowPassword ? "text" : "password"}`}
              className="form-control"
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
          <button className="button button--large button--primary w-100" onClick={() => handleLogin()}>
            {isLoading && <span className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </span>} <span className="ms-2">Login</span>
          </button>
          <p className="text-end mt-3" onClick={() => handleForgot()}>
            <span className="text-reset">Forgot Password?</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
