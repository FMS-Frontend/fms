import { FC } from "react";
import StatsDashboard from "../../../features/manager/dashboard/DashboardStats";
import ManagerTrendGraph from "../../../features/manager/dashboard/ManagerTrendGraph";
import UserTrendGraph from "./UserTrends";

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

const AnalystManagement: FC = () => {
  return (
    <div className="flex flex-col gap-8 hide-scrollbar ">
      {/* <h1 className="font-bold text-4xl">Analytics</h1> */}
      <div className="space-y-8">
        <StatsDashboard />
        <ManagerTrendGraph />
        <UserTrendGraph />
      </div>
    </div>
  );
};

export default AnalystManagement;
