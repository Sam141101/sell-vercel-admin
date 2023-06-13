import './sidebar.css';
import {
    LineStyle,
    Timeline,
    PermIdentity,
    Storefront,
    AttachMoney,
    MailOutline,
    DynamicFeed,
    ChatBubbleOutline,
    ShoppingCart,
    LocalOffer,
} from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
    const location = useLocation();
    const select = location.pathname.split('/')[1];

    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Bảng thông tin</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li
                                className={`sidebarListItem ${
                                    select === '' ? 'active' : ''
                                }`}
                            >
                                <LineStyle className="sidebarIcon" />
                                Trang chủ
                            </li>
                        </Link>
                        <Link to="/analysis" className="link">
                            <li
                                className={`sidebarListItem ${
                                    select === 'analysis' ? 'active' : ''
                                }`}
                            >
                                <Timeline className="sidebarIcon" />
                                Phân tích
                            </li>
                        </Link>

                        {/* <Link to="/" className="link">
                            <li className={`sidebarListItem ${select === 'analysis' ? 'active' : ''}`}>
                                <TrendingUp className="sidebarIcon" />
                                Sales
                            </li>
                        </Link> */}
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li
                                className={`sidebarListItem ${
                                    select === 'users' || select === 'user'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <PermIdentity className="sidebarIcon" />
                                Người dùng
                            </li>
                        </Link>
                        <Link to="/products" className="link">
                            <li
                                className={`sidebarListItem ${
                                    select === 'products' ||
                                    select === 'newproduct' ||
                                    select === 'product'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <Storefront className="sidebarIcon" />
                                Sản phẩm
                            </li>
                        </Link>
                        {/* <Link to="/" className="link">
                            <li
                                className={`sidebarListItem ${
                                    select === 'translate' ? 'active' : ''
                                }`}
                            >
                                <AttachMoney className="sidebarIcon" />
                                Giao dịch
                            </li>
                        </Link> */}

                        <Link to="/order/wait-for-confirmation" className="link">
                            <li
                                className={`sidebarListItem ${
                                    select === 'order' ? 'active' : ''
                                }`}
                            >
                                <ShoppingCart className="sidebarIcon" />
                                Đơn hàng
                            </li>
                        </Link>

                        <Link to="/discount/all" className="link">
                            <li
                                className={`sidebarListItem ${
                                    // select === 'discount' ? 'active' : ''
                                    select === 'discount' || select === 'new-discounts'
                                        ? 'active'
                                        : ''
                                }`}
                            >
                                <LocalOffer className="sidebarIcon" />
                                Mã giảm giá
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Thông báo</h3>
                    <ul className="sidebarList">
                        <li
                            // className={`sidebarListItem ${
                            //     select === 'analysis' ? 'active' : ''
                            // }`}
                            className="sidebarListItem"
                        >
                            <MailOutline className="sidebarIcon" />
                            Mail
                        </li>
                        <li
                            // className={`sidebarListItem ${
                            //     select === 'analysis' ? 'active' : ''
                            // }`}
                            className="sidebarListItem"
                        >
                            <DynamicFeed className="sidebarIcon" />
                            Phản hồi
                        </li>
                        <li
                            // className={`sidebarListItem ${
                            //     select === 'analysis' ? 'active' : ''
                            // }`}
                            className="sidebarListItem"
                        >
                            <ChatBubbleOutline className="sidebarIcon" />
                            Tin nhắn
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
