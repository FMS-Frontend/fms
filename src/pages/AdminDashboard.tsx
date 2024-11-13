import { FC } from "react";
import AdminDashboardTable from "../features/admin/admin-dashboard/AdminDashboardTable";
import ApexLineChart from "../features/admin/admin-dashboard/ApexLineChart";
import AdminDashboardStats from "../features/admin/admin-dashboard/AdminDashboardStats";

/**
 * AdminDashboard Component
 *
 * This functional component renders the main dashboard view for administrators.
 * It includes a title, a stats summary, a line chart for visual data representation,
 * and a table for listing detailed dashboard data.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the admin dashboard view.
 *
 * @example
 * <AdminDashboard />
 *
 * @dependencies
 * - AdminDashboardStats: Displays a summary of statistics relevant to the admin.
 * - ApexLineChart: A line chart component showing trends or analytics data.
 * - AdminDashboardTable: A table component displaying detailed dashboard data.
 */

const AdminDashboard: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <AdminDashboardStats />
      <ApexLineChart />
      <AdminDashboardTable />
    </div>
  );
};

export default AdminDashboard;
