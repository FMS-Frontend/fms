import { FC } from "react";

interface StepProps {
  onPrevious: () => void;
  onNext: () => void;
}

const TenantInfo: FC<StepProps> = ({ onPrevious, onNext }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Setup New Tenant</h2>
      </div>

      <form className="flex flex-col gap-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Tenant Name
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {"Salesforce"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Address
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {"Ijede Makoko Street"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Admin Name
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {"Darlene Robertson"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Email
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {"darlene@gmail.com"}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {"Nil"}
          </p>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="text-xl px-4 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            Edit
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

export default TenantInfo;
