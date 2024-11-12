import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
import TenantModal from "./TenantModal";

/**
 * AddTenant component that opens a modal to add a new tenant.
 * It includes a button that triggers the opening of a modal with a form for creating a tenant.
 * The modal contains the form for tenant details and a close button to dismiss the modal.
 *
 * @returns {JSX.Element} The rendered AddTenant component, including the button to open the modal and the modal itself.
 */

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
        {({ onClose }) => <TenantModal onClose={onClose} />}
      </Modal.Window>
    </Modal>
  );
};

export default AddTenant;
