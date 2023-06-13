import React from 'react';
import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../redux/apiCalls';

export default function Topbar({ dispatch, id, accessToken, axiosJWT, BASE_URL_API }) {
    const history = useHistory();

    const handleLogout = async () => {
        logout(dispatch, id, accessToken, axiosJWT, history, BASE_URL_API);
    };

    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <span className="logo">Outerity</span>
                    </Link>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>

                    <div className="nav-img">
                        <img
                            src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                            className="topAvatar"
                        />
                        <div className="nav-menu" onClick={handleLogout}>
                            Đăng xuất
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
