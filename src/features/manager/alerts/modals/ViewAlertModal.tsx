import React, { useState } from "react";
import ViewAlertForm from "../forms/ViewAlertForm";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../../ui/utils/Spinner";
import { getAlert } from "../../../../services/managerServices";
import { useAppContext } from "../../../../context/AppContext";
import toast from "react-hot-toast";


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
  onClose?: () => void;
  onPrevious?: () => void;
  alertId: string;
}

const ViewAlertModal: React.FC<TenantModalProps> = ({ onClose, alertId }) => {
  const [step, setStep] = useState(1);
  const { tenant } = useAppContext();

  const {
    data: alertById,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["alertById", tenant, alertId],
    queryFn: async () => {
      const response = await getAlert(tenant, alertId);
      return response.data;
    },
    staleTime: 0,
    enabled: !!alertId && !!tenant,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    toast.error((error as Error).message);
    return <div className="text-red-500">{error.message}</div>;
  }

  const nextStep = () => setStep((prev) => prev + 1);

  return (
    <>
      {step === 1 && (
        <ViewAlertForm onNext={nextStep} onClose={onClose} data={alertById} />
      )}
    </>
  );
};

export default ViewAlertModal;
