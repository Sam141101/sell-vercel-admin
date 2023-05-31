import Chart from '../../components/chart/Chart';
import './analysis.css';
import { useMemo, useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import AnalysisOrderStatus from '../../components/AnalysisOrderStatus/AnalysisOrderStatus';
// import { createAxiosInstance } from '../../useAxiosJWT';

export default function Analysis({ admin, dispatch, axiosJWT, BASE_URL_API, axios }) {
    // const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;

    const [userStats, setUserStats] = useState([]);

    // const dispatch = useDispatch();
    // const axiosJWT = createAxiosInstance(admin, dispatch);

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
                const res = await axiosJWT.get('http://localhost:5000/api/orders/stats', {
                    headers: { token: `Bearer ${token}` },
                });

                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], 'Amount Order': item.total },
                    ]),
                );
            } catch (err) {}
        };
        getStats();
    }, [token, MONTHS]);

    return (
        <div className="analysis">
            {/* <FeaturedInfo token={token} /> */}
            <div className="home-chart">
                <Chart
                    data={userStats}
                    title="Phân tích lượng đặt hàng"
                    grid
                    dataKey="Amount Order"
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
