import { FC } from "react";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/utils/Modal";
import CreateIntegration from "./CreateIntegration";

/**
 * AddIntegration component that triggers the modal for adding a new integration.
 * It opens a modal window that allows the user to fill out the integration details in the `CreateIntegration` form.
 *
 * The component uses a modal to display a form for creating a new integration. It leverages the `PrimaryButton` component
 * with a plus icon, and opens the modal with a "create-tenant" identifier.
 *
 * @component
 * @example
 * <AddIntegration />
 *
 * @returns {JSX.Element} The rendered AddIntegration component, which contains the modal for adding a new integration.
 */


const AddIntegration: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="integration">
        <PrimaryButton>
          <FiPlus />
          Add New Integration
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="integration">
        {({ onClose }) => <CreateIntegration onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddIntegration;
