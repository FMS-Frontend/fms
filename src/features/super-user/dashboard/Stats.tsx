import { FC } from "react";
import Stat from "./Stat";
import { BsBoxFill } from "react-icons/bs";
import { IoPeople, IoCreate } from "react-icons/io5";
import { RiLineChartLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getSummary } from "../../../services/apiSuperUser";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/**
 * Stats is a React functional component that renders a series of statistical
 * indicators related to tenants, admins, and users. Each statistic includes
 * a title, value, and an associated icon with color theming.
 *
 * @component
 * @returns {JSX.Element} The rendered statistics component containing multiple Stat components.
 *
 * @example
 * return (
 *   <Stats />
 * );
 */

export interface StatData {
  value: number; // Adjust the type based on the actual structure of your API response
}

const Stats: FC = () => {
  const { data: stats, isLoading } = useQuery<StatData[]>({
    queryFn: getSummary,
    queryKey: ["stats"],
  });
  // console.log(stats);

  return (
    <>
      <Stat
        title="Total Tenants Created"
        color="yellow"
        icon={<BsBoxFill />}
        value={isLoading ? <Skeleton /> : stats?.[0]?.value ?? "N/A"}
      />
      <Stat
        title="Total Admin Created"
        color="blue"
        icon={<IoPeople />}
        value={isLoading ? <Skeleton /> : stats?.[1]?.value ?? "N/A"}
      />
      <Stat
        title="Total Active Users"
        color="green"
        icon={<RiLineChartLine />}
        value={isLoading ? <Skeleton /> : stats?.[2]?.value ?? "N/A"}
      />
      <Stat
        title="Average Account Created Per Day"
        color="red"
        icon={<IoCreate />}
        value={isLoading ? <Skeleton /> : stats?.[3]?.value ?? "N/A"}
      />
    </>
  );
};

export default Stats;
