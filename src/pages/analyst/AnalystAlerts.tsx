import { FC } from "react";

import OutlineButton from "../../ui/utils/OutlineButton";
import AlertsOperations from "../../features/analyst/alerts/AlertsOperations";
import SearchInput from "../../ui/utils/SearchInput";
import AlertsTable from "../../features/analyst/alerts/AlertsTable";

/**
 * Analyst Alert's Component
 *
 * This functional component displays the report management page, which includes options for scheduling reports,
 * exporting data, and adding data to a report. It also renders the operations and report tables.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the report management page
 *
 * @dependencies
 * - ReportOperations: A component that provides operations related to reports (e.g., filtering, settings).
 * - PrimaryButton: A button component styled with primary colors for the main actions.
 * - OutlineButton: A button styled with an outline for secondary actions, such as exporting.
 * - FiPlus: An icon from the `react-icons/fi` package used in the "Add to Report" button.
 * - ReportTable: A component displaying the list of reports or report entries in a table format.
 */

const AnalystAlerts: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Alerts</h1>
      <AlertsOperations />

      <div className="flex justify-between">
        <SearchInput />
        <OutlineButton>Export As</OutlineButton>
      </div>

      <AlertsTable />
    </div>
  );
};

export default AnalystAlerts;
