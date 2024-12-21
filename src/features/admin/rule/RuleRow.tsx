import { FC } from "react";
import Modal from "../../../ui/utils/Modal";
// import ConfirmDelete from "../../../ui/utils/ConfirmDelete";
// import { GoTrash } from "react-icons/go";
// import { AiFillEdit } from "react-icons/ai";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { deleteTenant } from "../../../services/apiSuperUser";
import {
  capitalizeWords,
  formatDate,
  getFirstFourTenantId,
  getStatusStyles,
} from "../../../db/helperFunctions";
// import EditTenantForm from "./EditTenantForm";
// import { formatDateTime } from "../../../ui/utils/helpers";
import ViewRule from "./ViewRuleModal";
import EditRule from "./EditRuleModal";

interface TenantRowProps {
  rule: Rule;
  index: number;
}

const RuleRow: FC<TenantRowProps> = ({ rule, index }) => {
  // const { id: tenantId, name, createdAt, status, admin, userName } = tenant;
  console.log(rule);
  const { id, updatedAt, rule_name: ruleName, status } = rule!;

  // const queryClient = useQueryClient();

  // const { mutate } = useMutation({
  //   mutationFn: deleteTenant,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["tenants"],
  //     });
  //     toast.success("Deleted successfully");
  //   },
  //   onError: (err) => {
  //     toast.error(err.message);
  //   },
  // });

  return (
    <div
      className={`grid grid-cols-[0.5fr_1fr_0.5fr_1fr_0.5fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-2xl">{`R-${getFirstFourTenantId(id)}`}</span>
      <span className="text-2xl">{capitalizeWords(ruleName)}</span>
      <div>
        <span
          className={`flex justify-center items-center px-4 py-1 rounded-full text-xl font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      <span className="text-2xl">{formatDate(updatedAt)}</span>

      <div className="flex gap-5  justify-center">
        <Modal>
          <Modal.Open opens="delete">
            <button className=" bg-green-200 text-green-700 text-xl px-3 py-1 rounded-sm hover:bg-green-300 transition-all duration-300">
              Edit
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            {({ onClose }) => <EditRule onClose={onClose || (() => {})} />}
          </Modal.Window>

          <Modal.Open opens="edit">
            <button className=" bg-blue-700 text-white text-xl px-3 py-1 rounded-sm hover:bg-blue-600 transition-all duration-300">
              View
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            {({ onClose }) => <ViewRule onClose={onClose || (() => {})} />}
          </Modal.Window>
        </Modal>
      </div>
    </div>
  );
};

export default RuleRow;
