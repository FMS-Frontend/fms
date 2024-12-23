import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import AssignAlertModal from "./AssignAlertModal";
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

const AssignAlert: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="reopen-case">
        <button className="px-2 py-1 rounded bg-green-50 hover:bg-green-100 text-green-500">
          Assign
        </button>
      </Modal.Open>
      <Modal.Window name="reopen-case">
        {({ onClose }) => <AssignAlertModal onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default AssignAlert;
