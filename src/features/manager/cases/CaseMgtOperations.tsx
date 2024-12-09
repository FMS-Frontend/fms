import { FC} from "react";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import DateComp from "../../../ui/utils/DateComp";

interface RuleMgtOperationsProps {
  assignedTo: string;
  selectedStatus: string;
  onAssignedToChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (newDateRange: { startDate: Date; endDate: Date }) => void;
}

const CaseMgtOperations: FC<RuleMgtOperationsProps> = ({
  assignedTo,
  selectedStatus,
  onAssignedToChange,
  onStatusChange,
  onDateChange,
}) => {
  return (
    <div className="px-4 py-5 w-full md:w-11/12 lg:w-9/12 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-around">
      <div className="flex gap-2 lg:gap-8">
      <div className="">
      <SelectDropdown
        label="Assigned To"
        options={[
          { value: "", label: "Analyst" },
          { value: "Alice Johnson", label: "Fraud Analyst" },
          { value: "David Brown", label: "Admin" },
          { value: "Catherine Lee", label: "Manager" },
        ]}
        selectedValue={assignedTo}
        onChange={onAssignedToChange}
      />
      </div>
      <div className="mx-2">
      <SelectDropdown
        label="Status"
        options={[
          { value: "", label: "All" },
          { value: "Open", label: "Open" },
          { value: "Closed", label: "Closed" },
        ]}
        selectedValue={selectedStatus}
        onChange={onStatusChange}
      />
      </div>
      </div>
      <DateComp onDateChange={onDateChange} />
      <PrimaryButton>Search</PrimaryButton>
    
    </div>
  );
};

export default CaseMgtOperations;
