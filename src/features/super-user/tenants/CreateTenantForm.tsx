import { FC, ChangeEvent, useState } from "react";
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

const CreateTenantForm: FC<StepProps> = ({ onClose }) => {
  const { isLoading, tenantData, setTenantData } = useTenant();
  const [errors, setErrors] = useState<Record<string, string>>({}); // State to track errors

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTenantData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error when user types
  };

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      toast.success("Tenant created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
      if (onClose) {
        onClose();
      }
    },
    onError: (err) => toast.error(err.message),
  });

  const validateFields = () => {
    const newErrors: Record<string, string> = {};
    if (!tenantData.name) newErrors.name = "Tenant name is required";
    if (!tenantData.address) newErrors.address = "Address is required";
    if (!tenantData.description)
      newErrors.description = "Description is required";
    if (!tenantData.contactPersonEmail)
      newErrors.contactPersonEmail = "Contact person email is required";
    if (!tenantData.contactPersonName)
      newErrors.contactPersonName = "Contact person name is required";
    if (!tenantData.contactPersonMobile)
      newErrors.contactPersonMobile = "Contact person mobile is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitData = () => {
    if (validateFields()) {
      mutate(tenantData);
    }
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
              pattern="^(?!\d+$)(?!\d+$)[a-zA-Z0-9\s._-]+$"
              required
              placeholder="Enter tenant name"
              className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <span className="text-red-500 text-lg">{errors.name}</span>
            )}
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
              placeholder="Enter tenant address"
              className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
            {errors.address && (
              <span className="text-red-500 text-lg">{errors.address}</span>
            )}
          </div>

          {/* Contact Person Name Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Contact Person Name
            </label>
            <input
              name="contactPersonName"
              value={tenantData.contactPersonName}
              onChange={handleChange}
              required
              type="text"
              placeholder="Enter contact person's name"
              pattern="^(?!\d+$)(?!\d+$)[a-zA-Z0-9\s._-]+$"
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
            {errors.contactPersonName && (
              <span className="text-red-500 text-lg">
                {errors.contactPersonName}
              </span>
            )}
          </div>

          {/* Contact Person Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Contact Person Email
            </label>
            <input
              name="contactPersonEmail"
              value={tenantData.contactPersonEmail}
              onChange={handleChange}
              type="text"
              placeholder="Enter contact person's email"
              required
              pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
            {errors.contactPersonEmail && (
              <span className="text-red-500 text-lg">
                {errors.contactPersonEmail}
              </span>
            )}
          </div>

          {/* Contact Person Mobile Input */}
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
              pattern="^\d{10}$"
              required
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            />
            {errors.contactPersonMobile && (
              <span className="text-red-500 text-lg">
                {errors.contactPersonMobile}
              </span>
            )}
          </div>

          {/* Description Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-xl font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={tenantData.description}
              onChange={handleChange}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = "auto";
                const maxHeight = 200;
                const minHeight = 80;
                target.style.height = `${Math.min(
                  Math.max(target.scrollHeight, minHeight),
                  maxHeight
                )}px`;
              }}
              required
              rows={3}
              maxLength={500}
              minLength={20}
              placeholder="Describe the tenant (maximum 500 characters)"
              className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500 resize-none"
            />
            {errors.description && (
              <span className="text-red-500 text-lg">{errors.description}</span>
            )}
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
