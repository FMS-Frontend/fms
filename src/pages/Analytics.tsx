import { FC } from "react";
import DashboardStats from "../features/super-user/dashboard/DashboardStats";
import ApexLineChart from "../features/super-user/dashboard/ApexLineChart";

const Analytics: FC = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-4xl">Analytics</h1>
      <DashboardStats />
      <ApexLineChart />
    </div>
  );
};

export default Analytics;
