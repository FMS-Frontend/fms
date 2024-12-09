import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import ViewRuleModal from "./ViewRuleModal";
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

const ViewRule: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="view-case">
        <button className="px-2 py-1 rounded bg-primaryBlue text-white cursor-pointer hover:bg-primaryBlue/70">
          View
        </button>
      </Modal.Open>
      <Modal.Window name="view-case">
        {({ onClose }) => <ViewRuleModal onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default ViewRule;
