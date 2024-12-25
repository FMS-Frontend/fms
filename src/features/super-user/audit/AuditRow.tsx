import { FC } from "react";
import { formatDateTime } from "../../../db/helperFunctions";

interface AuditRowProps {
  audit: Audit;
  index: number;
}

const AuditRow: FC<AuditRowProps> = ({ audit, index }) => {
  const { operation, ipAddress, updatedAt, author } = audit;

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1.5fr_1.5fr_1fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-xl">{operation}</span>
      <span className="text-xl">{formatDateTime(updatedAt)}</span>
      <span className="text-xl">{ipAddress}</span>
      <span className="text-xl">{author?.name}</span>
      <span className="text-xl">{author?.tenant?.name}</span>
    </div>
  );
};

export default AuditRow;
