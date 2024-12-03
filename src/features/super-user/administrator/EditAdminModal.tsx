import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import URL from "../../../db/url";
import { capitalizeWords } from "../../../db/helperFunctions";

/**
 * EditAdminModal component that provides a form to create a new admin.
 * It includes fields for the admin's name, address, email, phone number, and a description.
 * There are also buttons to close the modal and submit the form.
 *
 * @component
 * @example
 * <EditAdminModal onClose={handleClose} />
 *
 * @param {Object} props - The props for the component.
 * @param {Function} props.onClose - The function to call when the modal should be closed.
 *
 * @returns {JSX.Element} The rendered CreateAdminModal component containing the form and action buttons.
 */

interface Admin {
  id: string;
  name: string;
  role: string;
  email: string;
  mobile: string;
  status: "Active" | "Pending" | "Deactivated";
}

interface EditAdminProps {
  onClose: () => void;
  adminToEdit?: Admin;
}

interface FormData {
  name: string;
  email: string;
  mobile: string;
  address: string;
}

const EditAdminModal: FC<EditAdminProps> = ({ onClose, adminToEdit = {} }) => {
  const { id: editId, ...editValues } = adminToEdit;

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: editValues,
  });

  const queryClient = useQueryClient();

  const onFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await URL.patch(`/users/${editId}`, {
        name: capitalizeWords(data.name),
        email: data.email,
        mobile: data.mobile,
        address: data.address,
      });

      toast.success("Admin Edited Successfully");
      onClose();
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
    } catch (error) {
      console.log(error);
      toast.error("Error Editing Admin, Try Again!");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Edit Admin</h2>
      </div>

      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-3"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Admin Name
          </label>
          <input
            type="text"
            placeholder="Enter tenant name"
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            {...register("name")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter address"
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            {...register("address")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            {...register("email")}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Phone Number
          </label>
          <input
            type="number"
            placeholder="Enter Phone Number"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            {...register("mobile")}
          />
        </div>

        <div className="flex justify-around mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-44 text-xl px-4 py-3 bg-gray-600  text-white rounded-md hover:bg-gray-700"
          >
            Close
          </button>

          <button
            type="submit"
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Edit Admin
          </button>
        </div>
      </form>
    </>
  );
};

export default EditAdminModal;
