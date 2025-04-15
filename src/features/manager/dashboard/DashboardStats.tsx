import { FC, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCaseStats } from "../../../services/managerServices";
import ManagerStat from "./ManagerStat";
import { useAppContext } from "../../../context/AppContext";
import { FaChartLine, FaUsers } from "react-icons/fa";
import { IoTimerOutline } from "react-icons/io5";
import { LuBox } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

const StatsDashboard: FC = () => {
  const { tenant } = useAppContext();
  const [statsData, setStatsData] = useState([
    {
      icon: <FaChartLine />,
      title: "Total Active Cases",
      caseValue: 0,
      color: "green",
      isGain: false,
      text: "Down this year",
      percent: 4.3,
    },
    {
      icon: <FaUsers />,
      title: "Unassigned Cases",
      caseValue: 0,
      color: "blue",
      isGain: true,
      text: "Up this month",
      percent: 8.5,
    },
    {
      icon: <IoTimerOutline />,
      title: "Alert Awaiting Review",
      caseValue: 0,
      color: "red",
      isGain: true,
      text: "Up from yesterday",
      percent: 1.8,
    },
    {
      icon: <LuBox />,
      title: "Cases Closed This Month",
      caseValue: 0,
      color: "yellow",
      isGain: true,
      text: "Up from past month",
      percent: 1.3,
    },
  ]);

  // Fetch statistics using react-query
  const { data, isLoading, error } = useQuery({
    queryKey: ["caseStats", tenant],
    queryFn: () => fetchCaseStats(tenant),
    enabled: !!tenant,
  });
  

  useEffect(() => {
    if (data) {
      const updatedStats = [...statsData];
      updatedStats[0].caseValue = data?.totalActive;
      updatedStats[1].caseValue = data?.totalUnassigned;
      updatedStats[2].caseValue = data?.alertsAwaitingReview;
      updatedStats[3].caseValue = data?.totalClosedThisMonth;
      setStatsData(updatedStats);
    }
  }, [data]);

  if (error) {
    toast.error("Failed to fetch case stats. Please try again later.");
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <ManagerStat
          key={index}
          icon={stat.icon}
          title={stat.title}
          caseValue={isLoading ? <Skeleton width={50} /> : stat?.caseValue}
          color={stat.color}
          isGain={stat.isGain}
          text={stat.text}
          percent={stat.percent}
        />
      ))}
    </div>
  );
};

export default StatsDashboard;
