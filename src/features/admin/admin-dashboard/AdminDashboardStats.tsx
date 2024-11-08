import { FC } from "react";
import AdminDashStats from "./AdminDashStats";

const AdminDashboardStats: FC = () => {
  return (
    <div className="grid grid-cols-4 gap-10">
      <AdminDashStats />
    </div>
  );
};

export default AdminDashboardStats;
