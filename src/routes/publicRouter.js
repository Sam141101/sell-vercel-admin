import Order from '../pages/order/Order';
import DefaultLayoutOrder from '../Layout/DefaultLayoutOrder';
import Home from '../pages/home/Home';
import NewProduct from '../pages/newProduct/NewProduct';
import UserList from '../pages/userList/UserList';
import User from '../pages/user/User';
import NewUser from '../pages/newUser/NewUser';
import ProductList from '../pages/productList/ProductList';
import Product from '../pages/product/Product';
import WaitingForTheGoods from '../pages/orderList/WaitingForTheGoods';
import WaitForConfirmation from '../pages/orderList/WaitForConfirmation';
import Delivering from '../pages/orderList/Delivering';
import Complete from '../pages/orderList/Complete';
import Canceled from '../pages/orderList/Canceled';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: null,
    },
    {
        path: '/users',
        component: UserList,
        layout: null,
    },
    {
        path: '/user/:userId',
        component: User,
        layout: null,
    },
    {
        path: '/newUser',
        component: NewUser,
        layout: null,
    },
    {
        path: '/products',
        component: ProductList,
        layout: null,
    },
    {
        path: '/product/:productId',
        component: Product,
        layout: null,
    },
    {
        path: '/newproduct',
        component: NewProduct,
        layout: null,
    },

    // order
    {
        path: '/wait-for-confirmation',
        component: WaitForConfirmation,
        show1: 1,
    },
    {
        path: '/waiting-for-the-goods',
        component: WaitingForTheGoods,
        show1: 2,
    },

    {
        path: '/delivering',
        component: Delivering,
        show1: 3,
    },

    {
        path: '/complete',
        component: Complete,
        show1: 4,
    },

    {
        path: '/canceled',
        component: Canceled,
        show1: 5,
    },

    {
        // path: '/order',
        path: '/order/:id',
        component: Order,
        layout: null,
        // show1: 5,
    },
];

export { publicRoutes };
