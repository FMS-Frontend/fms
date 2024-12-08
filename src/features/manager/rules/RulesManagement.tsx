import { FC } from "react";

// import OutlineButton from "../../../ui/OutlineButton";
import SearchInput from "../../../ui/utils/SearchInput";
// import RuleOperations from "../../analyst/rules/RulesOperations";
import RuleTable from "../../analyst/rules/RuleTable";
import AddRule from "../../analyst/rules/AddRule";
import RuleMgtOperations from "./RuleMgtOperation";
import RuleMgtTable from "./RuleMgtTable";
import { rulesData } from "../../../db";

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

const RulesManagement: FC = (): JSX.Element => {
  const headings = [
    "Rule ID",
    "Rule Name",
    "Status",
    "Assigned to",
    "Last Modified",
    "Actions",
  ];
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Rule Management</h1>
      <RuleMgtTable headingData={headings} data={rulesData} />
    </div>
  );
};

export default RulesManagement;
