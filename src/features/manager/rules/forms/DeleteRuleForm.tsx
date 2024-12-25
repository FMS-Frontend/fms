import { FC } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRule } from "../../../../services/managerServices";
import toast from "react-hot-toast";

interface DeleteRuleProps {
  ruleId?: string;
  tenantId?: string;
  onClose?: () => void;
}

const DeleteRuleForm: FC<DeleteRuleProps> = ({ ruleId, tenantId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteRule(tenantId as string, ruleId as string),
    onSuccess: () => {
      toast.success("Rule deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["rules", tenantId] }); // Pass an object with queryKey
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete the rule. Please try again.");
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      mutation.mutate();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      Delete Rule
    </button>
  );
};

export default DeleteRuleForm;
