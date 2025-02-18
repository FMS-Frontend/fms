import { FC, ChangeEvent } from "react";
import { useTenant } from "./TenantContext";
import Spinner from "../../../ui/utils/Spinner";
// import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTenant } from "../../../services/apiSuperUser";
import toast from "react-hot-toast";

/**
 * CreateTenantForm component for creating a new tenant.
 * Displays a form to collect tenant details including name, address, admin, email, and description.
 * It includes navigation buttons to close the form or proceed to the next step.
 *
 * @component
 * @example
 * <CreateTenantForm onNext={handleNext} onClose={handleClose} />
 *
 * @param {Object} props - Component props
 * @param {Function} props.onNext - Callback function to proceed to the next step (called on clicking the "Next" button)
 * @param {Function} props.onClose - Callback function to close the form (called on clicking the "Close" button)
 *
 * @returns {JSX.Element} The rendered CreateTenantForm component.
 */

interface StepProps {
  // onNext: () => void;
  onClose: () => void;
}

const CreateTenantForm: FC<StepProps> = ({  onClose }) => {
  const { isLoading, tenantData, setTenantData } = useTenant();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTenantData((prev) => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      toast.success("Tenant created successfuly!");
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
      if (onClose) {onClose()};
    },
    onError: (err) => toast.error(err.message),
  });

  const submitData = () => {
    mutate(tenantData);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Setup New Organization</h2>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <form className="flex flex-col gap-3">
          {/* Tenant Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Tenant Name
            </label>
            <input
              type="text"
              name="name"
              value={tenantData.name}
              onChange={handleChange}
              placeholder="Enter tenant name"
              className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={tenantData.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Role Dropdown
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Admin
            </label>
            <select
              name="adminId"
              value={tenantData.adminId}
              onChange={handleChange}
              className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
            >
              <option value="">-- Select an Admin --</option>
              {admins?.map((admin) => (
                <option key={admin.id} value={admin.id}>
                  {admin.name}
                </option>
              ))}
            </select>
          </div> */}

          {/* Email Input
          <div className="mb-4">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={tenantData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
          </div> */}

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Description
            </label>
            <input
              name="description"
              value={tenantData.description}
              onChange={handleChange}
              type="text"
              placeholder=""
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone Number Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Contact Person Email
            </label>
            <input
              name="contactPersonEmail"
              value={tenantData.contactPersonEmail}
              onChange={handleChange}
              type="text"
              placeholder=""
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Contact Person Name
            </label>
            <input
              name="contactPersonName"
              value={tenantData.contactPersonName}
              onChange={handleChange}
              type="text"
              placeholder=""
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Contact Person Mobile
            </label>
              <input
                name="contactPersonMobile"
                value={tenantData.contactPersonMobile}
                onChange={handleChange}
                type="text"
                placeholder="Enter contact person's phone number"
                pattern="^[+]?[0-9]{1,4}[-\s]?[0-9]{1,14}(?:x.+)?$"
                required
                className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
              />
          </div>

          <div className="flex justify-around mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-44 text-xl px-4 py-3 bg-gray-500  text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>

            <button
              type="button"
              onClick={submitData}
              className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default CreateTenantForm;
