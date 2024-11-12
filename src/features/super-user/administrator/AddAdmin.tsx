import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import CreateAdminModal from "./CreateAdminModal";

/**
 * AddAdmin component that provides a button to open a modal for adding a new admin.
 * The modal includes a form (handled by `CreateAdminModal`) to add a new admin.
 * This component uses a modal context to manage the opening and closing of the modal.
 *
 * @component
 * @example
 * <AddAdmin />
 *
 * @returns {JSX.Element} The rendered AddAdmin component, including the modal logic and button.
 */

const AddAdmin: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-admin">
        <PrimaryButton>
          <FiPlus />
          Add New Admin
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-admin">
        {({ onClose }) => <CreateAdminModal onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddAdmin;
