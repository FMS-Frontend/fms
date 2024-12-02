import { FC } from "react";
import SearchInput from "../../../ui/SearchInput";
import RuleMgtOperations from "../rules/RuleMgtOperation";
import AddCase from "./AddCase";
import CaseTable from "./CaseTable";

/**
 * Analyst Rules Component
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

const CasesManagement: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Case Management</h1>
      <RuleMgtOperations/>

      <div className="flex justify-between">
        <SearchInput />

        <div className="flex gap-8">
          <AddCase/>
        </div>
      </div>

      <CaseTable/>
    </div>
  );
};

export default CasesManagement;
