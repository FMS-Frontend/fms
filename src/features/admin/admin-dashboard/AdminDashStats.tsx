import { FC, useEffect } from "react";
import { BsBoxFill } from "react-icons/bs";
import { IoPeople, IoCreate } from "react-icons/io5";
import { RiLineChartLine } from "react-icons/ri";
import AdminDashStat from "./AdminDashStat";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getAdminSummary } from "../../../services/apiAdmin";
import toast from "react-hot-toast";

export interface StatData {
  value: number; // Adjust the type based on the actual structure of your API response
}

const AdminDashStats: FC = () => {
  const { data: stats, isLoading, error } = useQuery<StatData[]>({
    queryFn: getAdminSummary,
    queryKey: ["stats"],
    retry: true,
  });

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);

  return (
    <>
      <AdminDashStat
        title="Total Users Created"
        color="yellow"
        icon={<BsBoxFill />}
        value={isLoading ? <Skeleton /> : stats?.[0]?.value ?? "N/A"}
      />
      <AdminDashStat
        title="New Users"
        color="blue"
        icon={<IoPeople />}
        value={isLoading ? <Skeleton /> : stats?.[1]?.value ?? "N/A"}
      />
      <AdminDashStat
        title="Active Sessions"
        color="green"
        icon={<RiLineChartLine />}
        value={isLoading ? <Skeleton /> : stats?.[2]?.value ?? "N/A"}
      />
      <AdminDashStat
        title="Total Integrations"
        color="red"
        icon={<IoCreate />}
        value={isLoading ? <Skeleton /> : stats?.[3]?.value ?? "N/A"}
      />
    </>
  );
};

export default AdminDashStats;
