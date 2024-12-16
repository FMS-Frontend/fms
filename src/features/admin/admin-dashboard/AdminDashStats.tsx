import { FC } from "react";
import { BsBoxFill } from "react-icons/bs";
import { IoPeople, IoCreate } from "react-icons/io5";
import { RiLineChartLine } from "react-icons/ri";
import AdminDashStat from "./AdminDashStat";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAdminSummary } from "../../../services/apiAdmin";

export interface StatData {
  value: number; // Adjust the type based on the actual structure of your API response
}

const AdminDashStats: FC = () => {
  const { data: stats, isLoading } = useQuery<StatData[]>({
    queryFn: getAdminSummary,
    queryKey: ["stats"],
    retry: true,
  });

  return (
    <>
      <AdminDashStat
        title="Total Tenants Created"
        color="yellow"
        icon={<BsBoxFill />}
        value={isLoading ? <Skeleton /> : stats?.[0]?.value ?? "N/A"}
      />
      <AdminDashStat
        title="Total Admin Created"
        color="blue"
        icon={<IoPeople />}
        value={isLoading ? <Skeleton /> : stats?.[1]?.value ?? "N/A"}
      />
      <AdminDashStat
        title="Total Active Users"
        color="green"
        icon={<RiLineChartLine />}
        value={isLoading ? <Skeleton /> : stats?.[2]?.value ?? "N/A"}
      />
      <AdminDashStat
        title="Average Account Created Per Day"
        color="red"
        icon={<IoCreate />}
        value={isLoading ? <Skeleton /> : stats?.[3]?.value ?? "N/A"}
      />
    </>
  );
};

export default AdminDashStats;
