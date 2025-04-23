import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import ViewAlertModal from "./ViewAlertModal";
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

const ViewAlert: FC<ViewAlertProps> = ({alertId}) => {
  return (
    <Modal>
      <Modal.Open opens={`view-case-${alertId}`}>
        <button className="px-2 py-1 rounded bg-primaryBlue text-white cursor-pointer hover:bg-primaryBlue/70">
          View
        </button>
      </Modal.Open>
      <Modal.Window name={`view-case-${alertId}`}>
        {({ onClose }) => <ViewAlertModal onClose={onClose} alertId={alertId} />}
      </Modal.Window>
    </Modal>
  );
};

export default ViewAlert;
