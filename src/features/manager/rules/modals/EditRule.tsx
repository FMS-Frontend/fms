import { FC } from "react";
import EditRuleModal from "./EditRuleModal";
import Modal2 from "../../../../ui/utils/Modal.Rule";
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
    <Modal2>
      <Modal2.Open opens="edit-rule">
        <button className="px-2 py-1 rounded bg-green-50 hover:bg-green-100 text-green-500">
          Edit
        </button>
      </Modal2.Open>
      <Modal2.Window name="edit-rule">
        {({ onClose }) => <EditRuleModal ruleId={ruleId} onClose={onClose} />}
      </Modal2.Window>
    </Modal2>
  );
};

export default EditRule;