import { FC } from "react";
import { formatDate } from "../../../../db/helperFunctions";

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




interface StepProps {
  onNext?: () => void;
  onClose?: () => void;
  data: CaseDetailsAll;
}

const ViewCaseForm: FC<StepProps> = ({ onNext, onClose, data }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">
          <b>Case</b>-C{data?.id.slice(0, 4)}
        </h2>
      </div>

      <form className="flex flex-col gap-3">
        <div className="space-y-4">
          {/* General Case Information */}
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              CaseId
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              C{data?.id.slice(0, 4)}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Status
            </label>
            <p
              className={`text-xl font-medium mb-1 rounded-full ${
                data.status === "Closed"
                  ? "bg-slate-100 text-slate-400"
                  : "text-red-500"
              }`}
            >
              {data?.status}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Priority
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              {data?.priority}
            </p>
          </div>
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Assigned To
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              {data.assignee?.name || "Unassigned"}
            </p>
          </div>
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
              Created On
            </label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              {formatDate(data?.createdAt)}
            </p>
          </div>
        </div>

        <h3 className="font-bold my-4">Case Details</h3>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <div className="w-full text-lg border border-gray-300 bg-gray-100 rounded-md px-4 py-3 overflow-y-auto h-16">
            {data?.description}
          </div>
        </div>

        {/* Alerts */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Alerts
          </label>
          <div className="w-full text-lg border border-gray-300 bg-gray-100 rounded-md px-4 py-3 overflow-y-auto h-16">
            {data?.alerts.length > 0
              ? data.alerts.map((alert, index) => (
                  <p key={index}>{alert.description || "No details available."}</p>
                ))
              : "No alerts for this case."}
          </div>
        </div>

        {/* Actions */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Actions
          </label>
          <div className="w-full text-lg border border-gray-300 bg-gray-100 rounded-md px-4 py-3 overflow-y-auto h-16">
            {data?.actions.length > 0
              ? data.actions.map((action) => (
                  <div className="flex justify-between flex-wrap mb-2" key={action.id}>
                    <p className="text-sm">
                      <b>- {action.description}</b> by{" "}
                      <span className="italic">{action.author?.name}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                    {new Date(action.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              : "No actions logged for this case."}
          </div>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Comments
          </label>
          <div className="w-full text-lg border border-gray-300 bg-gray-100 rounded-md px-4 py-3 overflow-y-auto h-16">
            {data?.comments.length > 0
              ? data.comments.map((comment, index) => (
                  <div className="flex justify-between flex-wrap border-b mb-2" key={index}>
                    <p className="text-sm">
                      <b>- {comment.comment}</b> by{" "}
                      <span className="italic">{comment.author?.name}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                ))
              : "No comments for this case."}
          </div>
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
            type="button"
            onClick={onNext}
            className="w-44 text-xl px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </form>
    </>
  );
};

export default ViewCaseForm;
