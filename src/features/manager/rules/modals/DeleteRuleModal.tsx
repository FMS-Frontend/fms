import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import DeleteRuleForm from "../forms/DeleteRuleForm";

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

const DeleteRuleModal: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="delete-rule-modal">
        Delete Rule
      </Modal.Open>
      <Modal.Window name="delete-rule-modal">
        {({ onClose }) => <DeleteRuleForm onClose={onClose || (() => {})} />}
      </Modal.Window>
    </Modal>
  );
};

export default DeleteRuleModal;
