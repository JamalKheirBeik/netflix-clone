import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
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
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const getStats = async () => {
      try {
        const res = await axios.get("/users/stats", {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
          signal: abortController.signal,
        });
        const statsList = res.data.sort((a, b) => {
          return a._id - b.value;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (error) {
        if (error.name !== "CanceledError") console.log(error);
      }
    };
    getStats();
    return () => abortController.abort();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
