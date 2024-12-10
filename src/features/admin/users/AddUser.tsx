import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import Modal from "../../../ui/utils/Modal";
import CreateUser from "./CreateUserModal";

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

const AddUser: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-user">
        <PrimaryButton>
          <FiPlus />
          Add New User
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-user">
        {({ onClose }) => <CreateUser onClose={onClose || (() => {})} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddUser;
