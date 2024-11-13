import { FC } from "react";
import DashboardTable from "../features/super-user/dashboard/DashboardTable";
import DashboardStats from "../features/super-user/dashboard/DashboardStats";
import ApexLineChart from "../features/super-user/dashboard/ApexLineChart";

/**
 * Dashboard Component (Super User)
 *
 * This functional component renders the main dashboard view for administrators.
 * It includes a title, a stats summary, a line chart for visual data representation,
 * and a table for listing detailed dashboard data.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the admin dashboard view.
 *
 * @example
 * <Dashboard />
 *
 * @dependencies
 * - AdminDashboardStats: Displays a summary of statistics relevant to the admin.
 * - ApexLineChart: A line chart component showing trends or analytics data.
 * - DashboardTable: A table component displaying detailed dashboard data.
 */

const Dashboard: FC = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <DashboardStats />
      <ApexLineChart />
      <DashboardTable />
    </div>
  );
};

export default Dashboard;
