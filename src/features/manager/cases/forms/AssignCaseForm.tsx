import { FC, useState } from "react";
import SelectDropdown from "../../../../ui/utils/SelectDropdown";
import { useAppContext } from "../../../../context/AppContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient(); 
  const [notifyAssignee, setNotifyAssignee] = useState<boolean>(false);
  const [notifyAssignee2, setNotifyAssignee2] = useState<boolean>(false);


  // Fetch all users
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users", tenant],
    queryFn: () => getUsers(tenant, 1),
    staleTime: 0,
  });

  // Add "All" option and map user data to dropdown options
  const userOptions = [
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

      // Invalidate the cases query to refetch updated data
      queryClient.invalidateQueries({
        queryKey: ["cases", tenant],
      });

      onClose?.();
    } catch (error) {
      console.error("Failed to assign case:", error);
      toast.error("Failed to assign case. Please try again.");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Assign Case</h2>
      </div>

      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <div className="">
         <div className="space-y-4">
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              CaseId
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              C{caseDetails?.id.slice(0, 4)}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Status
            </label>
            <p className={`text-xl font-medium mb-1 rounded-full ${
            caseDetails?.status === "Closed" ? "bg-slate-100 text-slate-400" : "text-red-500"
          }`}>
              {caseDetails?.status}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Priority
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              {caseDetails?.priority}
            </p>
          </div>
          
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Timestamp
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
            {new Date(caseDetails.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
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

       {/* Notification Options */}
       <label className="block text-gray-700 text-xl font-medium mb-1">Notification Options</label>
       <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="notifyAssignee"
          checked={notifyAssignee}
          onChange={(e) => setNotifyAssignee(e.target.checked)}
          className="w-5 h-5"
        />
        <label htmlFor="notifyAssignee" className="text-gray-700 text-lg">
          Send Email Notification
        </label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="notifyAssignee2"
          checked={notifyAssignee2}
          onChange={(e) => setNotifyAssignee2(e.target.checked)}
          className="w-5 h-5"
        />
        <label htmlFor="notifyAssignee" className="text-gray-700 text-lg">
          Send In-App Notification
        </label>
      </div>

        {/* Buttons */}
        <div className="flex justify-around mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Cancel
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
