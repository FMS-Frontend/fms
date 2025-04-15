import { FC } from "react";
// import OutlineButton from "../ui/utils/OutlineButton";
import SearchInput from "../ui/utils/SearchInput";
import AuditTable from "../features/super-user/audit/AuditTable";
import DateComp from "../ui/utils/DateComp";

/**
 * Audit Component
 *
 * This functional component renders the audit log view for administrators.
 * It includes a title, a date selection component, a search input for filtering the audit log,
 * an export button, and a table displaying the audit log entries.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the audit log view.
 *
 * @example
 * <Audit />
 *
 * @dependencies
 * - DateComp: A component for selecting dates to filter audit logs.
 * - SearchInput: A search input field for filtering audit log entries by keywords.
 * - OutlineButton: A button with an outline style, used here for exporting the audit log.
 * - AuditTable: A table component displaying the audit log entries.
 */

const Audit: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col  gap-10">
      <h1 className="font-bold text-4xl">Audit Log</h1>

      <div className="flex gap-10">
        <DateComp />
      </div>

      <div className="flex justify-between ">
        <SearchInput width="w-full" />
        {/* <OutlineButton>Export as</OutlineButton> */}
      </div>

      <AuditTable />
    </div>
  );
};

export default Audit;
