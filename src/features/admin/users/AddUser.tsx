import { FC } from "react";
import { FiPlus } from "react-icons/fi";
import PrimaryButton from "../../../ui/PrimaryButton";
import Modal from "../../../ui/Modal";
import CreateUser from "./CreateUserModal";

const AddTenant: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-tenant">
        <PrimaryButton>
          <FiPlus />
          Add New User
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-tenant">
        {({ onClose }) => <CreateUser onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddTenant;
