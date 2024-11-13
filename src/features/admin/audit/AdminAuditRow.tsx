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

// Took out audit prop

const AdminAuditRow: FC<AuditRowProps> = () => {
  return <div>Row</div>;
};

export default AdminAuditRow;
