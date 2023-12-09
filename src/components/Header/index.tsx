import { memo, useState } from "react";
import { RouterUrl } from "../../constants";
import { Link, useNavigate } from "react-router-dom";
import { ICON_PATIENT, LOGO } from "../../assets";
import { KEY_LOCAL_STORAGE, TYPE_ADMIN } from "../../constants/general.constant";
import { useAppDispatch } from "../../redux/hooks";
import { setLogin } from "../../redux/features/auth/authSlice";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

const Header = () => {
  const navigate = useNavigate();

  const account = localStorage.getItem(KEY_LOCAL_STORAGE.SUB || "");
  const dispatch = useAppDispatch()

  const type = localStorage.getItem(KEY_LOCAL_STORAGE.TYPE);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            to={type === TYPE_ADMIN ? RouterUrl.DASHBOARD : RouterUrl.PATIENT_MONITOR}
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
            <li style={{ marginTop: "8px" }}>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32 }}>
                      <NotificationsIcon />
                    </Avatar>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>

                </MenuItem>
              </Menu>
            </li>
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
                  <span className="p-2 dropdown-item" onClick={() => navigate("/information")}>
                    Information
                  </span>
                </li>
                <li onClick={() => handleLogout()}>
                  <span className="dropdown-item p-2" >Log out</span>
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
