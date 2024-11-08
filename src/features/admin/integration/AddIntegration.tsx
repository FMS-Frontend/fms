import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import CreateIntegration from "./CreateIntegration";

const AddIntegration: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-tenant">
        <PrimaryButton>
          <FiPlus />
          Add New Integration
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-tenant">
        <CreateIntegration />
      </Modal.Window>
    </Modal>
  );
};

export default AddIntegration;
