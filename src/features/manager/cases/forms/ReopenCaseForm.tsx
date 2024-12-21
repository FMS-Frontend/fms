// import { FC } from "react";
// import { useQueryClient } from "@tanstack/react-query";
// import { updateCase } from "../../../../services/managerServices";
// import toast from "react-hot-toast";

// export interface CaseDetails {
//   id: string;
//   code: number;
//   priority: "Low" | "Medium" | "High";
//   status: "Open" | "Closed";
//   description: string;
//   assignedTo: string;
//   createdAt: string;
//   updatedAt: string;
//   assignee?: {
//     id: string;
//     name: string;
//   };
// }

// export interface AssignCaseFormProps {
//   onNext?: () => void;
//   onClose?: () => void;
//   tenantId: string;
//   caseId: string;
//   caseDetails: CaseDetails;
// }

// const ReopenCaseForm: FC<AssignCaseFormProps> = ({
//   onClose,
//   tenantId,
//   caseId,
//   caseDetails,
// }) => {
//   const queryClient = useQueryClient();

//   // Handle form submission
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await updateCase(tenantId, caseId, { status: "Open" });
//       toast.success("Case status updated successfully.");
//       queryClient.invalidateQueries({
//         queryKey: ["cases", tenantId],
//       });
//       onClose?.();
//     } catch (error) {
//       console.error("Failed to update case status:", error);
//       toast.error("Failed to update case. Please try again.");
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-semibold">Reopen Case</h2>
//       </div>

//       <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
//         <div className="">
//           <div className="flex justify-between">
//             <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
//               CaseId
//             </label>
//             <p className="text-gray-700 text-xl font-medium mb-1">
//               R{caseDetails?.id.slice(0, 4)}
//             </p>
//           </div>
//           <div className="flex justify-between">
//             <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
//               Case Code
//             </label>
//             <p className="text-gray-700 text-xl font-medium mb-1">
//               {caseDetails?.code}
//             </p>
//           </div>

//           <div className="flex justify-between items-center">
//             <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
//               Status
//             </label>
//             <p className="text-gray-700 text-xl font-medium mb-1">
//               {caseDetails?.status}
//             </p>
//           </div>
//           <div className="flex justify-between items-center">
//             <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
//               Assigned To
//             </label>
//             <p className="text-gray-700 text-xl font-medium mb-1">
//               {caseDetails?.assignee?.name || "Unassigned"}
//             </p>
//           </div>
//           <div className="flex justify-between">
//             <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
//               Last Modified
//             </label>
//             <p className="text-gray-700 text-xl font-medium mb-1">
//               {new Date(caseDetails.updatedAt).toLocaleString()}
//             </p>
//           </div>
//         </div>

//         <h3 className="font-bold">Case Details</h3>
//         {/* Description */}
//         <div className="mb-4">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Description
//           </label>
//           <textarea
//             value={caseDetails?.description}
//             readOnly
//             className="w-full text-2xl border border-gray-300 bg-gray-100 rounded-md px-4 py-3 focus:outline-none"
//           />
//         </div>

//         {/* Assign To i.e dropdow of users*/}

//         {/* Comments/Note (Optional) */}

//         {/* Notification Option*/}

//         <div className="mb-4 flex justify-between">
//           <label className="block text-gray-700 text-xl font-medium mb-1">
//             Status
//           </label>
//           <p className="text-gray-700 text-xl font-medium">
//             {caseDetails?.status}
//           </p>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-around mt-6">
//           <button
//             type="button"
//             onClick={onClose}
//             className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
//           >
//             Close
//           </button>
//           <button
//             type="submit"
//             className="w-44 text-xl px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//           >
//             Reopen
//           </button>
//         </div>
//       </form>
//     </>
//   );
// };

// export default ReopenCaseForm;

import { FC, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  updateCase,
  addComment,
} from "../../../../services/managerServices";
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

interface ReopenCaseFormProps {
  onClose?: () => void;
  onNext?: () => void;
  tenantId: string;
  caseId: string;
  caseDetails: CaseDetails;
}

const ReopenCaseForm: FC<ReopenCaseFormProps> = ({
  onClose,
  tenantId,
  caseId,
  caseDetails,
}) => {
  const queryClient = useQueryClient();

  
  const [comment, setComment] = useState<string>("");
  const [notifyAssignee, setNotifyAssignee] = useState<boolean>(false);
  const [notifyAssignee2, setNotifyAssignee2] = useState<boolean>(false);


  // Handle submission of the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Update the case status to "Open"
      await updateCase(tenantId, caseId, { status: "Open" });

      
      // Add a comment if provided
      if (comment) {
        await addComment(tenantId, caseId, { comment });
      }

      // Show success message
      toast.success("Case reopened successfully.");

      // Refetch cases to show updated data
      queryClient.invalidateQueries({ queryKey: ["cases", tenantId] });

      onClose?.();
    } catch (error) {
      console.error("Failed to reopen case:", error);
      toast.error("Failed to reopen case. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">
          Reopen Case
        </h2>
      </div>

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
            <p className={`text-xl font-medium mb-1 rounded-full bg-slate-100 text-slate-400`}>
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
              AssignedTo
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
            {caseDetails.assignee?.name || "Unassigned"}
            </p>
          </div>
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Closed Timestamp
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
            {new Date(caseDetails.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        <h3 className="font-semibold my-4">Case Details</h3>
        <div className="">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <div className="w-full text-xl border border-gray-300 bg-gray-100 rounded-md px-4 py-3 overflow-y-auto h-16">
          {caseDetails?.description.length > 100 ? caseDetails?.description.slice(0, 50) : caseDetails?.description }
          </div>
        </div>        
      </div>

      
      {/* Comment Section */}
      <div>
        <label className="block text-gray-700 text-lg font-medium mb-2">
          Add Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 text-lg border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Add a comment for the assignee..."
        />
      </div>

      {/* Notification Options */}
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
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-40 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-40 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Reopen
        </button>
      </div>
    </form>
  );
};

export default ReopenCaseForm;
