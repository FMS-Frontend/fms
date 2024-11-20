import { FC, useState } from "react";
import SelectDropdown from "../../../ui/SelectDropdown";
import PrimaryButton from "../../../ui/PrimaryButton";
import DateCompAnalyst from "./DateCompAnalyst";

const RuleOperations: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
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
        selectedValue={selectedOption}
        onChange={handleOptionChange}
      />

      <SelectDropdown
        label="Status"
        options={[
          { value: "option1", label: "Open/Closed" },
          { value: "option2", label: "Sales Force" },
          { value: "option3", label: "LinkedIn" },
        ]}
        selectedValue={selectedOption}
        onChange={handleOptionChange}
      />

      <DateCompAnalyst />

      <div className="pt-6">
        <PrimaryButton>Search</PrimaryButton>
      </div>
    </div>
  );
};

export default RuleOperations;
