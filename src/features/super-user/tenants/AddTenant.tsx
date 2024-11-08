import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
// import CreateTenantModal from "./CreateTenantModal";
import TenantModal from "./TenantModal";

const AddTenant: FC = () => {
  return (
    <Modal>
      <Modal.Open opens="create-tenant">
        <PrimaryButton>
          <FiPlus />
          Add New Tenant
        </PrimaryButton>
      </Modal.Open>
      <Modal.Window name="create-tenant">
        <TenantModal />
      </Modal.Window>
    </Modal>
  );
};

export default AddTenant;
