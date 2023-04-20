import { useEffect, useState } from 'react';
import './widgetLg.css';
import { format } from 'timeago.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createAxiosInstance } from '../../useAxiosJWT';

export default function WidgetLg({ token }) {
    const admin = useSelector((state) => state.user?.currentUser);

    const dispatch = useDispatch();
    const axiosJWT = createAxiosInstance(admin, dispatch);

    const [orders, setOrders] = useState([]);

    console.log('orders', orders);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axiosJWT.get('http://localhost:5000/api/orders', {
                    headers: { token: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) {}
        };
        getOrders();
    }, [token]);

    const Button = ({ type, order_id }) => {
        let status;
        if (type === 'pending') {
            status = 'wait-for-confirmation';
        } else if (type === 'accept') {
            status = 'waiting-for-the-goods';
        } else if (type === 'delivery') {
            status = 'delivering';
        } else if (type === 'complete') {
            status = 'complete';
        } else if (type === 'canceled') {
            status = 'canceled';
        }
        return (
            <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                to={`/order/${status}/${order_id}`}
            >
                <button className={'widgetLgButton ' + type}>{type}</button>
            </Link>
        );
    };
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">Giao dịch gần nhất</h3>
            <table className="widgetLgTable">
                <tbody>
                    <tr className="widgetLgTr">
                        <th className="widgetLgTh">Khách hàng</th>
                        <th className="widgetLgTh">Ngày</th>
                        <th className="widgetLgTh">Giá</th>
                        <th className="widgetLgTh">Trạng thái</th>
                    </tr>

                    {orders &&
                        orders.map((order) => (
                            <tr className="widgetLgTr" key={order._id}>
                                <td className="widgetLgUser">
                                    <span className="widgetLgName">
                                        _id : {order.userId}
                                    </span>
                                </td>
                                <td className="widgetLgDate">
                                    {format(order.createdAt)}
                                </td>
                                <td className="widgetLgAmount">{order.amount}₫</td>
                                <td className="widgetLgStatus">
                                    {/* <Link to={`/order/:status/:id`}> */}
                                    <Button type={order.status} order_id={order._id} />
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
