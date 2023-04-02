import { useEffect, useState } from 'react';
import './widgetLg.css';
import { format } from 'timeago.js';
import axios from 'axios';

export default function WidgetLg({ token }) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/orders', {
                    headers: { token: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) {}
        };
        getOrders();
    }, [token]);

    const Button = ({ type }) => {
        return <button className={'widgetLgButton ' + type}>{type}</button>;
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

                    {orders.map((order) => (
                        <tr className="widgetLgTr" key={order._id}>
                            <td className="widgetLgUser">
                                <span className="widgetLgName">_id : {order.userId}</span>
                            </td>
                            <td className="widgetLgDate">{format(order.createdAt)}</td>
                            <td className="widgetLgAmount">{order.amount}₫</td>
                            <td className="widgetLgStatus">
                                <Button type={order.status} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
