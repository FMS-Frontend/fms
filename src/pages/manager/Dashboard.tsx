import { FC } from "react";
import DashboardTable from "../../features/dashboard/DashboardTable";
import ApexLineChart from "../../features/dashboard/ApexLineChart";
import StatsDashboard from "../../features/manager/DashboardStats";

const ManagerDashboard: FC = () => {
  return (
    <div className="p-16 flex flex-col gap-8 bg-slate-100">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <StatsDashboard/>
      <ApexLineChart />
      <DashboardTable />
    </div>
  );
};

export default ManagerDashboard;
