import { FC } from "react";
import { formatRuleDate, formatTime } from "../../../ui/utils/helpers";
import ReopenAlert from "./modals/ReopenAlert";
import AssignAlert from "./modals/AssignAlert";
import ViewAlert from "./modals/ViewAlert";

// interface Alert {
//   id: string;
//   type: string;
//   status: string;
//   severity: string;
//   timestamp: string;
//   actions?: string;
// }

interface AlertTableRowProps extends Alert {
  index: number;
}

const AlertTableRow: FC<AlertTableRowProps> = ({
  id,
  type,
  status,
  severity,
  timestamp,
  index,
}) => {
  return (
    <div
      className={`grid grid-cols-7 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div>{formatRuleDate(timestamp)}</div>
      <div>{id}</div>
      <div>{type}</div>
      <div>
        <span className={`px-2 py-1 rounded-full ${status === "Closed" ? "bg-slate-100 text-slate-400" : "text-red-500"}`}>{status}</span>
      </div>
      <div>{severity}</div>
      <div>{formatTime(timestamp)}</div>
      <div className="flex justify-between lg:max-w-[70%]">
        {status === "Closed" ? <ReopenAlert /> : <AssignAlert />}
        <ViewAlert />
      </div>
    </div>
  );
};

export default AlertTableRow;
