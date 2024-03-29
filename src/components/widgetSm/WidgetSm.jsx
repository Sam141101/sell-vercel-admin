import './widgetSm.css';
import { Visibility } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BASE_URL_API } from '../../requestMethods';

export default function WidgetSm({ token, axiosJWT }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await axiosJWT.get(BASE_URL_API + 'users?new=true', {
                    headers: { token: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {}
        };
        getUsers();
    }, [token]);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">Thành viên mới</span>
            <ul className="widgetSmList">
                {users.map((user) => (
                    <li className="widgetSmListItem" key={user._id}>
                        <div className="widgetSmUser">
                            <img
                                src={
                                    user.img ||
                                    'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
                                }
                                alt=""
                                className="widgetSmImg"
                            />
                            <span className="widgetSmUsername">{user.username}</span>
                        </div>
                        <Link to={`/user/${user._id}`} className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
