import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../../../context/AppContext";
import { createRule } from "../../../../services/managerServices";
import { useQueryClient } from "@tanstack/react-query";

export interface RuleData {
  rule_name: string;
  description: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
  actions: Array<{
    target: string;
    property: string;
    value: string;
  }>;
  flow_operators: {
    salience: number;
  };
}

interface CreateRuleFormProps {
  onClose?: () => void;
}

const CreateRuleForm: FC<CreateRuleFormProps> = ({ onClose }) => {
  const [ruleName, setRuleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [conditions, setConditions] = useState<RuleData["conditions"]>([
    { field: "", operator: "", value: "" },
  ]);
  const [actions, setActions] = useState<RuleData["actions"]>([
    { target: "", property: "", value: "" },
  ]);
  const [salience, setSalience] = useState<number>(100);
  const { tenant } = useAppContext();
  const queryClient = useQueryClient();

  const handleConditionChange = (
    index: number,
    field: keyof RuleData["conditions"][0],
    value: string
  ) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;
    setConditions(updatedConditions);
  };

  const handleActionChange = (
    index: number,
    field: keyof RuleData["actions"][0],
    value: string
  ) => {
    const updatedActions = [...actions];
    updatedActions[index][field] = value;
    setActions(updatedActions);
  };

  const addCondition = () => {
    setConditions([...conditions, { field: "", operator: "", value: "" }]);
  };

  const addAction = () => {
    setActions([...actions, { target: "", property: "", value: "" }]);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newRule: RuleData = {
      rule_name: ruleName,
      description,
      conditions,
      actions,
      flow_operators: { salience },
    };

    try {
      await createRule(tenant, newRule);
      toast.success("Rule created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["rules", tenant], // Ensure query key matches the one used for fetching rules
      });
      onClose?.();
    } catch (error) {
      console.error("Failed to create rule:", error);
      toast.error("Failed to create rule. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="block text-lg font-medium">Rule Name</label>
        <input
          type="text"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-lg font-medium">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-lg font-medium">Conditions</label>
        {conditions.map((condition, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="text"
              placeholder="Field"
              value={condition.field}
              onChange={(e) =>
                handleConditionChange(index, "field", e.target.value)
              }
              required
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Operator"
              value={condition.operator}
              onChange={(e) =>
                handleConditionChange(index, "operator", e.target.value)
              }
              required
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Value"
              value={condition.value}
              onChange={(e) =>
                handleConditionChange(index, "value", e.target.value)
              }
              required
              className="flex-1 px-4 py-2 border rounded"
            />
          </div>
        ))}
        <button type="button" onClick={addCondition} className="text-blue-500">
          + Add Condition
        </button>
      </div>

      <div>
        <label className="block text-lg font-medium">Actions</label>
        {actions.map((action, index) => (
          <div key={index} className="flex gap-4 mb-2">
            <input
              type="text"
              placeholder="Target"
              value={action.target}
              onChange={(e) =>
                handleActionChange(index, "target", e.target.value)
              }
              required
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Property"
              value={action.property}
              onChange={(e) =>
                handleActionChange(index, "property", e.target.value)
              }
              required
              className="flex-1 px-4 py-2 border rounded"
            />
            <input
              type="text"
              placeholder="Value"
              value={action.value}
              onChange={(e) =>
                handleActionChange(index, "value", e.target.value)
              }
              required
              className="flex-1 px-4 py-2 border rounded"
            />
          </div>
        ))}
        <button type="button" onClick={addAction} className="text-blue-500">
          + Add Action
        </button>
      </div>

      <div>
        <label className="block text-lg font-medium">
          Flow Operator - Salience
        </label>
        <input
          type="number"
          value={salience.toString()}
          min="100"
          onChange={(e) => setSalience(Number(e.target.value))}
          required
          className="w-full px-4 py-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Rule
      </button>
    </form>
  );
};

export default CreateRuleForm;
