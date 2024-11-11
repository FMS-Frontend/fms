import { FC } from "react";

interface StepProps {
  onNext: () => void;
  onClose: () => void;
}

const IntegrationForm1: FC<StepProps> = ({ onNext, onClose }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Add New Integration</h2>
      </div>

      <form className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold mb-2">Integration Information</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter Integration name"
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Type
          </label>
          <select className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500">
            <option>CRM/KYC/Payment Gateway</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onClose}
            className="text-xl px-4 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onNext}
            className="text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default IntegrationForm1;
