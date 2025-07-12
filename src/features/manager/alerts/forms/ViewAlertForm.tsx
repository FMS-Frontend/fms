import { FC } from "react";
import { formatDate } from "../../../../db/helperFunctions";

interface ViewAlertFormProps {
  onClose?: () => void;
  onNext?: () => void;
  data: any; 
}

const ViewAlertForm: FC<ViewAlertFormProps> = ({ onClose, onNext, data }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">
          <b>Alert</b>-A{data?.code}
        </h2>
      </div>

      <form className="flex flex-col gap-3 overflow-y-auto">
        <div className="space-y-4">
          {/* General Alert Info */}
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">Severity</label>
            <p className="text-gray-700 text-xl font-medium mb-1">{data?.severity}</p>
          </div>
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">Status</label>
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
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">Timestamp</label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              {formatDate(data?.timestamp)}
            </p>
          </div>
          <div className="flex justify-between">
            <label className="block text-[#A6A6A6] text-xl font-medium mb-1">Created On</label>
            <p className="text-gray-700 text-xl font-medium mb-1">
              {formatDate(data?.createdAt)}
            </p>
          </div>
        </div>

        <h3 className="font-bold my-4">Description</h3>
        <div className="mb-4">
          <div className="w-full text-lg border border-gray-300 bg-gray-100 rounded-md px-4 py-3 overflow-y-auto h-16">
            {data?.description || "No description available."}
          </div>
        </div>

        {/* Transaction Info */}
        {data.transaction && (
          <>
            <h3 className="font-bold my-4">Transaction Info</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[#A6A6A6] text-xl">Reference</label>
                <p className="text-xl">{data.transaction.reference}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-[#A6A6A6] text-xl">Amount</label>
                <p className="text-xl">₦{data.transaction.amount}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-[#A6A6A6] text-xl">PAN</label>
                <p className="text-xl">{data.transaction.pan}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-[#A6A6A6] text-xl">Acquirer ID</label>
                <p className="text-xl">{data.transaction.acquiringInstitutionID}</p>
              </div>
              <div className="flex justify-between">
                <label className="text-[#A6A6A6] text-xl">Timestamp</label>
                <p className="text-xl">{formatDate(data.transaction.timestamp)}</p>
              </div>
            </div>
          </>
        )}

        {/* Actions (if any) */}
        <h3 className="font-bold my-4">Actions</h3>
        <div className="mb-4">
          <div className="w-full text-lg border border-gray-300 bg-gray-100 rounded-md px-4 py-3 overflow-y-auto h-16">
            {data?.actions?.length > 0
              ? data.actions.map((action: any, i: any) => (
                  <div className="flex justify-between flex-wrap mb-2" key={i}>
                    <p className="text-sm truncate">
                      <b>- {action.description}</b>
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(action.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              : "No actions recorded for this alert."}
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

export default ViewAlertForm;

