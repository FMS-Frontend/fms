import { FC } from "react";
import { useTenant } from "./TenantContext";

/**
 * TenantInfo component for displaying tenant information in the setup process.
 * This component shows a read-only view of the tenant details such as Tenant Name, Address, Admin Name, Email, and Description.
 * It provides buttons to either edit the information or proceed to the next step.
 *
 * @component
 * @example
 * <TenantInfo onPrevious={handlePrevious} onNext={handleNext} />
 *
 * @param {Object} props - Component props
 * @param {Function} props.onPrevious - Callback function to navigate to the previous step (called on clicking the "Edit" button)
 * @param {Function} props.onNext - Callback function to navigate to the next step (called on clicking the "Next" button)
 *
 * @returns {JSX.Element} The rendered TenantInfo component.
 */

interface StepProps {
  onPrevious: () => void;
  onNext: () => void;
}

const TenantInfo: FC<StepProps> = ({ onPrevious, onNext }) => {
  const { tenantData, admins } = useTenant();

  // Find the selected admin based on tenantData.admin
  const selectedAdmin = admins?.find(
    (admin) => admin.id === tenantData.adminId
  );
  console.log(selectedAdmin);

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
            {tenantData.name}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Address
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {tenantData.address}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Admin Name
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {selectedAdmin?.name || "No Admin Selected"}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Email
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {tenantData.email}
          </p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <p className="w-full text-2xl font-medium rounded-md px-4 py-3">
            {tenantData.description}
          </p>
        </div>

        <div className="flex justify-around mt-6">
          <button
            type="button"
            onClick={onPrevious}
            className="w-44 text-xl px-4 py-3 bg-gray-500  text-white rounded-md hover:bg-gray-600"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={onNext}
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Next
          </button>
        </div>
      </form>
    </>
  );
};

export default TenantInfo;
