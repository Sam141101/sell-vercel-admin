import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import './grid.css';
import { Fragment } from 'react';
import Home from './pages/home/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useHistory,
    Navigate,
    // Redirect,
} from 'react-router-dom';
import UserList from './pages/userList/UserList';
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';
import { useSelector } from 'react-redux';
import Order from './pages/order/Order';
import { publicRoutes } from './routes/publicRouter';
import DefaultLayoutOrder from './Layout/DefaultLayoutOrder';
import React from 'react';

function App() {
    // const isAdmin = useSelector((state) => state.user?.currentUser.isAdmin);
    const isAdmin = useSelector((state) => state.user?.currentUser);
    console.log(isAdmin);
    const history = useHistory();

    return (
        <Router>
            <Switch>
                <>
                    <Route path="/login">
                        <Login />
                    </Route>
                    {isAdmin && (
                        <Fragment>
                            <Topbar />
                            <div className="container-main">
                                <div className="contont-app-frame">
                                    <div className="app-sidebar">
                                        <Sidebar />
                                    </div>
                                    <div className="app-content">
                                        {publicRoutes.map((route, index) => {
                                            const Page = route.component;

                                            let Layout = DefaultLayoutOrder;

                                            if (route.layout) {
                                                Layout = route.layout;
                                            } else if (route.layout === null) {
                                                // Layout = React.Fragment;
                                                Layout = 'div';
                                            }
                                            return (
                                                <Route
                                                    key={index}
                                                    exact
                                                    path={route.path}
                                                >
                                                    <Layout show1={route.show1}>
                                                        <Page />
                                                    </Layout>
                                                </Route>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )}
                </>
            </Switch>
        </Router>
    );
}

export default App;
