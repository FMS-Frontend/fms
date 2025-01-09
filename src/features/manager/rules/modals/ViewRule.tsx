
import { FC } from "react";
import Modal3 from "../../../../ui/utils/Modal.View";
import ViewRuleModal from "./ViewRuleModal";

interface ViewRuleProps {
  ruleId: string; 
}

const ViewRule: FC<ViewRuleProps> = ({ ruleId }) => {
  return (
    <Modal3>
      <Modal3.Open opens={`view-rule-${ruleId}`}>
        <button className="px-2 py-1 rounded bg-primaryBlue text-white cursor-pointer hover:bg-primaryBlue/70">
          View
        </button>
      </Modal3.Open>
      <Modal3.Window name={`view-rule-${ruleId}`}>
        {({ onClose }) => <ViewRuleModal onClose={onClose} ruleId={ruleId} />}
      </Modal3.Window>
    </Modal3>
  );
};

export default ViewRule;

