import React, { useState } from "react";
import CreateTenantForm from "./CreateTenantForm";
import { TenantProvider } from "./TenantContext";

/**
 * TenantModal component for managing the multi-step process of setting up a new tenant.
 * It allows the user to go through a series of steps: creating tenant details, viewing tenant info, and configuring tenant options.
 *
 * The modal component controls the flow of the setup process, providing navigation between steps (Next/Previous).
 *
 * @component
 * @example
 * <TenantModal onClose={handleClose} />
 *
 * @param {Object} props - Component props
 * @param {Function} props.onClose - Callback function to close the modal (typically passed from a parent component)
 *
 * @returns {JSX.Element} The rendered TenantModal component, containing a multi-step form.
 */

interface TenantModalProps {
  onClose: () => void;
}

const TenantModal: React.FC<TenantModalProps> = ({ onClose }) => {
  const [ step ] = useState(1);

  return (
    <>
      <TenantProvider>
        {step === 1 && <CreateTenantForm  onClose={onClose} />}
      </TenantProvider>
    </>
  );
};

export default TenantModal;
