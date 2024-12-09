import { FC } from "react";
import { CasesTableRowProps } from "../../../db";
import ViewCase from "./modals/ViewCase";
import ReopenCase from "./modals/ReopenCase";
import AssignCase from "./modals/AssignCase";

const CaseTableRow: FC<CasesTableRowProps> = ({
  caseId,
  priority,
  status,
  assignedTo,
  lastModified,
  index,
}) => {
  return (
    <div
      className={`grid grid-cols-6 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div>{caseId}</div>
      <div>{priority}</div>
      <div>
        <span
          className={`px-2 py-1 rounded-full ${
            status === "Closed" ? "bg-slate-100 text-slate-400" : "text-red-500"
          }`}
        >
          {status}
        </span>
      </div>
      <div>{assignedTo.name}</div>

      {/* lastModified should be in the format "December 6, 2024" */}
      <div>{lastModified}</div>
      <div className="flex justify-between lg:max-w-[70%]">
        {status === "Closed" ? <ReopenCase /> : <AssignCase />}
        <ViewCase />
      </div>
    </div>
  );
};

export default CaseTableRow;
