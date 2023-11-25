import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGO_HOSPITAL } from "../../../assets";
import axios from "axios";
import { JwtPayload, jwtDecode } from "jwt-decode";

import { API_LOGIN } from "../../../constants/api.constant";
import { defineConfigPost } from "../../../Common/utils";
import { KEY_LOCAL_STORAGE } from "../../../constants/general.constant";
import { useAppDispatch } from "../../../redux/hooks";
import { setLogin } from "../../../redux/features/auth/authSlice";
import { error } from "../../../Common/notify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const url_api = process.env.REACT_APP_API_URL;

  const requestLogin = () => {
    const url = `${url_api}${API_LOGIN}`;

    const params = {
      username: username.trim(),
      password: password.trim()
    }

    axios
      .post(url, params, defineConfigPost())
      .then((resp: any) => {
        if (resp) {
          const accessToken = resp.data.accessToken;

          localStorage.setItem(KEY_LOCAL_STORAGE.AUTHEN, accessToken);

          const decoded: any = jwtDecode<JwtPayload>(accessToken);
          localStorage.setItem(KEY_LOCAL_STORAGE.EXP, decoded.exp);
          localStorage.setItem(KEY_LOCAL_STORAGE.IAT, decoded.iat);
          localStorage.setItem(KEY_LOCAL_STORAGE.SUB, decoded.sub);
          localStorage.setItem(KEY_LOCAL_STORAGE.TYPE, decoded?.aud);
          dispatch(setLogin(true));
          navigate("/admin")
        }
      })
      .catch((err: any) => {
        console.log("error Login:", err);
        error(err.response.data.error.message)
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
            Login
          </button>
          <p className="text-end mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
