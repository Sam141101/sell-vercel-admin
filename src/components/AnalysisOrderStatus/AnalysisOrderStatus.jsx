import './analysisOrderStatus.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState, useEffect } from 'react';
// import { userRequest } from "../../requestMethods";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AnalysisOrderStatus({ title, token }) {
    const [listUser, setListUser] = useState([]);

    const handleGift = async () => {};

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/users/${
                        title === 'complete'
                            ? 'find-user-high-order'
                            : 'find-users-canceled'
                    }`,
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );
                console.log(res.data);
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
                    {title === 'complete' ? (
                        <div className="analysis-status-frame-title">
                            <div className="analysis-status-info-user">Người dùng</div>
                            <div className="analysis-status-info-user">Số lần mua</div>
                        </div>
                    ) : (
                        <div className="analysis-status-frame-title">
                            <div className="analysis-status-info-user">Người dùng</div>
                            <div className="analysis-status-info-user">Số lần huỷ</div>
                        </div>
                    )}

                    <ul className="analysis-status-list">
                        {listUser?.map((item, index) => (
                            <li className="analysis-status-item" key={item._id}>
                                <div className="analysis-status-item-user">
                                    <img
                                        src={
                                            item.img ||
                                            'https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg'
                                        }
                                        alt=""
                                        className="analysis-status-item-img"
                                    />
                                    <span className="analysis-status-item-title-name">
                                        {item.username}
                                    </span>
                                </div>
                                <div className="quanti-order">
                                    {title === 'complete' ? (
                                        <>
                                            {item.firstTimeBuy}
                                            <Link
                                                to={`/discount/${item._id}`}
                                                className="analysis-status-item-gift"
                                                // onClick={handleGift}
                                            >
                                                Tặng quà
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            {item.canceledOrder}
                                            <span
                                                className="analysis-status-item-gift"
                                                onClick={handleGift}
                                            >
                                                Giới hạn
                                            </span>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                        <div className="line-frame"></div>
                    </ul>
                </div>
            </div>
        </div>
    );
}
