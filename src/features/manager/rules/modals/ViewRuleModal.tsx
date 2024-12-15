// import React, { useState } from "react";
// import ViewRuleForm from "../forms/ViewRuleForm";
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
// }

// const ViewRuleModal: React.FC<TenantModalProps> = ({ onClose }) => {
//   const [step, setStep] = useState(1);

//   const nextStep = () => setStep((prev) => prev + 1);
//   // const previousStep = () => setStep((prev) => prev - 1);

//   return (
//     <>
//       {step === 1 && <ViewRuleForm onNext={nextStep} onClose={onClose} />}
//       {/* {step === 2 && <TenantInfo onPrevious={previousStep} onNext={nextStep} />}
//       {step === 3 && <TenantCheckboxes onClose={onClose} />} */}
//     </>
//   );
// };

// export default ViewRuleModal;


import React, { useState} from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../ui/utils/Spinner";
import { getRuleById } from "../../../../services/managerServices";
import ViewRuleForm from "../forms/ViewRuleForm";

interface ViewRuleModalProps {
  onClose?: () => void;
  ruleId: string; // Receive the ruleId to fetch details
}

const ViewRuleModal: React.FC<ViewRuleModalProps> = ({ onClose, ruleId }) => {
  const [step, setStep] = useState(1);
  const tenant = "blard"
  const { data: rule, isLoading, error } = useQuery({
    queryKey: ["rule", tenant, ruleId],
    queryFn: () => getRuleById(tenant, ruleId),
    enabled: !!ruleId, // Ensure the query only runs if ruleId exists
  });

  const nextStep = () => setStep((prev) => prev + 1);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
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

  // console.log(ruleId);
  

  return (
    <>
      {step === 1 && <ViewRuleForm onNext={nextStep} onClose={onClose} rule={rule?.data} />}
    </>
  );
};

export default ViewRuleModal;
