import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getRuleById } from "../../../../services/managerServices";
import SpinnerMini from "../../../../ui/utils/SpinnerMini";
import EditRuleForm from "../forms/EditRuleForm";
import { useAppContext } from "../../../../context/AppContext";


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


interface EditRuleModalProps {
  ruleId: string; // Rule ID to fetch and edit
  onClose?: () => void; // Callback to close the modal
}

const EditRuleModal: React.FC<EditRuleModalProps> = ({ ruleId, onClose }) => {
  const { tenant }= useAppContext()

  // console.log(tenant);
  // console.log(ruleId);
  

  // Fetch rule details
  const { data: rule, isLoading, error } = useQuery({
      queryKey: ["rule", tenant, ruleId],
      queryFn: () => getRuleById(tenant, ruleId),
      enabled: !!ruleId, 
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

  return (
    <EditRuleForm
      tenantId={tenant}
      ruleId={ruleId}
      rule={rule?.data} // Pass fetched rule data to the form
      onClose={onClose}
      onPrevious={onClose}
    />
  );
};

export default EditRuleModal;
