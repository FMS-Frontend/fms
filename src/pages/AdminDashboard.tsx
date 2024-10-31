import { FC } from "react";
import AdminDashboardTable from "../features/admin/admin-dashboard/AdminDashboardTable";
import AdminDashboardStats from "../features/admin/admin-dashboard/AdminDashboardStats";
import ApexLineChart from "../features/admin/admin-dashboard/ApexLineChart";

const AdminDashboard: FC = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <AdminDashboardStats />
      <ApexLineChart />
      <AdminDashboardTable />
    </div>
  );
};

export default AdminDashboard;
