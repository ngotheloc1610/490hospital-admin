import { useState } from "react";
import { LOGO_HOSPITAL } from "../../../assets";
import { GENDER_ALL } from "../../../constants";

const Register = () => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isShowCfPassword, setIsShowCfPassword] = useState<boolean>(false);

  return (
    <div className="register">
      <div className="register-container">
        <div className="register-container-header">
          <img src={LOGO_HOSPITAL} alt="" />
          <h3>Register</h3>
        </div>

        <div className="register-container-body mt-3">
          <div className="container">
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="bi bi-person-fill fs-5 icon-gray"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Gmail"
                  />
                  <span className="input-group-text"></span>
                </div>
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control h-100"
                  placeholder="Full name"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
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
              </div>
              <div className="col-6">
                <input
                  type="date"
                  className="form-control h-100"
                  placeholder="Date of birth"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="bi bi-lock-fill fs-5 icon-gray"></i>
                  </span>
                  <input
                    type={`${isShowCfPassword ? "text" : "password"}`}
                    className="form-control"
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
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control h-100"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="row mb-3 ">
              <div className="col-6"></div>
              <div className="col-6 d-flex justify-content-between ">
                {GENDER_ALL.map((item: any, idx: number) => {
                  return (
                    <div className="form-check form-check-inline">
                      <div>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          id={item.code}
                          value={item.code}
                        />
                        <label className="form-check-label" htmlFor={item.code}>
                          {item.name}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="register-container-footer">
          <button className="button button--large button--primary w-100">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
