import { FC } from "react";
import { formatDateTime } from "../../../ui/utils/helpers";

interface Tenant {
  status: string;
  timeStamp: string;
  severity: string;
  index: number;
}



const PriorityTableRow: FC<Tenant> = ({ severity, timeStamp, status, index }) => {


  return (
    <div
      className={`grid grid-cols-3 text-base gap-4 p-4 border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
        }`}
    >
      <div>{severity}</div>

      <div>
        <span className={`px-2 py-1 rounded-full ${status === "Closed" ? "bg-slate-100 text-slate-400" : "text-red-500"}`}>{status}</span>
      </div>
      <div className="text-slate-400">{formatDateTime(timeStamp)}</div>
    </div>
  );
};

export default PriorityTableRow;
