import { FC } from "react";

// interface TableRowData {
//   tenant: string;
//   admin: string;
//   adminEmail: string;
//   phoneNumber: string;
//   status: 'Active' | 'Pending' | 'Deactivated';
// }

// interface TableProps {
//   data: TableRowData[];
// }

interface Report {
  tenant: string;
  admin: string;
  adminEmail: string;
  phoneNumber: string;
  status: "Active" | "Pending" | "Deactivated";
}

interface ReportRowProps {
  report: Report;
}

const AdminReportRow: FC<ReportRowProps> = () => {
  return <div>Row</div>;
};

export default AdminReportRow;
