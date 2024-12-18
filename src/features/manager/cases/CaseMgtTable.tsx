import { FC, useState } from "react";
import Table from "../../../ui/utils/Table";
import CaseTableRow from "./CaseTableRow";
import CaseMgtOperations from "./CaseMgtOperations";
import SearchInput from "../../../ui/utils/SearchInput";
import { formatRuleDate } from "../../../ui/utils/helpers";
import { Case } from "../../../services/managerServices";

interface CaseMgtTableProps {
  headingData: string[];
  data: Case[];
}

const CaseMgtTable: FC<CaseMgtTableProps> = ({ headingData, data }) => {
  const [assignedTo, setAssignedTo] = useState<string>(""); // Default to "All"
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  console.log(dateRange);
  
  // Filter data based on selected filters, search query, and date range
  const filteredData = data.filter((caseItem) => {
    // Handle nullable assignee safely
    const assigneeName = caseItem.assignee?.id || "";

    const matchesAssignedTo =
      assignedTo === "" ||
      assigneeName.toLowerCase().includes(assignedTo.toLowerCase());

    const matchesStatus =
      selectedStatus === "" ||
      caseItem.status.toLowerCase() === selectedStatus.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      caseItem.priority.toLowerCase().includes(searchQuery.toLowerCase());

    // Optional: Include date range filtering if necessary
    return matchesAssignedTo && matchesStatus && matchesSearch;
  });

  const handleAssignedToChange = (value: string) => setAssignedTo(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);

  const handleDateChange = (newDateRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    setDateRange(newDateRange);
  };

  return (
    <div className="mt-8">
      {/* Filter Operations */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <CaseMgtOperations
          assignedTo={assignedTo}
          selectedStatus={selectedStatus}
          onAssignedToChange={handleAssignedToChange}
          onStatusChange={handleStatusChange}
          onDateChange={handleDateChange}
        />
        <SearchInput
          width="40%"
          placeholder="Search by case ID or priority"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Table columns={`grid grid-cols-${headingData.length} gap-4`}>
        <Table.Header>
          {headingData.map((heading, index) => (
            <div
              key={index}
              className="text-slate-400 font-semibold uppercase text-xs md:text-sm lg:text-lg text-start"
            >
              {heading}
            </div>
          ))}
        </Table.Header>

        {filteredData.map((caseItem, index) => (
          <CaseTableRow
            key={caseItem.id}
            id={caseItem.id}
            priority={caseItem.priority}
            status={caseItem.status}
            assignee={caseItem.assignee}
            updatedAt={caseItem.updatedAt ? formatRuleDate(caseItem.updatedAt) : "N/A"} 
            index={index}
          />
        ))}

        {/* No Data Message */}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No cases match the selected filters or search query.
          </div>
        )}
      </Table>
    </div>
  );
};

export default CaseMgtTable;
