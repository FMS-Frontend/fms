import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import Modal from "../../../ui/utils/Modal";
import CreateRoleModal from "./CreateRoleModal";

/**
 * AddUser component to handle the creation of a new user.
 * This component displays a button that opens a modal for adding a new user.
 * The modal window allows users to go through the process of creating a new user.
 *
 * @component
 * @example
 * <AddUser />
 *
 * @returns {JSX.Element} The rendered AddUser component with a button that opens a modal for creating a new user.
 */

const AddRole: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-role">
        <PrimaryButton>
          <FiPlus />
          Create Role
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-role">
        {({ onClose }) => <CreateRoleModal onClose={onClose || (() => {})} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddRole;
