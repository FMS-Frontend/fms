import { FC } from "react";
import PrimaryButton from "../../../ui/PrimaryButton";
import { FiPlus } from "react-icons/fi";
import Modal from "../../../ui/Modal";
// import CreateTenantModal from "./CreateTenantModal";
import TenantModal from "./TenantModal";

/**
 * AddTenant is a React functional component that renders a button to open
 * a modal for adding a new tenant. It uses a Modal component to handle the
 * display and functionality of the modal window.
 *
 * @component
 * @returns {JSX.Element} The rendered component with a button to add a new tenant.
 *
 * @example
 * return (
 *   <AddTenant />
 * );
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
