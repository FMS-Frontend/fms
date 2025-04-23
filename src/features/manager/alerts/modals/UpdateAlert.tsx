import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import UpdateAlertModal from "./UpdateAlertModal";
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
interface ViewAlertProps {
  alertId: string; 
}

const UpdateAlert: FC<ViewAlertProps> = ({alertId}) => {
  return (
    <Modal>
      <Modal.Open opens={`update-alert-${alertId}`}>
        <button className="px-2 py-1 rounded bg-green-200 text-green-500 border cursor-pointer hover:border-green-500">
          Update
        </button>
      </Modal.Open>
      <Modal.Window name={`update-alert-${alertId}`}>
        {({ onClose }) => <UpdateAlertModal onClose={onClose} alertId={alertId} />}
      </Modal.Window>
    </Modal>
  );
};

export default UpdateAlert;
