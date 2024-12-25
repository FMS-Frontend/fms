import { FC } from "react";
import { formatTime } from "../../../db/helperFunctions";

interface AuditRowProps {
  audit: AdminAudit;
  index: number;
}

const AdminAuditRow: FC<AuditRowProps> = ({ audit, index }) => {
  console.log(audit);
  const { operation, updatedAt, ipAddress, author } = audit;

  return (
    <div
      className={`grid grid-cols-[1.5fr_1fr_1.5fr_1.5fr_1fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-xl">{operation}</span>
      <span className="text-xl">{formatTime(updatedAt)}</span>
      <span className="text-xl">{ipAddress}</span>
      <span className="text-xl">{author.name}</span>
      <span className="text-xl">{author.role}</span>
    </div>
  );
};

export default AdminAuditRow;
