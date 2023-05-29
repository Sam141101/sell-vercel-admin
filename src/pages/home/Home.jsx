import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useMemo, useState, useEffect } from 'react';
// import { userRequest } from "../../requestMethods";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/apiCalls';
import { createAxiosInstance } from '../../useAxiosJWT';

export default function Home() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;
    // const users = useSelector((state) => state.users?.users);
    const [userStats, setUserStats] = useState([]);

    const dispatch = useDispatch();
    const axiosJWT = createAxiosInstance(admin, dispatch);

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
                const res = await axiosJWT.get('http://localhost:5000/api/users/stats', {
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
            <FeaturedInfo token={token} axiosJWT={axiosJWT} />
            <div className="home-chart">
                <Chart
                    data={userStats}
                    title="Phân tích người dùng"
                    grid
                    dataKey="Active User"
                />
            </div>
            <div className="homeWidgets">
                <WidgetSm token={token} admin={admin} />
                <WidgetLg token={token} admin={admin} />
            </div>
        </div>
    );
}
