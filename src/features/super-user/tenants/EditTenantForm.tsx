import { FC } from "react";
// import { useTenant } from "./TenantContext";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { capitalizeWords } from "../../../db/helperFunctions";
import URL from "../../../db/url";
import { Tenant } from "../../../db/types";
// import { Tenant } from "./TenantRow";

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

interface EditTenantProps {
  onClose?: () => void;
  tenantToEdit?: Tenant;
}

const EditTenantForm: FC<EditTenantProps> = ({ tenantToEdit, onClose }) => {
  const queryClient = useQueryClient();

  const { ...tenantValues } = tenantToEdit;

  const { register, handleSubmit } = useForm<Tenant>({
    defaultValues: tenantValues,
  });

  const onFormSubmit: SubmitHandler<Tenant> = async (data) => {
    try {
      await URL.patch(`/tenants/${tenantValues.userName}`, {
        name: capitalizeWords(data.name),
        address: data.address,
        description: data.description,
      });

      toast.success("Admin Edited Successfully");
      
      if(onClose){
        onClose()
      }
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
    } catch (error) {
      toast.error("Error Editing Tenant, Try Again!");
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Edit New Tenant</h2>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-3"
      >
        {/* Tenant Name Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Tenant Name
          </label>
          <input
            type="text"
            {...register("name")}
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
            {...register("address")}
            placeholder="Enter address"
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            {...register("description")}
            placeholder=""
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
            type="submit"
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Update Tenant
          </button>
        </div>
      </form>
    </>
  );
};

export default EditTenantForm;
