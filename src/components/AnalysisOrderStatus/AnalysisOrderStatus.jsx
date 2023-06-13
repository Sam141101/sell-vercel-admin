import './analysisOrderStatus.css';
// import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState, useEffect } from 'react';
// import { userRequest } from "../../requestMethods";
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { createAxiosInstance } from '../../useAxiosJWT';

export default function AnalysisOrderStatus({ title, token, axiosJWT, BASE_URL_API }) {
    // const admin = useSelector((state) => state.user?.currentUser);
    console.log('bass', BASE_URL_API);

    const [listUser, setListUser] = useState([]);

    // const dispatch = useDispatch();
    // const axiosJWT = createAxiosInstance(admin, dispatch);

    // const handleGift = async () => {};

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API +
                        `users/${
                            title === 'complete'
                                ? 'find-user-high-order'
                                : 'find-users-canceled'
                        }`,
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );
                console.log('res.datauuuuuuuuuuu', res.data);
                setListUser(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getIncome();
    }, [token, title]);

    return (
        <div className={`analysis-status ${title === 'cancel' && 'cancel'}`}>
            <div className="analysis-status-frame">
                <span className="analysis-status-title">
                    {title === 'complete'
                        ? 'Danh sách mua hàng nhiều nhất'
                        : 'Danh sách huỷ đơn'}
                </span>
                <div className="analysis-status-container">
                    <table className="table">
                        <tbody>
                            <tr>
                                <th className="product-th th">Người dùng</th>
                                <th className="th">Số lần</th>
                            </tr>

                            {listUser.length !== 0 &&
                                listUser.map((item, index) => (
                                    <tr key={index}>
                                        <td className="td">
                                            <div className="analysis-status-item-user">
                                                <img
                                                    src={
                                                        item.img ||
                                                        'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
                                                    }
                                                    alt="lkk"
                                                    className="analysis-status-item-img"
                                                />
                                                <span className="analysis-status-item-title-name">
                                                    {item.username}
                                                </span>
                                            </div>
                                        </td>

                                        <td className="td analy">
                                            {title === 'complete' ? (
                                                <>{item.firstTimeBuy}</>
                                            ) : (
                                                <>{item.canceledOrder}</>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
