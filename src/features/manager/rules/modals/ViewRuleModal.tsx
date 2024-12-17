import React, { useState} from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../ui/utils/Spinner";
import { getRuleById } from "../../../../services/managerServices";
import ViewRuleForm from "../forms/ViewRuleForm";
import EditRuleForm from "../forms/EditRuleForm";
import { useAppContext } from "../../../../context/AppContext";

interface ViewRuleModalProps {
  onClose?: () => void;
  onPrevious?: () => void;
  ruleId: string; // Receive the ruleId to fetch details
}

const ViewRuleModal: React.FC<ViewRuleModalProps> = ({ onClose, ruleId }) => {
  const { tenant } = useAppContext() 
  
  const [step, setStep] = useState(1);

  const { data: rule, isLoading, error } = useQuery({
    queryKey: ["rule", tenant, ruleId],
    queryFn: () => getRuleById(tenant, ruleId),
    staleTime: 0,
    enabled: !!ruleId, // Ensure the query only runs if ruleId exists
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

  // console.log(ruleId);
  

  return (
    <>
      {step === 1 && <ViewRuleForm onNext={nextStep} onClose={onClose} rule={rule?.data} />}
      {step === 2 && <EditRuleForm onPrevious={previousStep} onClose={onClose} ruleId={ruleId} tenantId={tenant} rule={rule?.data}/>}
    </>
  );
};

export default ViewRuleModal;
