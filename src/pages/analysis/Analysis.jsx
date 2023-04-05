import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './analysis.css';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useMemo, useState, useEffect } from 'react';
// import { userRequest } from "../../requestMethods";
import axios from 'axios';
import { useSelector } from 'react-redux';
import AnalysisOrderStatus from '../../components/AnalysisOrderStatus/AnalysisOrderStatus';

export default function Analysis() {
    const admin = useSelector((state) => state.user?.currentUser);
    const token = admin.token;

    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/users/stats', {
                    headers: { token: `Bearer ${token}` },
                });
            } catch (err) {}
        };
        getStats();
    }, [token]);

    return (
        <div className="analysis">
            {/* <FeaturedInfo token={token} /> */}

            <div className="user-order-status">
                <AnalysisOrderStatus title="complete" token={token} />
                <AnalysisOrderStatus title="cancel" token={token} />
            </div>
        </div>
    );
}
