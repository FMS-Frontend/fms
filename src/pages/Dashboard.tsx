import { FC } from "react";
import DashboardTable from "../features/super-user/dashboard/DashboardTable";
import DashboardStats from "../features/super-user/dashboard/DashboardStats";
import ApexLineChart from "../features/super-user/dashboard/ApexLineChart";

const Dashboard: FC = () => {
  return (
    <div className="p-8 lg:p-16 flex flex-col gap-8 ">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <DashboardStats />
      <ApexLineChart />
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
