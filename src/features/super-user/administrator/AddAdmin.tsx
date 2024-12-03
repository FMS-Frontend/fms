import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import CreateAdminModal from "./CreateAdminModal";

/**
 * AddAdmin component renders a modal interface for adding a new admin user.
 *
 * @component
 * @returns {JSX.Element} A button to open the modal and a modal window containing the
 * form to create a new admin.
 *
 * The component structure includes:
 * - `PrimaryButton` to trigger the modal open action with the label "Add New Admin."
 * - `CreateAdminModal` is displayed within the modal window for adding admin details.
 *
 * @example
 * // Usage
 * <AddAdmin />
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
        {({ onClose }) => <CreateAdminModal onClose={onClose || (() => {})} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddAdmin;
