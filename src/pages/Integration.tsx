import { FC } from "react";
import DashboardTable from "../features/admin/admin-dashboard/AdminDashboardTable";
import DashboardStats from "../features/admin/integration/AdminIntegrationStats";
// import ApexLineChart from "../features/admin/admin-dashboard/ApexLineChart";
import SearchInput from "../ui/SearchInput";
import OutlineButton from "../ui/OutlineButton";
import AddIntegration from "../features/admin/integration/AddIntegration";

const Integration: FC = () => {
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

      <DashboardTable />
    </div>
  );
};

export default Integration;
