import { Link } from "react-router-dom";
import { LOGO_HOSPITAL } from "../../../assets";

const Login = () => {
  return (
    <div className="contain">
      <div className="login-container">
        <div className="login-container-header">
          <img src={LOGO_HOSPITAL} alt="" />
          <h3>Login</h3>
        </div>
        <div className="login-container-body">
          <div>
            <label htmlFor="gmail">
              <i className="bi bi-person-fill"></i> Gmail
            </label>
            <input type="text" id="gmail" />
          </div>
          <div>
            <label htmlFor="password">
              <i className="bi bi-lock-fill"></i> Password
            </label>
            <input type="password" id="password" />
          </div>
          <button className="button button--large button--large--primary w-100">Login</button>
          <p className="text-end mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </div>
        <div className="login-container-footer mt-5">
          <p className="text-center fw-700">------------------------or-------------------------</p>
          <button className="button w-100 button--large button--large--outline fw-bold">Create new account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
