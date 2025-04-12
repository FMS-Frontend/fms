import { FC, useState } from "react";
import DateComp from "../../../ui/utils/DateComp";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";

const ReportOperations: FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleOptionChange = (value: string) => {
    setSelectedOption(value);
  };

  return (
    <div className="px-4 py-5 w-full md:w-11/12 xl:w-9/12 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-around">
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

export default ReportOperations;
