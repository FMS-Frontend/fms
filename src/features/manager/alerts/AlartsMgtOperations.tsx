// AlertsMgtOperations.tsx
import { FC, useState } from "react";
import DateComp from "../../../ui/DateComp";
import SelectDropdown from "../../../ui/SelectDropdown";
import PrimaryButton from "../../../ui/PrimaryButton";

const AlertsMgtOperations: FC = () => {
  // Separate state variables for Severity and Status
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleSeverityChange = (value: string) => {
    setSelectedSeverity(value);
  };

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleSearch = () => {
    console.log("Selected Severity:", selectedSeverity);
    console.log("Selected Status:", selectedStatus);
  };

  return (
    <div className="px-4 py-5 w-9/12 border rounded-lg shadow-sm flex items-center justify-around">
      {/* Date Range Picker */}
      <div>
        <DateComp />
      </div>

      {/* Severity Dropdown */}
      <div>
        <SelectDropdown
          label="Severity"
          options={[
            { value: "critical", label: "Critical" },
            { value: "high", label: "High" },
            { value: "medium", label: "Medium" },
          ]}
          selectedValue={selectedSeverity}
          onChange={handleSeverityChange}
        />
      </div>

      {/* Status Dropdown */}
      <div>
        <SelectDropdown
          label="Status"
          options={[
            { value: "open", label: "Open" },
            { value: "closed", label: "Closed" },
          ]}
          selectedValue={selectedStatus}
          onChange={handleStatusChange}
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
