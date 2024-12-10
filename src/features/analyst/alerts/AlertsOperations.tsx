import { FC, useState } from "react";
import DateComp from "../../../ui/utils/DateComp";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";

const AlertsOperations: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="px-4 py-5 w-1/2 border rounded-sm shadow-sm flex items-center justify-around">
      <div>
        <DateComp />
      </div>
      <div>
        <SelectDropdown
          label="Tenant"
          options={[
            { value: "option1", label: "Sendgrid" },
            { value: "option2", label: "Sales Force" },
            { value: "option3", label: "LinkedIn" },
          ]}
          selectedValue={selectedOption}
          onChange={handleOptionChange}
        />
      </div>

      <div className="pt-6">
        <PrimaryButton>Search</PrimaryButton>
      </div>
    </div>
  );
};

export default AlertsOperations;
