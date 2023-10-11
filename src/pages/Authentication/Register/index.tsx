import { useState } from "react";
import { LOGO_HOSPITAL } from "../../../assets";

interface IPropRegister {}

const Register = (props: IPropRegister) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState(false);

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-container-header">
          <img src={LOGO_HOSPITAL} alt="" />
          <h3>Register</h3>
        </div>

        <div className="register-container-body">
          <div className="container">
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <label htmlFor="gmail">
                    <i className="bi bi-person-fill fs-5"></i>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="gmail"
                    placeholder="Gmail"
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <label htmlFor="password">
                    <i className="bi bi-lock-fill fs-5"></i>
                  </label>
                  <input
                    type={isShowPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  <button onClick={() => setIsShowPassword(!isShowPassword)}>
                    <i
                      className={`bi ${
                        isShowPassword ? "bi-eye-slash" : "bi-eye-fill"
                      } fs-5`}
                    />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="datetime"
                    className="form-control"
                    placeholder="Date of birth"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <label htmlFor="cfPassword">
                    <i className="bi bi-lock-fill fs-5"></i>
                  </label>
                  <input
                    type={isShowCfPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Confirm Password"
                    id="cfPassword"
                  />
                  <button
                    onClick={() => setIsShowCfPassword(!isShowCfPassword)}
                  >
                    <i
                      className={`bi ${
                        isShowCfPassword ? "bi-eye-slash" : "bi-eye-fill"
                      } fs-5`}
                    />
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Phone number"
                  />
                </div>
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-6"></div>
              <div className="col-6 radio-group">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="male"
                    value="male"
                  />
                  <label className="form-check-label" htmlFor="male">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label className="form-check-label" htmlFor="female">
                    Female
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="other"
                    value="other"
                  />
                  <label className="form-check-label" htmlFor="other">
                    Other
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="register-container-footer">
          <button className="button button--large button--large--primary w-100">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
