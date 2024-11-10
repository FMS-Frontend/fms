import { FC } from "react";
import StatsDashboard from "../../features/manager/DashboardStats";
// import ApexLineChart from "../../features/super-user/dashboard/ApexLineChart";
import PriorityTable from "../../features/manager/PriorityTable";
import RecentTable from "../../features/manager/RecentTable";
import { priorityData, recentData } from "../../db";
import ManagerTrendGraph from "../../features/manager/ManagerTrendGraph";

const ManagerDashboard: FC = () => {
  const heading1 = ["Alert Type", "Time Stamp", "Status"];
  const heading2 = ["Action", "User", "Date/Time"];

  return (
    <div className="flex flex-col gap-8 hide-scrollbar lg:bg-slate-50 lg:space-y-8 lg:p-8">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <div className="space-y-8">
      <StatsDashboard />
      <ManagerTrendGraph />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:space-y-0 ">
        <div className="bg-white rounded-2xl shadow-md border p-4 h-auto min-h-[400px]">
          <h3>Priority Alert</h3>
          <PriorityTable headingData={heading1} data={priorityData}/>
        </div>
        <div className="bg-white rounded-2xl shadow-md border p-4 h-auto min-h-[400px]">
          Recent Activities
        <RecentTable headingData={heading2} data={recentData}/>
        </div>
      </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
