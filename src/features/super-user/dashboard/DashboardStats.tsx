import { FC } from "react";
import Stats from "./Stats";

/**
 * DashboardStats component displays a grid layout for various dashboard statistics.
 * The component organizes statistic cards in a four-column grid.
 *
 * @component
 * @returns {JSX.Element} A grid container with statistical information components for the dashboard.
 *
 * Layout:
 * - A four-column grid with a gap of 10 units between each item.
 *
 * @example
 * // Renders the DashboardStats component
 * <DashboardStats />
 */

const DashboardStats: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      <Stats />
    </div>
  );
};

export default DashboardStats;
