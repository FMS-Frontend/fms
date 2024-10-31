import { FC } from "react";
import DashboardStats from "../features/admin/admin-dashboard/AdminDashboardStats";
import SearchInput from "../ui/SearchInput";
import OutlineButton from "../ui/OutlineButton";
import AddIntegration from "../features/admin/integration/AddIntegration";
import AdminIntegrationTable from "../features/admin/integration/AdminIntegrationTable";

const AdminIntegration: FC = () => {
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="font-bold text-4xl">Integration</h1>
      <DashboardStats />

      <div className="flex justify-between">
        <div className="flex gap-10">
          <AddIntegration />
          <OutlineButton>Export As</OutlineButton>
        </div>

        <SearchInput />
      </div>

      <AdminIntegrationTable />
    </div>
  );
};

export default AdminIntegration;
