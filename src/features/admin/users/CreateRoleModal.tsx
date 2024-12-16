import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import URL from "../../../db/url";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../../../context/AppContext";

interface CreateRoleProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  permissions: string[];
  description: string;
}

// /tenants/:tenant/roles

const CreateRoleModal: FC<CreateRoleProps> = ({ onClose }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [permissions, setPermissions] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const { tenant } = useAppContext();

  const handleCheckboxChange = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((item) => item !== permission)
        : [...prev, permission]
    );
  };

  const onSubmit = async (data: FormData) => {
    try {
      const roleData = {
        name: data.name,
        description: data.description,
        permissions,
      };

      await URL.post(`/tenants/${tenant}/roles`, roleData);

      toast.success("Role created successfully");
      onClose?.();
      queryClient.invalidateQueries({
        queryKey: ["roles"],
      });
      // console.log(res);
    } catch (error) {
      console.log(error);
      toast.error("Error creating role, try again");
    }
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Create New Role</h2>
      </div>

      {/* Form */}
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Role Name */}
        <div>
          <label className="block text-gray-700 text-xl font-bold mb-1">
            Role Name
          </label>
          <input
            type="text"
            placeholder=""
            {...register("name", { required: true })}
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-xl font-bold mb-1">
            Description
          </label>
          <textarea
            placeholder="Provide a brief description of this role"
            {...register("description", { required: true })}
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            rows={3}
          ></textarea>
        </div>

        {/* Permissions */}
        <div>
          <label className="block text-gray-800 text-xl font-bold mb-3">
            Permissions
          </label>

          <div className="ml-6 space-y-4 mb-16">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="user:create"
                onChange={() => handleCheckboxChange("user:create")}
              />
              <label
                htmlFor="user:create"
                className="text-gray-700 text-xl font-medium"
              >
                Create
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="user:modify"
                onChange={() => handleCheckboxChange("user:modify")}
              />
              <label
                htmlFor="user:modify"
                className="text-gray-700 text-xl font-medium"
              >
                Modify
              </label>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-around mt-20">
          <button
            type="button"
            onClick={onClose}
            className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>

          <button
            type="submit"
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateRoleModal;
