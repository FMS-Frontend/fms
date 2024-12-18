// import { FC } from "react";
// import { AssignCaseFormProps } from "./AssignCaseForm";

// /**
//  * CreateTenantForm component for creating a new tenant.
//  * Displays a form to collect tenant details including name, address, admin, email, and description.
//  * It includes navigation buttons to close the form or proceed to the next step.
//  *
//  * @component
//  * @example
//  * <CreateTenantForm onNext={handleNext} onClose={handleClose} />
//  *
//  * @param {Object} props - Component props
//  * @param {Function} props.onNext - Callback function to proceed to the next step (called on clicking the "Next" button)
//  * @param {Function} props.onClose - Callback function to close the form (called on clicking the "Close" button)
//  *
//  * @returns {JSX.Element} The rendered CreateTenantForm component.
//  */

// import { useAppContext } from "../../../../context/AppContext";
// import { useQuery } from "@tanstack/react-query";
// import { getCase } from "../../../../services/managerServices";
// import SpinnerMini from "../../../../ui/utils/SpinnerMini";

// interface StepProps {
//   onNext?: () => void;
//   onClose?: () => void;
//   caseId: string;
//   data: AssignCaseFormProps;
// }

// const ReopenCaseForm: FC<StepProps> = ({ onNext, onClose,  }) => {
//   return (
//     <>
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold">Reopen</h2>
//       </div>

//       <form className="flex flex-col gap-3">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Tenant Name
//           </label>
//           <input
//             type="text"
//             placeholder="Enter tenant name"
//             className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Address
//           </label>
//           <input
//             type="text"
//             placeholder="Enter address"
//             className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Admin Name
//           </label>
//           <select className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500">
//             <option>Click to select and link Admin</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Enter email"
//             className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Description
//           </label>
//           <input
//             type="text"
//             placeholder="Enter description"
//             className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
//           />
//         </div>

//         <div className="flex justify-around mt-6">
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-44 text-xl px-4 py-3 bg-gray-500  text-white rounded-md hover:bg-gray-600"
//           >
//             Close
//           </button>

//           <button
//             type="button"
//             onClick={onNext}
//             className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
//           >
//             Next
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default ReopenCaseForm;



import { FC, useState } from "react";
import SelectDropdown from "../../../../ui/utils/SelectDropdown";
import { useAppContext } from "../../../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../../services/apiAdmin";
import { assignCase } from "../../../../services/managerServices";
import toast from "react-hot-toast";

export interface CaseDetails {
  id: string;
  code: number;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "Closed";
  description: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
  assignee?: {
    id: string;
    name: string;
  };
}

interface Assignee {
  id: string;
  name: string;
}

export interface AssignCaseFormProps {
  onNext?: () => void;
  onClose?: () => void;
  tenantId: string;
  caseId: string;
  caseDetails: CaseDetails;
}

const ReopenCaseForm: FC<AssignCaseFormProps> = ({
  onClose,
  tenantId,
  caseId,
  caseDetails,
}) => {
  const [selectedAssignee, setSelectedAssignee] = useState<string>("");
  const { tenant } = useAppContext();

  // Fetch all users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users", tenant],
    queryFn: () => getUsers(tenant, 1),
    staleTime: 0,
  });

  // Add "All" option and map user data to dropdown options
  const userOptions = [
    { value: "", label: "Select Assignee" }, // Default option
    ...(users?.data.map((user: Assignee) => ({
      value: user.id,
      label: user.name,
    })) || []),
  ];

  // Handle assignee change
  const handleAssigneeChange = (value: string) => {
    setSelectedAssignee(value);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssignee) {
      toast.error("Please select an assignee.");
      return;
    }

    try {
      await assignCase(tenantId, caseId, selectedAssignee);
      toast.success("Case assigned successfully.");
      onClose?.();
    } catch (error) {
      console.error("Failed to assign case:", error);
      toast.error("Failed to assign case. Please try again.");
    }
  };
  

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Reopen Case</h2>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {/* Case Code */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">Case ID</label>
          <input
            type="text"
            value={caseId}
            readOnly
            className="w-full text-2xl border border-gray-300 bg-gray-100 rounded-md px-4 py-3 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">Case Code</label>
          <input
            type="text"
            value={caseDetails?.code}
            readOnly
            className="w-full text-2xl border border-gray-300 bg-gray-100 rounded-md px-4 py-3 focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">Description</label>
          <textarea
            value={caseDetails?.description}
            readOnly
            className="w-full text-2xl border border-gray-300 bg-gray-100 rounded-md px-4 py-3 focus:outline-none"
          />
        </div>

        {/* Assign Case */}
        <div className="mb-4">
          <SelectDropdown
            label="Assign To"
            options={isLoading ? [{ value: "", label: "Loading..." }] : userOptions}
            selectedValue={selectedAssignee}
            onChange={handleAssigneeChange}
          />
          {error && <p className="text-red-500 mt-1">Failed to load users.</p>}
        </div>

        {/* Priority */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">Priority</label>
          <select
            defaultValue={caseDetails?.priority}
            className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">Status</label>
          <select
            defaultValue={caseDetails?.status}
            className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none"
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-around mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
          <button
            type="submit"
            className="w-44 text-xl px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reopen
          </button>
        </div>
      </form>
    </>
  );
};

export default ReopenCaseForm;

