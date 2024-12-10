import { FC, useState } from "react";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import DateCompAnalyst from "./DateCompAnalyst";

const RuleOperations: FC = () => {
  const [assignTo, setAsignedto] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setAsignedto(value);
  };
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };


  return (
    <div className="px-4 py-5 w-4/5 border rounded-sm shadow-sm flex items-center justify-around">
      <SelectDropdown
        label="Assigned To"
        options={[
          { value: "option1", label: "Fraud Analyst" },
          { value: "option2", label: "Admin" },
          { value: "option3", label: "Manager" },
        ]}
        selectedValue={assignTo}
        onChange={handleOptionChange}
      />

      <SelectDropdown
        label="Status"
        options={[
          { value: "option1", label: "Open" },
          { value: "option2", label: "Closed" },
        ]}
        selectedValue={selectedStatus}
          onChange={handleStatusChange}
      />

      <DateCompAnalyst />

      <div className="pt-6">
        <PrimaryButton>Search</PrimaryButton>
      </div>
    </div>
  );
};

export default RuleOperations;
