import { FC } from "react";
import StatsDashboard from "../../features/manager/DashboardStats";
import ApexLineChart from "../../features/super-user/dashboard/ApexLineChart";
import PriorityTable from "../../features/manager/PriorityTable";
import RecentTable from "../../features/manager/RecentTable";
import { mockData, recentData } from "../../db";
// import DashboardTable from "../../features/super-user/dashboard/DashboardTable";

const ManagerDashboard: FC = () => {
  const heading1 = ["Alert Type", "Time Stamp", "Status"];
  const heading2 = ["Action", "User", "Date/Time"];

  return (
    <div className=" flex flex-col gap-8 hide-scrollbar">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <StatsDashboard />
      <ApexLineChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:space-y-0 ">
        <div className="bg-white p-4 rounded h-auto min-h-[400px] border">
          <h3>Priority Alert</h3>
          <PriorityTable headingData={heading1} data={mockData}/>
        </div>
        <div className="bg-white p-4 rounded h-auto min-h-[400px] border">
          Recent Activities
        <RecentTable headingData={heading2} data={recentData}/>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
