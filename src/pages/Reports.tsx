import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import PrimaryButton from "../ui/utils/PrimaryButton";
// import OutlineButton from "../ui/utils/OutlineButton";
import ReportTable from "../features/super-user/reports/ReportTable";
import ReportOperations from "../features/super-user/reports/ReportOperations";

/**
 * Reports Component
 *
 * This functional component displays the report management page, which includes options for scheduling reports,
 * exporting data, and adding data to a report. It also renders the operations and report tables.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the report management page.
 *
 * @example
 * <Reports />
 *
 * @dependencies
 * - ReportOperations: A component that provides operations related to reports (e.g., filtering, settings).
 * - PrimaryButton: A button component styled with primary colors for the main actions.
 * - OutlineButton: A button styled with an outline for secondary actions, such as exporting.
 * - FiPlus: An icon from the `react-icons/fi` package used in the "Add to Report" button.
 * - ReportTable: A component displaying the list of reports or report entries in a table format.
 */

const Reports: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Reports</h1>
      <ReportOperations />

      <div className="flex justify-between">
        <div className="flex gap-10">
          <PrimaryButton>Schedule Report</PrimaryButton>
          {/* <OutlineButton>Export As</OutlineButton> */}
        </div>

        <PrimaryButton>
          <FiPlus />
          Add to Report
        </PrimaryButton>
      </div>

      <ReportTable />
    </div>
  );
};

export default Reports;
