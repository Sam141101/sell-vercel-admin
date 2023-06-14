import { Link, useLocation } from 'react-router-dom';

export default function DefaultLayoutDiscount({ children, show1 }) {
    const location = useLocation();
    const select = location.pathname.split('/')[2];

    return (
        <div className="order">
            <div className="discount-block">
                <div className="discount-block-body">
                    <h3 className="discount-block-title">Mã giảm giá</h3>
                    <Link className="discount-block-title-new" to="/new-discounts">
                        Tạo mã giảm giá
                    </Link>
                </div>
            </div>
            <div className="default-layout-frame-block">
                <div className="default-layout-order-manage-user">
                    <Link
                        style={{
                            color: `${select === 'all' ? 'red' : ''}`,
                        }}
                        className="default-layout-order-select-link"
                        to="/discount/all"
                    >
                        Tất cả
                    </Link>
                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${select === 'people' ? 'red' : ''}`,
                        }}
                        to="/discount/people"
                    >
                        Mọi người
                    </Link>

                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${select === 'person' ? 'red' : ''}`,
                        }}
                        to="/discount/person"
                    >
                        Cá nhân
                    </Link>

                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${select === 'percentage' ? 'red' : ''}`,
                        }}
                        to="/discount/percentage"
                    >
                        Phần trăm
                    </Link>

                    <Link
                        className="default-layout-order-select-link"
                        style={{
                            color: `${select === 'amount' ? 'red' : ''}`,
                        }}
                        to="/discount/amount"
                    >
                        Số lượng
                    </Link>
                </div>
            </div>

            <div className="frame-layout-order">{children}</div>
        </div>
    );
}
