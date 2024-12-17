import { FC } from "react";
import ReportOperations from "../features/super-user/reports/ReportOperations";
import AdminReportsTab from "./AdminReportsTab";

/**
 * AdminReports Component
 *
 * This functional component renders the reports management view for administrators.
 * It includes a title, a section for report operations, options to schedule and export reports,
 * a button to add data to a report, and a table displaying report entries.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the admin reports management view.
 *
 * @example
 * <AdminReports />
 *
 * @dependencies
 * - ReportOperations: A component handling various report-related operations.
 * - PrimaryButton: A styled button component for primary actions, used here for scheduling reports and adding data to reports.
 * - OutlineButton: A button with an outline style, used here for exporting reports.
 * - FiPlus: An icon from react-icons, used to visually enhance the "Add to Report" button.
 * - AdminReportTable: A table component displaying the list of reports.
 */

const AdminReports: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-bold text-4xl">Reports</h1>
      <ReportOperations />

      <AdminReportsTab />
    </div>
  );
};

export default AdminReports;
