import { FC } from "react";
import StatsDashboard from "../../features/manager/DashboardStats";
import ApexLineChart from "../../features/super-user/dashboard/ApexLineChart";
import DashboardTable from "../../features/super-user/dashboard/DashboardTable";

const ManagerDashboard: FC = () => {
  return (
    <div className="p-16 flex flex-col gap-8 bg-slate-100 hide-scrollbar">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <StatsDashboard/>
      <ApexLineChart />
      <DashboardTable />
    </div>
  );
};

export default ManagerDashboard;
