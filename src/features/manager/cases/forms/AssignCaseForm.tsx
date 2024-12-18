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

const AssignCaseForm: FC<AssignCaseFormProps> = ({
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
  // console.log(selectedAssignee);
  

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Assign Case</h2>
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
            Assign
          </button>
        </div>
      </form>
    </>
  );
};

export default AssignCaseForm;

