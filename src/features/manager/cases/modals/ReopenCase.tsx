import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import ReopenCaseModal from "./ReopenCaseModal";
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

interface ReopenCaseProps  {
  caseId: string;
}

const ReopenCase: FC<ReopenCaseProps> = ({caseId}) => {
  return (
    <Modal>
      <Modal.Open opens={`reopen-case-${caseId}`}>
        <button className="px-2 py-1 rounded bg-red-50 hover:bg-red-100 text-red-500">
          Reopen
        </button>
      </Modal.Open>
      <Modal.Window name={`reopen-case-${caseId}`}>
        {({ onClose }) => <ReopenCaseModal onClose={onClose} caseId={caseId} />}
      </Modal.Window>
    </Modal>
  );
};

export default ReopenCase;
