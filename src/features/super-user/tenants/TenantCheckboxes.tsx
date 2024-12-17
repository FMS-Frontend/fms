import { FC } from "react";
import { useTenant } from "./TenantContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTenant } from "../../../services/apiSuperUser";
import toast from "react-hot-toast";

/**
 * TenantCheckboxes component for setting up options when creating a new tenant.
 * This component displays checkboxes for different options that can be enabled or disabled.
 * The options include creating schema, syncing admin, sending a login email, and creating a rule folder.
 * The user can interact with the checkboxes and choose which options to enable before proceeding.
 *
 * @component
 * @example
 * <TenantCheckboxes onClose={handleClose} />
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback function to close the form (called on clicking the "Cancel" button)
 *
 * @returns {JSX.Element} The rendered TenantCheckboxes component.
 */

interface CheckboxProp {
  onClose: () => void;
}

const TenantCheckboxes: FC<CheckboxProp> = ({ onClose }) => {
  const { tenantData, setTenantData } = useTenant();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: createTenant,
    onSuccess: () => {
      toast.success("Tenant created successfuly!");
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  const toggleOption = (option: keyof typeof tenantData) => {
    setTenantData((prev) => ({
      ...prev,
      [option]: !prev[option], // Toggle the specified boolean property
    }));
  };

  const submitData = () => {
    mutate(tenantData);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Setup New Organization</h2>
      </div>

      {/* Checkbox Options */}
      <div className="space-y-4 mb-12">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={tenantData.createSchema}
            onChange={() => toggleOption("createSchema")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer"
          />
          <span className="text-gray-700 text-2xl font-medium">
            Create Schema
          </span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={tenantData.syncAdmin}
            onChange={() => toggleOption("syncAdmin")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer"
          />
          <span className="text-gray-700 text-2xl font-medium">Sync Admin</span>
        </label>

        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={tenantData.sendLoginMail}
            onChange={() => toggleOption("sendLoginMail")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer"
          />
          <span className="text-gray-700 text-2xl font-medium">
            Send Login Mail
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={tenantData.createRuleFolder}
            onChange={() => toggleOption("createRuleFolder")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer"
          />
          <span className="text-gray-700 text-2xl font-medium">
            Create Rule Folder
          </span>
        </label>
      </div>

      <div className="flex justify-around mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-44 text-xl px-4 py-3 bg-gray-500  text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          onClick={submitData}
          className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
        >
          Execute
        </button>
      </div>
    </>
  );
};

export default TenantCheckboxes;
