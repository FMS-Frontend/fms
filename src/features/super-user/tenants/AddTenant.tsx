import { FC } from "react";
import PrimaryButton from "../../../ui/utils/PrimaryButton";
import { FiPlus } from "react-icons/fi";
// import Modal from "../../../ui/utils/Modal";
import TenantModal from "./TenantModal";
import ModalTenant from "../../../ui/utils/Modal.Tenants";

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
    <ModalTenant>
      <ModalTenant.Open opens="create-tenant">
        <PrimaryButton>
          <FiPlus />
          Add New Organization
        </PrimaryButton>
      </ModalTenant.Open>
      <ModalTenant.Window name="create-tenant">
        {({ onClose }) => <TenantModal onClose={onClose || (() => {})} />}
      </ModalTenant.Window>
    </ModalTenant>
  );
};

export default AddTenant;
