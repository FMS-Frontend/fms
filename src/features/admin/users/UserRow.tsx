import { FC } from "react";
import { getStatusStyles } from "../../../db/helperFunctions";
import Modal from "../../../ui/utils/Modal";
import ConfirmDelete from "../../../ui/utils/ConfirmDelete";
import { GoTrash } from "react-icons/go";
import { AiFillEdit } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUser } from "../../../services/apiAdmin";
import toast from "react-hot-toast";
import EditUser from "./EditUserModal";
import { useAppContext } from "../../../context/AppContext";
import { maskNumber, maskEmailDomain } from "../../../ui/utils/helpers";
interface UserRowProps {
  user: User;
  index: number;
}

const UserRow: FC<UserRowProps> = ({ user, index }) => {
  const { tenant } = useAppContext();

  const queryClient = useQueryClient();
  const { id: userId, name, role, subRole, email, mobile, status } = user;
  // console.log(user);
  

  const { mutate } = useMutation({
    mutationFn: () => deleteUser(tenant, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting user, try again");
    },
  });

  return (
    <div
      className={`grid grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr_0.5fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-2xl">{name}</span>
      <span className="text-2xl">{subRole?.name || role}</span>
      <span className="text-blue-700 text-2xl">{maskEmailDomain(email)}</span>
      <span className="text-2xl">{maskNumber(mobile)}</span>
      <div>
        <span
          className={`flex justify-center items-center px-4 py-1 rounded-full text-xl font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      <div className="flex gap-3  justify-center">
        <Modal>
          <Modal.Open opens="delete">
            <button>
              <GoTrash className="hover:text-red-500 text-gray-600 transition-all duration-200 cursor-pointer" />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            {({ onClose }) => (
              <ConfirmDelete
                resourceName="Admin"
                onCloseModal={onClose || (() => {})}
                onConfirm={mutate}
              />
            )}
          </Modal.Window>

          <Modal.Open opens="edit">
            <button>
              <AiFillEdit className="hover:text-blue-700 text-gray-600 text-2xl transition-all duration-200 cursor-pointer" />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            {({ onClose }) => (
              <EditUser onClose={onClose || (() => {})} userToEdit={user} />
            )}
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default UserRow;
