import { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import URL from "../../../db/url";
import toast from "react-hot-toast";
import { capitalizeWords } from "../../../db/helperFunctions";
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

interface EditUserProps {
  onClose?: () => void;
  userToEdit?: User;
}

const EditUser: FC<EditUserProps> = ({ userToEdit, onClose }) => {
  const { id: userId, ...usertoEditValues } = userToEdit!;

  const { tenant } = useAppContext();

  const queryClient = useQueryClient();

  const { register, handleSubmit } = useForm<CreateUserFormData>({
    defaultValues: usertoEditValues,
  });

  const onFormSubmit: SubmitHandler<CreateUserFormData> = async (data) => {
    try {
      const editUrl = `/users/tenants/${tenant}/${userId}`;

      await URL.patch(editUrl, {
        name: capitalizeWords(data.name),
        email: data.email,
        mobile: data.mobile,
        address: data.address,
        description: data.description,
      });

      toast.success("User updated successfully");
      onClose?.();
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    } catch (error) {
      console.log(error);
      toast.error("Error updating user. Please try again!");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Edit User</h2>
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
            {...register("name")}
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
            {...register("address")}
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
            {...register("email")}
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Phone Number
          </label>
          <input
            type="number"
            placeholder="Enter phone number"
            {...register("mobile")}
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
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
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Update User
          </button>
        </div>
      </form>
    </>
  );
};

export default EditUser;
