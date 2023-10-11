import { memo } from "react";
import { RouterUrl } from "../../constants";
import { Link } from "react-router-dom";
import { ICON_PATIENT, LOGO } from "../../assets";

const Header = () => {
  return (
    <header className="navbar-wrapper">
      <nav className="navbar-header">
        <div className="navbar-logo">
          <Link 
            to={RouterUrl.DASHBOARD}
            className="navbar-logo__text text-uppercase"
          >
            <img src={LOGO} alt="" className="w-100"/>
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
                  <ICON_PATIENT/>
                </div>
                <div className="user-profile__username">admin</div>
                <i className="bi bi-chevron-down" />
              </div>
              <ul
                className="dropdown-menu dropdown-menu-end dropdown-primary__menu dropdown-primary__menu--end"
                aria-labelledby="dropdownprofile"
              >
                <li>
                  <Link className="dropdown-item" to="">
                    account
                  </Link>
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
