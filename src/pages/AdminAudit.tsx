import { FC } from "react";
import OutlineButton from "../ui/OutlineButton";
import SearchInput from "../ui/SearchInput";
import AdminAuditTable from "../features/admin/audit/AuditTable";
import DateComp from "../ui/DateComp";

/**
 * AdminAudit Component
 *
 * This is a functional component that renders an audit log view for administrators.
 * It displays a title, a date filter component, an export button, a search input,
 * and an audit log table.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the audit log view.
 *
 * @example
 * <AdminAudit />
 *
 * @dependencies
 * - DateComp: A date selection component for filtering logs by date.
 * - OutlineButton: A button component styled with an outline, used for exporting data.
 * - SearchInput: A search input field with customizable width for filtering logs by keyword.
 * - AdminAuditTable: A table component that displays the list of audit log entries.
 */

const AdminAudit: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col  gap-8">
      <h1 className="font-bold text-4xl">Audit Log</h1>

      <div className="flex justify-between">
        <div className="flex gap-10">
          <DateComp />
        </div>

        <div className="flex gap-4">
          <OutlineButton>Export as</OutlineButton>
          <SearchInput width="w-full" />
        </div>
      </div>

      <AdminAuditTable />
    </div>
  );
};

export default AdminAudit;
