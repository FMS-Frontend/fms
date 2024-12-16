import  { FC, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { editRule } from "../../../../services/managerServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";

// /**
//  * CreateTenantForm component for creating a new tenant.
//  * Displays a form to collect tenant details including name, address, admin, email, and description.
//  * It includes navigation buttons to close the form or proceed to the next step.
//  *
//  * @component
//  * @example
//  * <CreateTenantForm onNext={handleNext} onClose={handleClose} />
//  *
//  * @param {Object} props - Component props
//  * @param {Function} props.onNext - Callback function to proceed to the next step (called on clicking the "Next" button)
//  * @param {Function} props.onClose - Callback function to close the form (called on clicking the "Close" button)
//  *
//  * @returns {JSX.Element} The rendered CreateTenantForm component.
//  */

export interface Rule3 {
  rule_name: string;
  description: string;
  conditions: Array<{ field: string; operator: string; value: string }>;
  actions: Array<{ target: string; property: string; value: string }>;
}

interface EditRuleFormProps {
  tenantId: string; 
  ruleId: string; 
  rule: Rule3; 
  onClose?: () => void; 
  onPrevious?: () => void;

}

const EditRuleForm: FC<EditRuleFormProps> = ({ tenantId, ruleId, rule, onClose }) => {
  const { control, register, handleSubmit, reset } = useForm<Rule3>({
    defaultValues: {
      rule_name: "",
      description: "",
      conditions: [{ field: "", operator: "", value: "" }],
      actions: [{ target: "", property: "", value: "" }],
    },
  });

  const navigate = useNavigate();
  const { role } = useAppContext();

  const { fields: conditionFields } = useFieldArray({ control, name: "conditions" });
  const { fields: actionFields } = useFieldArray({ control, name: "actions" });

  useEffect(() => {
    if (rule) {
      // Reset the form with only the editable fields
      reset({
        rule_name: rule.rule_name,
        description: rule.description,
        conditions: rule.conditions || [{ field: "", operator: "", value: "" }],
        actions: rule.actions || [{ target: "", property: "", value: "" }],
      });
    }
  }, [rule, reset]);

  const onSubmit = async (formData: Rule3) => {
    try {
      await editRule(tenantId, ruleId, formData);
      toast.success("Rule updated successfully!");
      navigate(`/${role.toLowerCase()}/rules`);
      if (onClose) onClose();
    } catch (error) {
      console.error("Error updating rule:", error);
      toast.error("Failed to update rule. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {/* Rule Name */}
      <div>
        <label className="block text-gray-700 text-xl font-medium mb-1">Rule Name</label>
        <input
          {...register("rule_name")}
          className="w-full px-4 py-2 text-2xl border rounded bg-gray-50 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 text-xl font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="w-full px-4 py-2 text-2xl border rounded bg-gray-50 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Conditions */}
      <div>
        <label className="block text-gray-700 text-xl font-medium mb-1">Conditions</label>
        {conditionFields.map((condition, index) => (
          <div key={condition.id} className="flex gap-4 mb-2">
            <input
              placeholder="Field"
              {...register(`conditions.${index}.field` as const)}
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              placeholder="Operator"
              {...register(`conditions.${index}.operator` as const)}
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              placeholder="Value"
              {...register(`conditions.${index}.value` as const)}
              className="flex-1 px-4 py-2 border rounded"
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div>
        <label className="block text-gray-700 text-xl font-medium mb-1">Actions</label>
        {actionFields.map((action, index) => (
          <div key={action.id} className="flex gap-4 mb-2">
            <input
              placeholder="Target"
              {...register(`actions.${index}.target` as const)}
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              placeholder="Property"
              {...register(`actions.${index}.property` as const)}
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              placeholder="Value"
              {...register(`actions.${index}.value` as const)}
              className="flex-1 px-4 py-2 border rounded"
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onClose}
          className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="w-44 text-xl px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default EditRuleForm;
