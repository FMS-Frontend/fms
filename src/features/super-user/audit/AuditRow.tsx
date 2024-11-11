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

const AuditRow: FC<AuditRowProps> = () => {
  return <div>Row</div>;
};

export default AuditRow;
