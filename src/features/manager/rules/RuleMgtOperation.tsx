import { FC, useState } from "react";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import DateCompAnalyst from "../../analyst/rules/DateCompAnalyst";
const RuleMgtOperations: FC = () => {
  const [assignTo, setAsignedto] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setAsignedto(value);
  };
  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };


  return (
    <div className="px-4 py-5 w-9/12 border rounded-lg shadow-sm flex items-center justify-around">
      <div className="">
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
      </div>

      <div className="">
      <SelectDropdown
        label="Status"
        options={[
          { value: "option1", label: "All" },
          { value: "option2", label: "Open" },
          { value: "option3", label: "Closed" },
        ]}
        selectedValue={selectedStatus}
          onChange={handleStatusChange}
      />
      </div>

      <DateCompAnalyst />

      <div className="pt-6">
        <PrimaryButton>Search</PrimaryButton>
      </div>
    </div>
  );
};

export default RuleMgtOperations;
