import { FC } from "react";
import ViewCase from "./modals/ViewCase";
import ReopenCase from "./modals/ReopenCase";
import AssignCase from "./modals/AssignCase";
import { CasesTableRowProps } from "../../../db";

const CaseTableRow: FC<CasesTableRowProps> = ({
  id,
  priority,
  status,
  assignee,
  updatedAt,
  index,
}) => {
  return (
    <div
      className={`grid grid-cols-6 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div>C{id.slice(0, 4)}</div>
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
      <div>{assignee.name ? assignee?.name : "Unassigned"}</div>

      {/* lastModified should be in the format "December 6, 2024" */}
      <div>{updatedAt}</div>
      <div className="flex justify-between xl:max-w-[70%]">
        {status === "Closed" ? <ReopenCase caseId={id} /> : <AssignCase caseId={id}/>}
        <ViewCase caseId={id}/>
      </div>
    </div>
  );
};

export default CaseTableRow;
