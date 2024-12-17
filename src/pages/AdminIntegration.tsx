import { FC } from "react";
import SearchInput from "../ui/utils/SearchInput";
import OutlineButton from "../ui/utils/OutlineButton";
import AddIntegration from "../features/admin/integration/AddIntegration";
import AdminIntegrationTable from "../features/admin/integration/AdminIntegrationTable";
import AdminIntegrationStats from "../features/admin/integration/AdminIntegrationStats";

/**
 * AdminIntegration Component
 *
 * This functional component renders the integration view for administrators.
 * It includes a title, integration statistics, options to add new integrations and export data,
 * a search input, and a table displaying integration details.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the admin integration view.
 *
 * @example
 * <AdminIntegration />
 *
 * @dependencies
 * - AdminIntegrationStats: Displays statistics related to integrations.
 * - AddIntegration: A component or button that allows admins to add a new integration.
 * - OutlineButton: A button with an outline style, used here for exporting data.
 * - SearchInput: A search input field for filtering integrations.
 * - AdminIntegrationTable: A table displaying the list of integrations.
 */

const AdminIntegration: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Integration</h1>
      <AdminIntegrationStats />

      <div className="flex justify-between">
        <SearchInput />

        <div className="flex gap-10">
          <AddIntegration />
          <OutlineButton>Export As</OutlineButton>
        </div>
      </div>

      <AdminIntegrationTable />
    </div>
  );
};

export default AdminIntegration;
