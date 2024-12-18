// import React, { useState } from "react";
// import ReopenCaseForm from "../forms/ReopenCaseForm";
// // import CreateTenantForm from "./CreateTenantForm";
// // import TenantInfo from "./TenantInfo";
// // import TenantCheckboxes from "./TenantCheckboxes";

// /**
//  * TenantModal component for managing the multi-step process of setting up a new tenant.
//  * It allows the user to go through a series of steps: creating tenant details, viewing tenant info, and configuring tenant options.
//  *
//  * The modal component controls the flow of the setup process, providing navigation between steps (Next/Previous).
//  *
//  * @component 
//  * @example
//  * <TenantModal onClose={handleClose} />
//  *
//  * @param {Object} props - Component props
//  * @param {Function} props.onClose - Callback function to close the modal (typically passed from a parent component)
//  *
//  * @returns {JSX.Element} The rendered TenantModal component, containing a multi-step form.
//  */

// interface TenantModalProps {
//   onClose?: () => void;
//   caseId: string;
// }

// const ReopenCaseModal: React.FC<TenantModalProps> = ({ onClose, caseId }) => {
//   const [step, setStep] = useState(1);

//   const nextStep = () => setStep((prev) => prev + 1);
//   // const previousStep = () => setStep((prev) => prev - 1);

//   return (
//     <>
//       {step === 1 && <ReopenCaseForm onNext={nextStep} onClose={onClose} caseId={caseId} data={} />}
//       {/* {step === 2 && <TenantInfo onPrevious={previousStep} onNext={nextStep} />}
//       {step === 3 && <TenantCheckboxes onClose={onClose} />} */}
//     </>
//   );
// };

// export default ReopenCaseModal;


import React, { useState } from "react";
import ReopenCaseForm from "../forms/ReopenCaseForm";
import { useAppContext } from "../../../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getCase } from "../../../../services/managerServices";
import SpinnerMini from "../../../../ui/utils/SpinnerMini";


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
  caseId: string;
  onClose?: () => void;
}

const ReopenCaseModal: React.FC<TenantModalProps> = ({ onClose, caseId }) => {
  const [step, setStep] = useState(1);
  const { tenant } = useAppContext();

  // Fetch rule details
  const { data, isLoading, error } = useQuery({
    queryKey: ["case", tenant],
    queryFn: () => getCase(tenant, caseId),
    enabled: !!caseId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <SpinnerMini />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Failed to load rule details. Please try again later.
      </div>
    );
  }
  

  const nextStep = () => setStep((prev) => prev + 1);
  // const previousStep = () => setStep((prev) => prev - 1);

  console.log(data?.data);
  
  return (
    <>
      {step === 1 && (
        <ReopenCaseForm
          onNext={nextStep}
          tenantId={tenant}
          caseId={caseId}
          caseDetails={data?.data}
          onClose={onClose}
        />
      )}
      {/* {step === 2 && <TenantInfo onPrevious={previousStep} onNext={nextStep} />}
      {step === 3 && <TenantCheckboxes onClose={onClose} />} */}
    </>
  );
};

export default ReopenCaseModal;
