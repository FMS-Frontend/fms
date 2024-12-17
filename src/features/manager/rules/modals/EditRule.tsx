import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import EditRuleModal from "./EditRuleModal";
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

interface EditRuleProps {
  ruleId: string; // Pass the rule ID to fetch specific rule details
}

const EditRule: FC<EditRuleProps> = ({ ruleId }) => {
  return (
    <Modal>
      <Modal.Open opens="edit-rule">
        <button className="px-2 py-1 rounded bg-green-50 hover:bg-green-100 text-green-500">
          Edit
        </button>
      </Modal.Open>
      <Modal.Window name="edit-rule">
        {({ onClose }) => <EditRuleModal ruleId={ruleId} onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default EditRule;