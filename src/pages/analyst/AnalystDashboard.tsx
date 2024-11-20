import { FC } from "react";
import StatsDashboard from "../../features/manager/dashboard/DashboardStats";
import { priorityData, recentData } from "../../db";
import ManagerTrendGraph from "../../features/manager/dashboard/ManagerTrendGraph";
import PriorityTable from "../../features/manager/dashboard/PriorityTable";
import RecentTable from "../../features/manager/dashboard/RecentTable";

/**
 * AnalystDashboard Component
 *
 * This functional component renders the Manager's Dashboard page, which includes statistics, a line chart, and a table.
 * It is designed to provide a high-level overview of the manager's key metrics and data visualization.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the Analyst's Dashboard page
 *
 * @dependencies
 * - StatsDashboard: A component that displays various statistics related to the manager's dashboard.
 * - ApexLineChart: A component that renders a line chart for visual data representation.
 * - DashboardTable: A component that displays tabular data relevant to the manager's dashboard.
 */

const AnalystDashboard: FC = () => {
  const heading1 = ["Alert Type", "Time Stamp", "Status"];
  const heading2 = ["Action", "User", "Date/Time"];

  return (
    <div className="flex flex-col gap-8 hide-scrollbar ">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <div className="space-y-8">
        <StatsDashboard />
        <ManagerTrendGraph />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:space-y-0 ">
          <div className="bg-white rounded-2xl shadow-md border p-4 h-auto min-h-[400px]">
            <h3>Priority Alert</h3>
            <PriorityTable headingData={heading1} data={priorityData} />
          </div>
          <div className="bg-white rounded-2xl shadow-md border p-4 h-auto min-h-[400px]">
            Recent Activities
            <RecentTable headingData={heading2} data={recentData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalystDashboard;
