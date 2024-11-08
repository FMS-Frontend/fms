import React, { useState } from "react";
import IntegrationForm1 from "./IntegrationForm1";
import IntegrationForm2 from "./IntegrationForm2";

const CreateIntegration: React.FC = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);

  return (
    <>
      {step === 1 && <IntegrationForm1 onNext={nextStep} />}
      {step === 2 && <IntegrationForm2 onPrevious={previousStep} />}
    </>
  );
};

export default CreateIntegration;
