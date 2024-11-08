import React, { useState } from "react";
import CreateTenantForm from "./CreateTenantForm";
import TenantInfo from "./TenantInfo";
import TenantCheckboxes from "./TenantCheckboxes";

interface TenantModalProps {
  onClose: () => void;
}

const TenantModal: React.FC<TenantModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  return (
    <>
      {step === 1 && <CreateTenantForm onNext={nextStep} />}
      {step === 2 && <TenantInfo onPrevious={previousStep} onNext={nextStep} />}
      {step === 3 && <TenantCheckboxes onClose={onClose} />}
    </>
  );
};

export default TenantModal;
