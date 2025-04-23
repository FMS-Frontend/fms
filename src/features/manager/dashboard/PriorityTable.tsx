import { FC } from "react";
import Table from "../../../ui/utils/Table";
import PriorityTableRow from "./PriorityTableRow";

interface PriorityTableProps {
  headingData: string[];
  data: {
    id: number;
    severity: string;
    timestamp: string;
    status: string;
  }[];
}

const PriorityTable: FC<PriorityTableProps> = ({ headingData, data }) => {
  // console.log(data);
  
  return (
    <div className="mt-8">
    <Table columns="grid grid-cols-3 gap-4">
      {/* Dynamic Header Rendering */}
        <Table.Header bgColor="">
          {headingData.length > 0 && headingData.map((heading, index) => (
            <div
              key={index}
              className="text-slate-400 font-semibold uppercase text-xs md:text-sm lg:text-lg text-start"
            >
              {heading}
            </div>
          ))}
        </Table.Header>

        {/* Dynamic Row Rendering */}
        {data.map((t) => (
          <PriorityTableRow
            key={t.id}
            index={t.id}
            status={t.status}
            timeStamp={t.timestamp}
            severity={t.severity}
          />
        ))}
      </Table>
    </div>
  );
};

export default PriorityTable;
