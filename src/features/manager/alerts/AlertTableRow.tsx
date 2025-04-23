import ReopenAlert from "./modals/ReopenAlert";
import AssignAlert from "./modals/AssignAlert";
import ViewAlert from "./modals/ViewAlert";
import { FC } from "react";
import { formatTime, formatDate  } from "../../../db/helperFunctions";

interface AlertTableRowProps {
  id: string;
  description: string;
  status: string;
  severity: string;
  timestamp: string;
  createdAt: string;
  index: number;
}

const AlertTableRow: FC<AlertTableRowProps> = ({
  id,
  description,
  status,
  severity,
  timestamp,
  createdAt,
  index,
}) => {
  return (
    <div className={`grid grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_1fr] text-xs md:text-sm lg:text-lg gap-4 p-4 border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}>
      {/* Date (from createdAt) */}
      <div className=" text-gray-700">
        {formatDate(createdAt)}
      </div>

      {/* Alert ID (trimmed) */}
      <div className=" font-mono text-gray-900 truncate max-w-[180px]">
        {id.slice(0, 8)}
      </div>

      {/* Type (from description, fallback) */}
      <div className=" text-gray-700 line-clamp-2">{description.length > 20 ? description.slice(0, 15)+"..." : description}</div>

      <div>
        <span className={`px-2 py-1 rounded-full ${status === "Closed" ? "bg-slate-100 text-slate-400" : "text-red-500"}`}>{status}</span>
      </div>

      {/* Severity */}
      <div className="">
        {severity}
      </div>

      {/* Timestamp (human-readable) */}
      <div className=" text-gray-600">
        {formatTime(timestamp)}
      </div>
      <div className="flex justify-between max-w-[70%] gap-4">
        {status === "Closed" ? <ReopenAlert /> : <AssignAlert />}
        <ViewAlert alertId={id} />
      </div>
    </div>
  );
};

export default AlertTableRow;

