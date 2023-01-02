import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useState, useEffect } from "react";
// import { userRequest } from "../../requestMethods";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Home() {
  const [userStats, setUserStats] = useState([]);
  const admin = useSelector((state) => state.user?.currentUser);

  const token = admin.token;

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get("https://sell-vercel.vercel.app/api/users/stats", {
          headers: { token: `Bearer ${token}` },
        });

        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {}
    };
    getStats();
  }, [token, MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo token={token} />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm token={token} />
        <WidgetLg token={token} />
      </div>
    </div>
  );
}
