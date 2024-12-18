import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import SelectDropdown from "../../../ui/utils/SelectDropdown";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import DateComp from "../../../ui/utils/DateComp";
import { getUsers } from "../../../services/apiAdmin";
import { useAppContext } from "../../../context/AppContext";



interface Assignee {
  id: string;
  name: string;
}

interface CaseMgtOperationsProps {
  assignedTo: string;
  selectedStatus: string;
  onAssignedToChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (newDateRange: { startDate: Date; endDate: Date }) => void;
}

// const CaseMgtOperations: FC<CaseMgtOperationsProps> = ({
//   assignedTo,
//   selectedStatus,
//   onAssignedToChange,
//   onStatusChange,
//   onDateChange,
// }) => {
//   const { tenant } = useAppContext()
//   const { data: users, isLoading, error } = useQuery({
//     queryKey: ["users"],
//     queryFn: () => getUsers(tenant, 1), // Replace "tenant-id" with the actual tenant value
//     staleTime: 0, // Cache data for 5 minutes
//   });

//   // Map users to dropdown options
//   const userOptions = users?.data.map((user: Assignee) => ({
//     value: user.id,
//     label: user.name,
//   })) || [{ value: "", label: "No Users Available" }];

//   console.log(assignedTo);
  
//   return (
//     <div className="px-4 py-5 w-full md:w-11/12 lg:w-9/12 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-around">
//       <div className="flex gap-2 lg:gap-8">
//         {/* Assigned To Dropdown */}
//         <div>
//           <SelectDropdown
//             label="Assigned To"
//             options={isLoading ? [{ value: "", label: "Loading..." }] : userOptions}
//             selectedValue={assignedTo}
//             onChange={onAssignedToChange}
//           />
//           {error && <p className="text-red-500 mt-1">Failed to load users</p>}
//         </div>

//         {/* Status Dropdown */}
//         <div className="mx-2">
//           <SelectDropdown
//             label="Status"
//             options={[
//               { value: "", label: "All" },
//               { value: "Open", label: "Open" },
//               { value: "Closed", label: "Closed" },
//             ]}
//             selectedValue={selectedStatus}
//             onChange={onStatusChange}
//           />
//         </div>
//       </div>

//       {/* Date Component */}
//       <DateComp onDateChange={onDateChange} />

//       {/* Search Button */}
//       <PrimaryButton>Search</PrimaryButton>
//     </div>
//   );
// };

// export default CaseMgtOperations;


interface Assignee {
  id: string;
  name: string;
}

interface CaseMgtOperationsProps {
  assignedTo: string;
  selectedStatus: string;
  onAssignedToChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onDateChange: (newDateRange: { startDate: Date; endDate: Date }) => void;
}

const CaseMgtOperations: FC<CaseMgtOperationsProps> = ({
  assignedTo,
  selectedStatus,
  onAssignedToChange,
  onStatusChange,
  onDateChange,
}) => {
  const { tenant } = useAppContext()
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(tenant, 1), // Replace "tenant-id" with the actual tenant value
    staleTime: 0, // Cache data for 5 minutes
  });
  // Add "All" option and map user data to dropdown options
  const userOptions = [
    { value: "", label: "All" }, // Default "All" option
    ...(users?.data.map((user: Assignee) => ({
      value: user.id,
      label: user.name,
    })) || []),
  ];

  return (
    <div className="px-4 py-5 w-full md:w-11/12 lg:w-9/12 border rounded-lg shadow-sm flex flex-col md:flex-row md:items-center md:justify-around">
      <div className="flex gap-2 lg:gap-8">
        {/* Assigned To Dropdown */}
        <div>
          <SelectDropdown
            label="Assigned To"
            options={isLoading ? [{ value: "", label: "Loading..." }] : userOptions}
            selectedValue={assignedTo}
            onChange={onAssignedToChange}
          />
          {error && <p className="text-red-500 mt-1">Failed to load users</p>}
        </div>

        {/* Status Dropdown */}
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

      {/* Date Component */}
      <DateComp onDateChange={onDateChange} />

      {/* Search Button */}
      <PrimaryButton>Search</PrimaryButton>
    </div>
  );
};

export default CaseMgtOperations;
