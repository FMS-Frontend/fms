import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import URL from "../../../db/url";
import toast from "react-hot-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { getRoles } from "../../../services/apiAdmin";
import { useAppContext } from "../../../context/AppContext";


/**
 * CreateUser component to handle the creation of a new user.
 * This component displays a form that allows users to input details for creating a new user.
 * The form collects information such as the user's full name, address, email, phone number, role, and description.
 *
 * @component
 * @example
 * <CreateUser onClose={handleClose} />
 *
 * @param {Object} props - The component's props.
 * @param {Function} props.onClose - A callback function to handle closing the form/modal.
 *
 * @returns {JSX.Element} The rendered form for creating a new user.
 */


interface CreateUserProps {
  onClose?: () => void;
}

interface Role {
  id: string;
  name: string;
}

const CreateUser: FC<CreateUserProps> = ({ onClose }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm<CreateUserFormData>();
  const { tenant } = useAppContext();

  const { isLoading, data: { data: roles } = {} } = useQuery<{ data: Role[] }>({
    queryFn: () => getRoles(tenant),
    queryKey: ["roles"],
  });
  // console.log(roles);

  const onFormSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      const createUrl = `/users/tenants/${tenant}`;

      await URL.post(createUrl, {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        description: data.description,
        roleId: data.roleId,
      });

      toast.success("User created successfully");
      onClose?.();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    } catch (error: any) {
      console.log(error);
      const errMsg = error?.message
        toast.error(errMsg);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Create New User</h2>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            {...register("name", { required: "Name is required" })}
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter address"
            {...register("address", { required: "Address is required" })}
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Phone Number
          </label>
          <input
            type="text"
            placeholder="Enter phone number"
            {...register("mobile",
              {required: "Phone number is required", pattern: {
              value: /^[+]?[0-9]{1,4}[-\s]?[0-9]{1,14}(?:x.+)?$/,
              message: "Please enter a valid phone number",
            }, })}
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Role
          </label>
          <select
            {...register("roleId", { required: "Role is required" })}
            className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500"
          >
            <option value="">-- Select a Role --</option>
            {roles?.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <input
            type="textarea"
            placeholder="Enter description"
            {...register("description")}
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-around mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Create User
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateUser;
