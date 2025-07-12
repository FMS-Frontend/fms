import { FC } from "react";
import DateComp from "../../../ui/utils/DateComp";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";

interface AlertsMgtOperationsProps {
  selectedSeverity: string;
  selectedStatus: string;
  onSeverityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (dateRange: { startDate: Date; endDate: Date }) => void;
}

const AlertsMgtOperations: FC<AlertsMgtOperationsProps> = ({
  selectedSeverity,
  selectedStatus,
  onSeverityChange,
  onStatusChange,
  onDateChange, // Accept the date change handler
}) => {
  const handleSearch = () => {
    console.log("Selected Severity:", selectedSeverity);
    console.log("Selected Status:", selectedStatus);
  };

  return (
    <div className="px-4 py-5 w-full md:w-11/12 xl:w-9/12 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-around">
      {/* Date Range Picker */}
      <div>
        <DateComp onDateChange={onDateChange} /> {/* Pass the handler */}
      </div>

      {/* Severity Dropdown */}
      <div>
        <SelectDropdown
          label="Severity"
          options={[
            { value: "", label: "All" },
            { value: "critical", label: "Critical" },
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
          ]}
          selectedValue={selectedSeverity}
          onChange={onSeverityChange}
        />
      </div>

      {/* Status Dropdown */}
      <div>
        <SelectDropdown
          label="Status"
          options={[
            { value: "", label: "All" },
            { value: "open", label: "Open" },
            { value: "closed", label: "Closed" },
          ]}
          selectedValue={selectedStatus}
          onChange={onStatusChange}
        />
      </div>

      {/* Search Button */}
      <div className="pt-6">
        <PrimaryButton onClick={handleSearch}>Search</PrimaryButton>
      </div>
    </div>
  );
};

export default AlertsMgtOperations;
