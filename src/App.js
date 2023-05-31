import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import './App.css';
import './grid.css';
import { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { publicRoutes } from './routes/publicRouter';
import DefaultLayoutOrder from './Layout/DefaultLayoutOrder';
import React from 'react';
import { createAxiosInstance } from './useAxiosJWT';
import { BASE_URL_API } from './requestMethods';
import axios from 'axios';

function App() {
    const isAdmin = useSelector((state) => state.user?.currentUser);
    const dispatch = useDispatch();

    const axiosJWT = createAxiosInstance(isAdmin, dispatch);

    console.log('isAdmin', isAdmin);

    return (
        <Router>
            <Switch>
                <>
                    <Route path="/login">
                        <Login dispatch={dispatch} />
                    </Route>
                    {isAdmin && (
                        <Fragment>
                            <Topbar
                                dispatch={dispatch}
                                id={isAdmin._id}
                                accessToken={isAdmin.token}
                                axiosJWT={axiosJWT}
                                BASE_URL_API={BASE_URL_API}
                            />
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
                                                        <Page
                                                            admin={isAdmin}
                                                            axiosJWT={axiosJWT}
                                                            dispatch={dispatch}
                                                            BASE_URL_API={BASE_URL_API}
                                                            axios={axios}
                                                        />
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
