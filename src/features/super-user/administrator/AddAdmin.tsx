import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import CreateAdminModal from "./CreateAdminModal";

const AddAdmin: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-tenant">
        <PrimaryButton>
          <FiPlus />
          Add New Admin
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-tenant">
        <CreateAdminModal />
      </Modal.Window>
    </Modal>
  );
};

export default AddAdmin;
