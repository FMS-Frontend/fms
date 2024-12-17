import { FC } from "react";
import Modal from "../../../ui/utils/Modal";
import ConfirmDelete from "../../../ui/utils/ConfirmDelete";
import { GoTrash } from "react-icons/go";
import { AiFillEdit } from "react-icons/ai";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTenant } from "../../../services/apiSuperUser";
import {
  capitalizeWords,
  formatDate,
  getFirstFourTenantId,
  getStatusStyles,
} from "../../../db/helperFunctions";
import EditTenantForm from "./EditTenantForm";
import { Tenant } from "../../../db/types";

interface TenantRowProps {
  tenant: Tenant;
  index: number;
}

const TenantRow: FC<TenantRowProps> = ({ tenant, index }) => {
  const { id: tenantId, name, createdAt, status, admin, userName } = tenant;

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: deleteTenant,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tenants"],
      });
      toast.success("Deleted successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div
      className={`grid grid-cols-[1fr_1fr_1.5fr_1fr_0.5fr_0.5fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-2xl">{capitalizeWords(name)}</span>
      <span className="text-2xl">{`TEN - ${getFirstFourTenantId(
        tenantId
      )}`}</span>
      <span className="text-2xl">{admin.name}</span>
      <span className="text-blue-700 text-2xl">{formatDate(createdAt)}</span>

      <div>
        <span
          className={`flex justify-center items-center px-4 py-1 rounded-full text-xl font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      </div>
      <div className="flex gap-5  justify-center">
        <Modal>
          <Modal.Open opens="delete">
            <button>
              <GoTrash className="hover:text-red-500 text-gray-600 transition-all duration-200 cursor-pointer" />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            {({ onClose }) => (
              <ConfirmDelete
                resourceName="Tenant"
                onCloseModal={onClose || (() => {})}
                onConfirm={() => {
                  mutate(userName);
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
              <EditTenantForm
                onClose={onClose || (() => {})}
                tenantToEdit={tenant}
              />
            )}
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default TenantRow;
