import { FC, useState } from "react";
import Table from "../../../ui/utils/Table";
import CaseTableRow from "./CaseTableRow";
import CaseMgtOperations from "./CaseMgtOperations";
import { CasesTableRowProps } from "../../../db";
import SearchInput from "../../../ui/utils/SearchInput";
import { formatRuleDate } from "../../../ui/utils/helpers";

interface CaseMgtTableProps {
  headingData: string[];
  data: CasesTableRowProps[];
}

const CaseMgtTable: FC<CaseMgtTableProps> = ({ headingData, data }) => {
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Filter data based on selected filters, search query, and date range
  const filteredData = data.filter((rule) => {
    const matchesAssignedTo =
      assignedTo === "" ||
      rule.assignedTo.name.toLowerCase().includes(assignedTo.toLowerCase());
    const matchesStatus =
      selectedStatus === "" ||
      rule.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      rule.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.priority.toLowerCase().includes(searchQuery.toLowerCase());
    const ruleDate = new Date(rule.lastModified);
    const matchesDateRange =
      ruleDate >= dateRange.startDate && ruleDate <= dateRange.endDate;
      console.log(matchesDateRange);

      //  "matchesDateRange" can also be added to the returned statement if you want to activate filtering by date range
    return (
      matchesAssignedTo && matchesStatus && matchesSearch 
    );
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
          onDateChange={handleDateChange} // Pass the date handler
        />
        <SearchInput
          width="40%"
          placeholder="Search by caseId or priority"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table Display */}
      <Table columns={`grid grid-cols-${headingData.length} gap-4`}>
        {/* Dynamic Header Rendering */}
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

        {/* Dynamic Row Rendering */}
        {filteredData.map((rule, index) => (
          <CaseTableRow
            key={rule.caseId}
            caseId={rule.caseId}
            priority={rule.priority}
            status={rule.status}
            assignedTo={rule.assignedTo}
            lastModified={formatRuleDate(rule.lastModified)}
            index={index}
          />
        ))}

        {/* No Data Message */}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No rules match the selected filters or search query.
          </div>
        )}
      </Table>
    </div>
  );
};

export default CaseMgtTable;
