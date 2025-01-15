import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import DeleteRuleForm from "../forms/DeleteRuleForm";
import { GoTrash } from "react-icons/go";


/**
 * AddRule is a React functional component that renders a button to open
 * a modal for adding a new rule. It uses a Modal component to handle the
 * display and functionality of the modal window.
 *
 * @component
 * @returns {JSX.Element} The rendered component with a button to add a new rule.
 *
 * @example
 * return (
 *   <AddRule />
 * );
 */

interface DeleteRuleProps {
  ruleId: string; // Pass the rule ID to fetch specific rule details
}
const DeleteRule: FC<DeleteRuleProps> = ({ruleId}) => {
  return (
    <Modal>
      <Modal.Open opens={`view-rule-${ruleId}`}>
        <button className="px-2 py-1 text-lg  text-red-500">
              <GoTrash className="hover:text-red-500 text-gray-600 transition-all duration-200 cursor-pointer" />
        </button>
      </Modal.Open>
      <Modal.Window name={`view-rule-${ruleId}`}>
        {({ onClose }) => <DeleteRuleForm  ruleId={ruleId} onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default DeleteRule;

