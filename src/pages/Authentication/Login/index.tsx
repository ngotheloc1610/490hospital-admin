import { Link, useNavigate } from "react-router-dom";
import { LOGO_HOSPITAL } from "../../../assets";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <div className="contain">
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
            <input type="text" className="form-control" placeholder="Gmail" />
            <span className="input-group-text"></span>
          </div>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock-fill fs-5 icon-gray"></i>
            </span>
            <input
              type={`${isShowPassword ? "text" : "password"}`}
              className="form-control"
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
          <button className="button button--large button--primary w-100">
            Login
          </button>
          <p className="text-end mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
        <div className="login-container-footer mt-5">
          <p className="text-center fw-700">
          ---------------------------------------or----------------------------------------
          </p>
          <button
            className="button w-100 button--large button--outline fw-bold"
            onClick={() => navigate("/register")}
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
