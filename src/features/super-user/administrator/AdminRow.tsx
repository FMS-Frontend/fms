import { FC } from "react";
import { GoTrash } from "react-icons/go";
import { AiFillEdit } from "react-icons/ai";
import Modal from "../../../ui/utils/Modal";
import ConfirmDelete from "../../../ui/utils/ConfirmDelete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdmin } from "../../../services/apiSuperUser";
import toast from "react-hot-toast";
import EditAdminModal from "./EditAdminModal";
import { getStatusStyles } from "../../../db/helperFunctions";
import { Admin } from "../../../db/types";

interface AuditRowProps {
  admin: Admin;
  index: number;
}

const AdminRow: FC<AuditRowProps> = ({ admin, index }) => {
  const { id: adminId, name, email, mobile, status, tenant } = admin;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
      toast.success("Deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting, try again");
    },
  });

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1.5fr_1fr_0.5fr_0.5fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-2xl">{name}</span>
      <span className="text-2xl">{tenant?.name || "-"}</span>
      <span className="text-blue-700 text-2xl">{email}</span>
      <span className="text-xl">{mobile}</span>
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
                onConfirm={() => {
                  mutate(adminId);
                }}
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
              <EditAdminModal
                onClose={onClose || (() => {})}
                adminToEdit={admin}
              />
            )}
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default AdminRow;
