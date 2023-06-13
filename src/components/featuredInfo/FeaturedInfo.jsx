import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState, useEffect } from 'react';

export default function FeaturedInfo({ token, axiosJWT }) {
    const [income, setIncome] = useState([]);
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        const getIncome = async () => {
            try {
                const res = await axiosJWT.get(
                    'http://localhost:5000/api/orders/income',
                    {
                        headers: { token: `Bearer ${token}` },
                    },
                );

                setIncome(res.data);
                setPercent(
                    (res.data.this_month[0].total * 100) / res.data.last_month - 100,
                );
            } catch (err) {}
        };

        getIncome();
    }, [token]);

    console.log('income', income);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">
                    Tổng doanh thu tháng {income.this_month && income.this_month[0].month}
                </span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">
                        {income.this_month && income.this_month[0].total} ₫
                    </span>

                    <span className="featuredMoneyRate">
                        %{Math.floor(percent)}
                        {percent < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">
                    {percent > 0 ? 'Đạt chỉ tiêu' : 'Chưa đạt chỉ tiêu'} so với tháng
                    trước
                </span>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Tổng doanh thu tháng trước</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{income?.last_month}₫</span>
                </div>
            </div>

            <div className="featuredItem">
                <span className="featuredTitle">Tổng doanh thu năm nay</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{income?.this_year}₫</span>
                </div>
            </div>
        </div>
    );
}
