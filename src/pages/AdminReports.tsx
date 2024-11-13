import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import PrimaryButton from "../ui/PrimaryButton";
import OutlineButton from "../ui/OutlineButton";
import AdminReportTable from "../features/admin/reports/AdminReportTable";
import ReportOperations from "../features/super-user/reports/ReportOperations";

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
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Reports</h1>
      <ReportOperations />

      <div className="flex justify-between">
        <div className="flex gap-10">
          <PrimaryButton>Schedule Report</PrimaryButton>
          <OutlineButton>Export As</OutlineButton>
        </div>

        <PrimaryButton>
          <FiPlus />
          Add to Report
        </PrimaryButton>
      </div>

      <AdminReportTable />
    </div>
  );
};

export default AdminReports;
