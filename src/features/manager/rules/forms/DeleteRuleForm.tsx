import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRule } from "../../../../services/managerServices";
import toast from "react-hot-toast";
import { useAppContext } from "../../../../context/AppContext";
import ConfirmDelete from "../../../../ui/utils/ConfirmDelete";

interface DeleteRuleProps {
  ruleId?: string;
  tenantId?: string;
  onClose?: () => void;
}

const DeleteRuleForm: FC<DeleteRuleProps> = ({ ruleId, onClose }) => {
  const queryClient = useQueryClient();
  const { tenant } = useAppContext();

  const mutation = useMutation({
    mutationFn: () => deleteRule(tenant, ruleId as string),
    onSuccess: () => {
      toast.success("Rule deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["rules", tenant] });
    },
    onError: (error: any) => {
      toast.error(
        error?.message || "Failed to delete the rule. Please try again."
      );
    },
  });

  const handleDelete = () => {
    mutation.mutate();
  };

  return (
    <ConfirmDelete
      resourceName={`Rule-${ruleId?.slice(0,4)}`}
      onCloseModal={onClose || (() => {})}
      onConfirm={handleDelete}
    />
  );
};

export default DeleteRuleForm;
