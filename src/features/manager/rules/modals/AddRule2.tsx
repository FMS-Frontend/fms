import { FC } from "react";
import PrimaryButton from "../../../../ui/utils/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal2 from "../../../../ui/utils/Modal.Rule";
import CreateRuleForm from "../forms/CreateRuleForm";

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

const AddRule2: FC = () => {
  return (
    <Modal2>
      <Modal2.Open opens="create-rule2">
        <PrimaryButton>
          <FiPlus />
          Add New Rule
        </PrimaryButton>
      </Modal2.Open>
      <Modal2.Window name="create-rule2">
        {({ onClose }) => <CreateRuleForm onClose={onClose || (() => {})} />}
      </Modal2.Window>
    </Modal2>
  );
};

export default AddRule2;
