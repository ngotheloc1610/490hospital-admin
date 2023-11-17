import { memo } from "react";
import { RouterUrl } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { ICON_PATIENT, LOGO } from "../../assets";
import { KEY_LOCAL_STORAGE } from "../../constants/general.constant";
import { useAppDispatch } from "../../redux/hooks";
import { setLogin } from "../../redux/features/auth/authSlice";

const Header = () => {
  const navigate = useNavigate();

  const account = localStorage.getItem(KEY_LOCAL_STORAGE.SUB || "");
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    localStorage.removeItem(KEY_LOCAL_STORAGE.AUTHEN)
    localStorage.removeItem(KEY_LOCAL_STORAGE.IAT)
    localStorage.removeItem(KEY_LOCAL_STORAGE.EXP)
    localStorage.removeItem(KEY_LOCAL_STORAGE.SUB)

    dispatch(setLogin(false));

    navigate("/login")
  }

  return (
    <header className="navbar-wrapper">
      <nav className="navbar-header">
        <div className="navbar-logo">
          <Link
            to={RouterUrl.DASHBOARD}
            className="navbar-logo__text text-uppercase"
          >
            <img src={LOGO} alt="" className="w-100" />
          </Link>
        </div>
        <div className="navbar-container">
          <ul className="nav-left visually-hidden">
            <li className="nav-tool nav-search">
              <i className="bi bi-search" />
            </li>
          </ul>
          <ul className="nav-right">
            <li className="user-profile">
              <div
                className="dropdown-primary"
                role="button"
                id="dropdownprofile"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <div className="user-profile__avatar">
                  <ICON_PATIENT />
                </div>
                <div className="user-profile__username">{account}</div>
                <i className="bi bi-chevron-down" />
              </div>
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-primary__menu dropdown-primary__menu--end"
                aria-labelledby="dropdownprofile"
              >
                <li>
                  <Link className="dropdown-item" to="/information">
                    Information
                  </Link>
                </li>
                <li onClick={() => handleLogout()}>
                  <span className="dropdown-item" >Log out</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
export default memo(Header);
