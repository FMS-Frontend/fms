import React, { useState} from "react";
import ViewCaseForm from "../forms/ViewCaseForm";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../ui/utils/Spinner";
import { getCase } from "../../../../services/managerServices";
import { useAppContext } from "../../../../context/AppContext";
import UpdateCaseForm from "../forms/UpdateCaseForm";
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







interface ViewRuleModalProps {
  onClose?: () => void;
  onPrevious?: () => void;
  caseId: string; 
}

const ViewCaseModal: React.FC<ViewRuleModalProps> = ({ onClose, caseId }) => {
  const { tenant } = useAppContext() 
  
  const [step, setStep] = useState(1);

  const { data: caseById, isLoading, error } = useQuery({
    queryKey: ["caseById", tenant, caseId],
    queryFn: () => getCase(tenant, caseId),
    staleTime: 0,
    enabled: !!caseId, // Ensure the query only runs if ruleId exists
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const previousStep = () => setStep((prev) => prev - 1);


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

  console.log(caseId);
  console.log(caseById?.data);
  

  return (
    <>
      {step === 1 && <ViewCaseForm onNext={nextStep} onClose={onClose} data={caseById?.data} />}
      {step === 2 && <UpdateCaseForm onPrevious={previousStep} onClose={onClose} caseId={caseId} tenantId={tenant} caseDetails={caseById?.data} />}
      {/* {step === 2 && <EditRuleForm onPrevious={previousStep} onClose={onClose} ruleId={ruleId} tenantId={tenant} rule={rule?.data}/>} */}
    </>
  );
};

export default ViewCaseModal;

