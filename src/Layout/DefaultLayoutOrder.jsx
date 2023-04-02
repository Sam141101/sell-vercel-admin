import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function DefaultLayoutOrder({ children, show1 }) {
    // const admin = useSelector((state) => state.user?.currentUser);
    // const token = admin.token;
    // console.log(token);
    // const dispatch = useDispatch();
    // const products = useSelector((state) => state.product.products);

    // useEffect(() => {
    //     getProducts(dispatch);
    // }, [dispatch]);

    // const handleDelete = (id) => {
    //     deleteProduct(id, dispatch, token);
    // };

    // const show1 = 1;

    return (
        <div className="order">
            <div className="order-title">Các đơn đặt hàng</div>
            {/* <div className="default-layout-order-container-right">
                <div className="default-layout-order-manage-user">
                    <Link
                        style={{
                            color: 'red',
                            backgroundColor: 'white',
                        }}
                        className="default-layout-order-select-link"
                        to="/wait-for-confirmation"
                    >
                        Chờ xác nhận
                    </Link>
                    <Link
                        className="default-layout-order-select-link"
                        to="/waiting-for-the-goods"
                    >
                        Chờ lấy hàng
                    </Link>

                    <Link className="default-layout-order-select-link" to="/delivering">
                        Đang giao
                    </Link>

                    <Link className="default-layout-order-select-link" to="/complete">
                        Hoàn thành
                    </Link>
                    <Link className="default-layout-order-select-link" to="/canceled">
                        Đã huỷ
                    </Link>
                </div>
            </div> */}

            <div className="default-layout-order-manage-user">
                <Link
                    style={{
                        color: `${show1 === 1 ? 'red' : ''}`,
                    }}
                    className="default-layout-order-select-link"
                    to="/wait-for-confirmation"
                >
                    Chờ xác nhận
                </Link>
                <Link
                    className="default-layout-order-select-link"
                    style={{
                        color: `${show1 === 2 ? 'red' : ''}`,
                    }}
                    to="/waiting-for-the-goods"
                >
                    Chờ lấy hàng
                </Link>

                <Link
                    className="default-layout-order-select-link"
                    style={{
                        color: `${show1 === 3 ? 'red' : ''}`,
                    }}
                    to="/delivering"
                >
                    Đang giao
                </Link>

                <Link
                    className="default-layout-order-select-link"
                    style={{
                        color: `${show1 === 4 ? 'red' : ''}`,
                    }}
                    to="/complete"
                >
                    Hoàn thành
                </Link>
                <Link
                    className="default-layout-order-select-link"
                    style={{
                        color: `${show1 === 5 ? 'red' : ''}`,
                    }}
                    to="/canceled"
                >
                    Đã huỷ
                </Link>
            </div>

            <div className="frame-layout-order">{children}</div>
        </div>
    );
}
