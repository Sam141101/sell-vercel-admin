import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useState, useEffect } from 'react';
// import { userRequest } from "../../requestMethods";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createAxiosInstance } from '../../useAxiosJWT';

export default function FeaturedInfo({ token }) {
    const admin = useSelector((state) => state.user?.currentUser);

    const [income, setIncome] = useState([]);
    const [percent, setPercent] = useState(0);

    const dispatch = useDispatch();
    const axiosJWT = createAxiosInstance(admin, dispatch);

    // useEffect(() => {
    //   const getIncome = async () => {
    //     try {
    //       const res = await axios.get("http://localhost:5000/api/orders/income", {
    //         headers: { token: `Bearer ${token}` },
    //       });
    //       setIncome(res.data);
    //       setPercent((res.data[1].total * 100) / res.data[0].total - 100);
    //     } catch (err) {}
    //   };

    //   getIncome();
    // }, []);

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
                    (res.data[res.data.length - 1].total * 100) /
                        res.data[res.data.length - 2].total -
                        100,
                );
            } catch (err) {}
        };

        getIncome();
    }, [token]);

    console.log(income);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Tỉ lệ doanh thu tháng</span>
                <div className="featuredMoneyContainer">
                    {/* <span className="featuredMoney">{income[1].total}đ</span> */}
                    <span className="featuredMoney">
                        {income[income.length - 1]?.total}₫
                    </span>

                    {/* <span className="featuredMoney">111đ</span> */}
                    <span className="featuredMoneyRate">
                        {/* 111 */}%{Math.floor(percent)}
                        {percent < 0 ? (
                            <ArrowDownward className="featuredIcon negative" />
                        ) : (
                            <ArrowUpward className="featuredIcon" />
                        )}
                    </span>
                </div>
                <span className="featuredSub">So với tháng trước</span>
            </div>

            {/* <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div> */}
        </div>
    );
}
