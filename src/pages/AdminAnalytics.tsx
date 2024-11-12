import { FC } from "react";
import AdminDashboardStats from "../features/admin/admin-dashboard/AdminDashboardStats";
import ApexLineChart from "../features/admin/admin-dashboard/ApexLineChart";

const AdminAnalytics: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <AdminDashboardStats />
      <ApexLineChart />
    </div>
  );
};

export default AdminAnalytics;
