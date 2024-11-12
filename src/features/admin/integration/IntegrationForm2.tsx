import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";

interface StepProps {
  onPrevious: () => void;
}

/**
 * IntegrationForm2 component for the second step in the process of adding a new integration.
 * This form collects connection settings for the integration, such as API endpoint, key, secret, and authentication method.
 *
 * @component
 * @example
 * <IntegrationForm2 onPrevious={handlePrevious} />
 *
 * @param {Object} props - The props for the component.
 * @param {Function} props.onPrevious - A function to move to the previous step of the process.
 *
 * @returns {JSX.Element} The rendered IntegrationForm2 component with input fields for API connection settings.
 */

const IntegrationForm2: FC<StepProps> = ({ onPrevious }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Add New Integration</h2>
      </div>

      <form className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold mb-2">Connection Settings</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            API Endpoint
          </label>
          <input
            type="text"
            placeholder="Enter API Endpoint"
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            API Key
          </label>
          <input
            type="email"
            placeholder="Enter API Key"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            API Secret
          </label>
          <input
            type="password"
            placeholder="Enter API Secret"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Authentication Method
          </label>
          <select className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500">
            <option>OAuth/Basic Authentication or API Key</option>
          </select>
        </div>

        <div className="mb-6 flex gap-4 items-center justify-between">
          <div>
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Connection Timeout
            </label>
            <input
              type="text"
              placeholder="60 Sec"
              className="w-[10rem] text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="pt-7 ">
            <PrimaryButton>Test Connection</PrimaryButton>
          </div>
        </div>

        <div className="flex justify-around mt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Back
          </button>

          <button
            type="submit"
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default IntegrationForm2;
