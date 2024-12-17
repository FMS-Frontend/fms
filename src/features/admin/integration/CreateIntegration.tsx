import { FC, useState } from "react";
import IntegrationForm1 from "./IntegrationForm1";
import IntegrationForm2 from "./IntegrationForm2";

interface CreateIntegrationProps {
  onClose?: () => void;
}

/**
 * CreateIntegration component that handles the multi-step form for creating a new integration.
 * The component uses a step-based approach, where the user navigates through two different forms
 * (`IntegrationForm1` and `IntegrationForm2`) by clicking the "Next" and "Previous" buttons.
 *
 * @component
 * @example
 * <CreateIntegration onClose={handleClose} />
 *
 * @param {Object} props - The props for the component.
 * @param {Function} props.onClose - A function that handles closing the modal.
 *
 * @returns {JSX.Element} The rendered CreateIntegration component, which displays a step-based form for integration creation.
 */

const CreateIntegration: FC<CreateIntegrationProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  return (
    <>
      {step === 1 && <IntegrationForm1 onNext={nextStep} onClose={onClose} />}
      {step === 2 && <IntegrationForm2 onPrevious={previousStep} />}
    </>
  );
};

export default CreateIntegration;
