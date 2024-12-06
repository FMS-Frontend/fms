import { FC } from "react";
import OutlineButton from "../ui/OutlineButton";
import SearchInput from "../ui/SearchInput";
import TenantTable from "../features/super-user/tenants/TenantTable";
import AddTenant from "../features/super-user/tenants/AddTenant";

/**
 * Tenant Component
 *
 * This functional component renders the Tenant Management page, which includes options for managing tenants,
 * searching for specific tenants, adding new tenants, and exporting tenant data. It also displays the tenant data
 * in a table format.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the Tenant Management page.
 *
 * @example
 * <Tenant />
 *
 * @dependencies
 * - SearchInput: A component that provides an input field for searching tenants.
 * - AddTenant: A button or form component used to add a new tenant to the system.
 * - OutlineButton: A button component styled with an outline for secondary actions, such as exporting tenant data.
 * - TenantTable: A component that displays a table of tenants or tenant-related data.
 */

const Tenant: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Organization Management</h1>

      <div className="flex justify-between">
        <SearchInput />

        <div className="flex gap-10">
          <AddTenant />
          <OutlineButton>Export As</OutlineButton>
        </div>
      </div>

      <TenantTable />
    </div>
  );
};

export default Tenant;
