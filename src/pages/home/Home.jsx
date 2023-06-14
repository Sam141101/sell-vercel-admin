import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useMemo, useState, useEffect } from 'react';
import { getUsers } from '../../redux/apiCalls';
import AnalysisOrderStatus from '../../components/AnalysisOrderStatus/AnalysisOrderStatus';

export default function Home({ admin, axiosJWT, dispatch, BASE_URL_API }) {
    const token = admin.token;
    const [userStats, setUserStats] = useState([]);

    const MONTHS = useMemo(
        () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Agu',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
        ],
        [],
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                // const res = await axiosJWT.get('http://localhost:5000/api/users/stats', {
                const res = await axiosJWT.get(BASE_URL_API + `users/stats`, {
                    headers: { token: `Bearer ${token}` },
                });

                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], 'Active User': item.total },
                    ]),
                );
            } catch (err) {}
        };
        getStats();
    }, [token, MONTHS]);

    useEffect(() => {
        getUsers(dispatch, token, axiosJWT);
    }, [token, dispatch]);

    return (
        <div className="home">
            {/* <FeaturedInfo token={token} axiosJWT={axiosJWT} />
            <div className="home-chart">
                <Chart
                    data={userStats}
                    title="Phân tích người dùng"
                    grid
                    dataKey="Active User"
                />
            </div> */}

            <div className="homeWidgets">
                <WidgetSm
                    token={token}
                    // admin={admin}
                    axiosJWT={axiosJWT}
                    // dispatch={dispatch}
                />
                <WidgetLg
                    token={token}
                    // admin={admin}
                    axiosJWT={axiosJWT}
                    // dispatch={dispatch}
                />
            </div>

            <div className="user-order-status">
                <AnalysisOrderStatus
                    title="complete"
                    axiosJWT={axiosJWT}
                    BASE_URL_API={BASE_URL_API}
                    token={token}
                />
                <AnalysisOrderStatus
                    title="cancel"
                    axiosJWT={axiosJWT}
                    BASE_URL_API={BASE_URL_API}
                    token={token}
                />
            </div>
        </div>
    );
}
