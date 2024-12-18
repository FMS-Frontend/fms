import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import ViewCaseModal from "./ViewCasesModal";
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

interface ViewCaseProps {
  caseId: string; // Pass the rule ID to fetch specific rule details
}
const ViewCase: FC<ViewCaseProps> = ({caseId}) => {
  return (
    <Modal>
      <Modal.Open opens={`view-case-${caseId}`}>
        <button className="px-2 py-1 rounded bg-primaryBlue text-white cursor-pointer hover:bg-primaryBlue/70">
          View
        </button>
      </Modal.Open>
      <Modal.Window name={`view-case-${caseId}`}>
        {({ onClose }) => <ViewCaseModal onClose={onClose} caseId={caseId} />}
      </Modal.Window>
    </Modal>
  );
};

export default ViewCase;
