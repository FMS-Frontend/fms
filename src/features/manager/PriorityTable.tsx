import { FC } from "react";
import Table from "../../ui/Table";
import PriorityTableRow from "./PriorityTableRow";

interface PriorityTableProps {
  headingData: string[];
  data: {
    id: number;
    alertType: "Login" | "Logout" | "Edit" | "Update" | "Create" | "Delete";
    timeStamp: string;
    status: "Active" | "Unassigned" | "Deactivated";
  }[];
}

const PriorityTable: FC<PriorityTableProps> = ({ headingData, data }) => {
  return (
    <div className="mt-8">
      <Table columns={`grid grid-cols-3 gap-4`}>
        {/* Dynamic Header Rendering */}
        <Table.Header bgColor="">
          {headingData.length > 0 && headingData.map((heading, index) => (
            <div
              key={index}
              className="text-gray-600 font-semibold uppercase text-xs md:text-sm lg:text-lg text-start"
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
            alertType={t.alertType}
            timeStamp={t.timeStamp}
            status={t.status}
          />
        ))}
      </Table>
    </div>
  );
};

export default PriorityTable;
