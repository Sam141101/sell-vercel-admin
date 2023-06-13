import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../requestMethods';

export default function DefaultLayoutOrder({ children, show1 }) {
    const [inputs, setInputs] = useState({
        pending: 0,
        accept: 0,
        delivery: 0,
        complete: 0,
        cancel: 0,
    });

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(
                    BASE_URL_API +
                        `orders/user-amount-order-status/63b4e6bff1828a3d371fa0ef/`,
                );

                setInputs({
                    pending: res.data.pending,
                    accept: res.data.accept,
                    delivery: res.data.delivery,
                    complete: res.data.complete,
                    cancel: res.data.cancel,
                });
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, []);

    return (
        <div className="order">
            <div className="order-title">Các đơn đặt hàng</div>
            <div className="default-layout-frame-block">
                <div className="default-layout-order-manage-user">
                    <Link
                        style={{
                            color: `${show1 === 1 ? 'red' : ''}`,
                        }}
                        className="default-layout-order-select-link"
                        to="/order/wait-for-confirmation"
                    >
                        Chờ xác nhận
                        {inputs.pending !== 0 && (
                            <span className="amount-order">{inputs.pending}</span>
                        )}
                    </Link>
                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${show1 === 2 ? 'red' : ''}`,
                        }}
                        to="/order/waiting-for-the-goods"
                    >
                        Chờ lấy hàng
                        {inputs.accept !== 0 && (
                            <span className="amount-order">{inputs.accept}</span>
                        )}
                    </Link>

                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${show1 === 3 ? 'red' : ''}`,
                        }}
                        to="/order/delivering"
                    >
                        Đang giao
                        {inputs.delivery !== 0 && (
                            <span className="amount-order">{inputs.delivery}</span>
                        )}
                    </Link>

                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${show1 === 4 ? 'red' : ''}`,
                        }}
                        to="/order/complete"
                    >
                        Hoàn thành
                        {inputs.complete !== 0 && (
                            <span className="amount-order">{inputs.complete}</span>
                        )}
                    </Link>
                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${show1 === 5 ? 'red' : ''}`,
                        }}
                        to="/order/canceled"
                    >
                        Đã huỷ
                        {inputs.cancel !== 0 && (
                            <span className="amount-order">{inputs.cancel}</span>
                        )}
                    </Link>
                </div>
            </div>

            <div className="frame-layout-order">{children}</div>
        </div>
    );
}
