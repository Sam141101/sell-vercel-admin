import { Link, useLocation } from 'react-router-dom';
import './order.css';
import { Publish } from '@material-ui/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL_API } from '../../requestMethods';
import { createAxiosInstance } from '../../useAxiosJWT';

const buttonStatus = (status) => {
    let showText = '';
    if (status === 'pending') {
        showText = 'Xác nhận đơn hàng';
    } else if (status === 'accept') {
        showText = 'Đơn hàng đã xuất kho';
    } else if (status === 'delivery') {
        showText = '';
    } else if (status === 'complete') {
        showText = 'Thông báo đã giao thành công';
    } else {
        showText = 'Xoá đơn hàng';
    }

    return showText;
};

export default function Order() {
    const location = useLocation();
    const orderId = location.pathname.split('/')[3];
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;

    const dispatch = useDispatch();

    const [infoOrder, setInfoOrder] = useState({});
    const [deliveryTime, setDeliveryTime] = useState([]);
    const [pickShift, setPickShift] = useState('');

    console.log('pickShift', pickShift);

    const axiosJWT = createAxiosInstance(admin, dispatch);

    const handleClick = async (status) => {
        let statusOrder;
        let pick_shift;
        if (status === 'pending') {
            statusOrder = 'confirmation';
        } else if (status === 'accept') {
            pick_shift = deliveryTime.filter((item) => item.id == pickShift);
            statusOrder = 'delivery';
        } else if (status === 'cancel') {
            statusOrder = 'delete';
        } else {
            return;
        }
        console.log('pick_shift', pick_shift);
        try {
            const res = await axiosJWT.put(
                BASE_URL_API + `orders/find/order-${statusOrder}/` + infoOrder.user._id,
                {
                    orderId: infoOrder.orderList._id,
                    pick_shift: pick_shift[0],
                },
                {
                    headers: { token: `Bearer ${token}` },
                },
            );
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axiosJWT.get(BASE_URL_API + 'orders/find/' + orderId, {
                    headers: { token: `Bearer ${token}` },
                });
                setInfoOrder(res.data);
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getOrder();
    }, [orderId, token]);

    useEffect(() => {
        const getOrder = async () => {
            try {
                const res = await axiosJWT.get(
                    BASE_URL_API + 'shippings/list-delivery-time/' + admin._id,
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );
                setDeliveryTime(res.data);
                // console.log(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getOrder();
    }, [admin._id, token]);

    return (
        <div className="order-content">
            <div className="order-content-title">Thông tin Người nhận</div>
            <div className="order-user">
                <div className="info-user-order">
                    <div className="info-user-order-text">
                        <div className="info-user-order-span">
                            Tên:
                            <span>{infoOrder.user?.fullname}</span>
                        </div>
                        <div className="info-user-order-span">
                            Email:
                            <span>{infoOrder.user?.email}</span>
                        </div>

                        <div className="info-user-order-span">
                            Số điện thoại:
                            <span>{infoOrder.user?.phone}</span>
                        </div>
                        {infoOrder.user?.gender && (
                            <div className="info-user-order-span">
                                Giới tính:
                                <span>{infoOrder.user?.gender}</span>
                            </div>
                        )}
                        <div className="info-user-order-span">
                            Địa chỉ:
                            <span>{infoOrder.user?.address}</span>
                        </div>
                    </div>

                    <div className="info-user-order-frame-img">
                        <img
                            src={infoOrder.user?.img}
                            alt="hình ảnh"
                            className="info-user-order-img"
                        />
                    </div>
                </div>
            </div>

            {/* Danh sách ca lấy hàng  */}
            <div className="order-content-title">Thời gian giao hàng</div>
            <div className="delivery-time-list">
                {deliveryTime &&
                    deliveryTime.map((item1, index) => (
                        <div className="delivery-time-product-order" key={index}>
                            <>
                                <div
                                    className="delivery-time-item"
                                    // style={{ display: 'flex' }}
                                >
                                    <input
                                        type="radio"
                                        id={item1.id.toString()}
                                        value={item1.id}
                                        onChange={(e) => setPickShift(e.target.value)}
                                    />
                                    <label htmlFor={item1.id.toString()}>
                                        {item1.title}
                                    </label>
                                </div>
                            </>
                        </div>
                    ))}
            </div>

            <div className="order-content-title">Thông tin đơn hàng</div>
            <div className="order-list">
                <div className="wait-for-product-list">
                    <div className="wait-for-product-left">
                        {infoOrder.orderList &&
                            infoOrder.orderList?.products.map((item1, index) => (
                                <div className="wait-purchase-product-order" key={index}>
                                    <div className="wait-purchase-details-product">
                                        <img
                                            className="wait-purchase-img"
                                            alt="hinfh arnh"
                                            src={item1.product_id.img}
                                        />
                                        <div className="wait-purchase-info">
                                            <div className="wait-purchase-name-size">
                                                <div className="wait-purchase-name">
                                                    {item1.product_id.title}
                                                </div>
                                                <div className="wait-purchase-size">
                                                    _id: {item1._id}
                                                </div>
                                                <div className="wait-purchase-size">
                                                    {item1.size}
                                                </div>
                                            </div>
                                            <div className="wait-purchase-price-quanti">
                                                <div>x{item1.quantity}</div>
                                                <div>{item1.price}₫</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>

                    <div className="wait-for-product-right">
                        <div className="wait-for-product-right-frame">
                            <div className="wait-purchase-block">
                                <div className="wait-purchase-block-status">
                                    <span>Trạng thái:</span>
                                    <div
                                        className={`widgetLgButton ${infoOrder.orderList?.status}`}
                                    >
                                        {infoOrder.orderList?.status}
                                    </div>
                                </div>

                                <div className="wait-purchase-total-price">
                                    Tổng số tiền:
                                    <span className="wait-purchase-total-price-text">
                                        {infoOrder.orderList?.amount}₫
                                    </span>
                                </div>
                            </div>
                            <div className="wait-purchase-cancel-order">
                                {/* {infoOrder.orderList.status !== 'cancel' && (
                                <button
                                    className="wait-purchase-cancel-order-button"
                                    // onClick={() => handleClick(item._id.toString())}
                                >
                                    Huỷ đơn
                                </button>
                            )} */}

                                <button
                                    className="wait-purchase-cancel-order-button"
                                    onClick={() =>
                                        handleClick(infoOrder.orderList?.status)
                                    }
                                >
                                    {buttonStatus(infoOrder.orderList?.status)}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
