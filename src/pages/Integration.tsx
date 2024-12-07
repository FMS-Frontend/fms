import { FC } from "react";
import DashboardTable from "../features/admin/admin-dashboard/AdminDashboardTable";
import DashboardStats from "../features/admin/integration/AdminIntegrationStats";
import SearchInput from "../ui/utils/SearchInput";
import OutlineButton from "../ui/utils/OutlineButton";
import AddIntegration from "../features/admin/integration/AddIntegration";

/**
 * Integration Component
 *
 * This functional component renders the integration management view for administrators.
 * It includes a title, a section for dashboard statistics, options to add new integrations and export data,
 * a search input for filtering integrations, and a table displaying integration entries.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the integration management view.
 *
 * @example
 * <Integration />
 *
 * @dependencies
 * - DashboardStats: A component that displays key statistics related to integrations.
 * - AddIntegration: A component or button that allows adding new integrations.
 * - OutlineButton: A button styled with an outline, used for exporting integration data.
 * - SearchInput: A search input field for filtering integrations.
 * - DashboardTable: A table displaying the list of integrations.
 */

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
