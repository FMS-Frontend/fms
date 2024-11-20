import React, { useState } from "react";
import CreateRuleForm from "./CreateRuleForm";
// import CreateTenantForm from "./CreateTenantForm";
// import TenantInfo from "./TenantInfo";
// import TenantCheckboxes from "./TenantCheckboxes";

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

const RuleModal: React.FC<TenantModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  // const previousStep = () => setStep((prev) => prev - 1);

  return (
    <>
      {step === 1 && <CreateRuleForm onNext={nextStep} onClose={onClose} />}
      {/* {step === 2 && <TenantInfo onPrevious={previousStep} onNext={nextStep} />}
      {step === 3 && <TenantCheckboxes onClose={onClose} />} */}
    </>
  );
};

export default RuleModal;
