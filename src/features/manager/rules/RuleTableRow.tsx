
import { FC } from "react";
import EditRule from "./modals/EditRule";
import ViewRule from "./modals/ViewRule";

export interface RuleTableRowProps {
  ruleId: string;
  ruleName: string; 
  status: "Active" | "Inactive";
  lastModified: string;
  index: number;
}

const RuleTableRow: FC<RuleTableRowProps> = ({
  ruleId,
  ruleName,
  status,
  lastModified,
  index,
}) => {
  return (
    <div
      className={`grid grid-cols-5 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div>R{ruleId.slice(0, 4)}</div>
      <div>{ruleName}</div>
      <div>
        <span
          className={`px-2 py-1 rounded-full ${
            status === "Active"
              ? "bg-green-100 hover:bg-green-200 text-green-500"
              : "bg-red-50 hover:bg-red-100 text-red-500"
          }`}
        >
          {status}
        </span>
      </div>
      <div>{lastModified}</div>
      <div className="flex justify-between lg:max-w-[50%]">
        <EditRule ruleId={ruleId}/>
        <ViewRule ruleId={ruleId}/>
      </div>
    </div>
  );
};

export default RuleTableRow;
