import { FC } from "react";

interface Alert {
  id: string;
  date: string;
  type: string;
  status: string;
  severity: string;
  timestamp: string;
  actions?: string;
}

interface AlertTableRowProps extends Alert {
  index: number;
}

const AlertTableRow: FC<AlertTableRowProps> = ({
  id,
  date,
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
      <div>{date}</div>
      <div>{id}</div>
      <div>{type}</div>
      <div>
        <span className={`px-2 py-1 rounded-full ${status === "Closed" ? "bg-slate-100 text-slate-400" : "text-red-500"}`}>{status}</span>
      </div>
      <div>{severity}</div>
      <div>{timestamp}</div>
      <div className="flex justify-between lg:max-w-[70%]">
        <button
          className={`px-2 py-1 rounded ${
            status === "Closed"
              ? "bg-red-50 hover:bg-red-100 text-red-500"
              : "bg-green-50 hover:bg-green-100 text-green-500"
          }`}
        >
          {status === "Closed" ? "Reopen" : "Assign"}
        </button>
        <button className="px-2 py-1 rounded bg-primaryBlue text-white cursor-pointer hover:bg-primaryBlue/70">
          View
        </button>
      </div>
    </div>
  );
};

export default AlertTableRow;
