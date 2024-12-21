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
    <div className="px-4 py-5 w-full md:w-11/12 xl:w-9/12 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-around">
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
