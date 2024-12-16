
import { FC } from "react";
import Modal from "../../../../ui/utils/Modal";
import ViewRuleModal from "./ViewRuleModal";

interface ViewRuleProps {
  ruleId: string; // Pass the rule ID to fetch specific rule details
}

const ViewRule: FC<ViewRuleProps> = ({ ruleId }) => {
  return (
    <Modal>
      <Modal.Open opens={`view-rule-${ruleId}`}>
        <button className="px-2 py-1 rounded bg-primaryBlue text-white cursor-pointer hover:bg-primaryBlue/70">
          View
        </button>
      </Modal.Open>
      <Modal.Window name={`view-rule-${ruleId}`}>
        {({ onClose }) => <ViewRuleModal onClose={onClose} ruleId={ruleId} />}
      </Modal.Window>
    </Modal>
  );
};

export default ViewRule;

