import { FC } from "react";

interface Audit {
  audit: string;
  admin: string;
  adminEmail: string;
  phoneNumber: string;
  status: "Active" | "Pending" | "Deactivated";
}

interface AuditRowProps {
  audit: Audit;
}

const AdminAuditRow: FC<AuditRowProps> = ({ audit }) => {
  return <div>Row</div>;
};

export default AdminAuditRow;
