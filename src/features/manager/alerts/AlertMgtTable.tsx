import { FC, useState } from "react";
import Table from "../../../ui/utils/Table";
import AlertTableRow from "./AlertTableRow";
import AlertsMgtOperations from "./AlartsMgtOperations";
import SearchInput from "../../../ui/utils/SearchInput";
// import { Alert } from "../../../db";

interface AlertTableProps {
  headingData: string[];
  data: Alert[];
}

const AlertMgtTable: FC<AlertTableProps> = ({ headingData, data }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Filter data based on selected filters, search query, and date range
  const filteredData = data.filter((alert) => {
    const matchesSeverity =
      selectedSeverity === "" ||
      alert.severity.toLowerCase() === selectedSeverity;
    const matchesStatus =
      selectedStatus === "" || alert.status.toLowerCase() === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.status.toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesSeverity && matchesStatus && matchesSearch 
    );
  });

  const handleSeverityChange = (value: string) => setSelectedSeverity(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);

  const handleDateChange = (newDateRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    setDateRange(newDateRange);
  };

    console.log(dateRange);

  return (
    <div className="mt-8">
      {/* Filter Operations */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <AlertsMgtOperations
          selectedSeverity={selectedSeverity}
          selectedStatus={selectedStatus}
          onSeverityChange={handleSeverityChange}
          onStatusChange={handleStatusChange}
          onDateChange={handleDateChange} // Pass the date handler
        />
        <SearchInput
          width="40%"
          placeholder="Search by Alert id, type or status"
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
        {filteredData.map((alert, index) => (
          <AlertTableRow
            key={alert.id}
            id={alert.id}
            type={alert.type}
            status={alert.status}
            severity={alert.severity}
            timestamp={alert.timestamp}
            index={index}
          />
        ))}

        {/* No Data Message */}
        {filteredData.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No alerts match the selected filters or search query.
          </div>
        )}
      </Table>
    </div>
  );
};

export default AlertMgtTable;
