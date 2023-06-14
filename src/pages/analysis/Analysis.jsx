import Chart from '../../components/chart/Chart';
import './analysis.css';
import { useMemo, useState, useEffect } from 'react';
import AnalysisOrderStatus from '../../components/AnalysisOrderStatus/AnalysisOrderStatus';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';

export default function Analysis({ admin, dispatch, axiosJWT, BASE_URL_API, axios }) {
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
                const res = await axiosJWT.get(BASE_URL_API + 'orders/stats', {
                    headers: { token: `Bearer ${token}` },
                });

                console.log('amoutn-month', res.data);
                // res.data.map((item) =>
                //     setUserStats((prev) => [
                //         ...prev,
                //         { name: MONTHS[item._id - 1], 'Amount Order': item.total },
                //     ]),
                // );
            } catch (err) {}
        };
        getStats();
    }, [token, MONTHS]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axiosJWT.get(BASE_URL_API + 'orders/income-year', {
                    headers: { token: `Bearer ${token}` },
                });

                console.log('amoutn-tôtla-month', res.data);
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item.month - 1], 'Amount Order': item.total },
                    ]),
                );
            } catch (err) {}
        };
        getStats();
    }, [token, MONTHS]);

    return (
        <div className="analysis">
            {/* <FeaturedInfo token={token} /> */}

            <FeaturedInfo token={token} axiosJWT={axiosJWT} />

            <div className="home-chart">
                <Chart
                    data={userStats}
                    title="Doanh thu từng tháng"
                    grid
                    dataKey="Amount Order"
                />
            </div>

            {/* <div className="home-chart">
                <Chart
                    data={userStats}
                    title="Phân tích lượng đặt hàng"
                    grid
                    dataKey="Amount Order"
                />
            </div> */}

            {/* <div className="user-order-status">
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
            </div> */}
        </div>
    );
}
