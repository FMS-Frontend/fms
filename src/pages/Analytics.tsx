import { FC } from "react";
import DashboardStats from "../features/super-user/dashboard/DashboardStats";
import ApexLineChart from "../features/super-user/dashboard/ApexLineChart";

/**
 * Analytics Component
 *
 * This functional component renders the analytics view for administrators.
 * It includes a title, a section for dashboard statistics, and a line chart to display analytics data.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the analytics view.
 *
 * @example
 * <Analytics />
 *
 * @dependencies
 * - DashboardStats: Displays key statistics relevant to the analytics view.
 * - ApexLineChart: A line chart component visualizing analytics trends or data.
 */

const Analytics: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-4xl">Analytics</h1>
      <DashboardStats />
      <ApexLineChart />
    </div>
  );
};

export default Analytics;
