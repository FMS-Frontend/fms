import { FC } from "react";
import PrimaryButton from "../../../../ui/utils/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../../ui/utils/Modal";
import CreateCaseForm from "../forms/CreateCaseForm";
// import RuleModal from "./RuleModal";

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

const AddCase: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-case">
        <PrimaryButton>
          <FiPlus />
          Add New Case
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-case">
        {({ onClose }) => <CreateCaseForm onClose={onClose || (() => {})} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddCase;
