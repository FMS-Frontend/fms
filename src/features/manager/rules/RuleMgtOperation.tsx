import { FC} from "react";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import DateComp from "../../../ui/utils/DateComp";

interface RuleMgtOperationsProps {
  assignedTo?: string;
  selectedStatus: string;
  onAssignedToChange?: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (newDateRange: { startDate: Date; endDate: Date }) => void;
}

const RuleMgtOperations: FC<RuleMgtOperationsProps> = ({
  selectedStatus,
  onStatusChange,
  onDateChange,
}) => {
  return (
    <div className="px-4 py-5 w-9/12 border rounded-lg shadow-sm flex items-center justify-around">
      {/* <SelectDropdown
        label="Assigned To"
        options={[
          { value: "", label: "Analyst" },
          { value: "Alice Johnson", label: "Fraud Analyst" },
          { value: "David Brown", label: "Admin" },
          { value: "Catherine Lee", label: "Manager" },
        ]}
        selectedValue={assignedTo}
        onChange={onAssignedToChange}
      /> */}
      <SelectDropdown
        label="Status"
        options={[
          { value: "", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
        ]}
        selectedValue={selectedStatus}
        onChange={onStatusChange}
      />
      <DateComp onDateChange={onDateChange} />
      <PrimaryButton>Search</PrimaryButton>
    </div>
  );
};

export default RuleMgtOperations;
