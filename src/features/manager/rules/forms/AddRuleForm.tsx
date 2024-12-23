import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../../../context/AppContext";
import { createRule } from "../../../../services/managerServices";
import { useQueryClient } from "@tanstack/react-query";
import PrimaryButton from "../../../../ui/utils/PrimaryButton";
import { FiMinus, FiPlus } from "react-icons/fi";

interface CreateRuleFormProps {
  onClose?: () => void;
}

const AddRuleForm: FC<CreateRuleFormProps> = ({ onClose }) => {
  const [ruleName, setRuleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [conditions, setConditions] = useState<
    Array<{
      field: string;
      operator: string;
      value: string;
      conditions?: any[];
    }>
  >([{ field: "", operator: "", value: "" }]);
  const [actions, setActions] = useState<
    Array<{ target: string; property: string; value: string }>
  >([{ target: "", property: "", value: "" }]);
  const [salience, setSalience] = useState<number>(100);
  const { tenant } = useAppContext();
  const queryClient = useQueryClient();

  const operatorOptions = ["==", "!=", ">", "<", ">=", "<="];
  const actionOptions = ["Allow", "Deny", "Notify"];

  const handleConditionChange = (
    index: number,
    field: keyof (typeof conditions)[0],
    value: any
  ) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;
    setConditions(updatedConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { field: "field1", operator: "", value: "" }]);
  };

  const removeCondition = (index: number) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
  };

  const addConditionSet = () => {
    setConditions([
      ...conditions,
      { field: "", operator: "", value: "", conditions: [] },
    ]);
  };

  const handleActionChange = (
    index: number,
    field: keyof (typeof actions)[0],
    value: string
  ) => {
    const updatedActions = [...actions];
    updatedActions[index][field] = value;
    setActions(updatedActions);
  };

  const addAction = () => {
    setActions([...actions, { target: "", property: "", value: "" }]);
  };

  const removeAction = (index: number) => {
    const updatedActions = [...actions];
    updatedActions.splice(index, 1);
    setActions(updatedActions);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newRule = {
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
        queryKey: ["rules", tenant],
      });
      onClose?.();
    } catch (error) {
      console.error("Failed to create rule:", error);
      toast.error("Failed to create rule. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <h2 className="text-3xl font-semibold mb-4">Add Rule</h2>

      <div className="w-full md:w-1/3">
        <h3 className="mb-2">Rule Name</h3>
        <input
          type="text"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          placeholder="e.g. Frequent Transaction at odd hours"
          required
          className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      <div>
        <h3 className="mb-2">Description</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 h-[80px] min-h-[80px] max-h-[120px] overflow-y-auto"
        />
      </div>

      <div>
      <h3 className="">Conditions</h3>
        <div className="flex justify-between items-center">
        <label className="block text-xs md:text-lg text-slate-400 font-medium">
              Click the button to add conditions
            </label>          <div className="flex justify-between gap-4 mb-4">
            <PrimaryButton onClick={addCondition}>
              <FiPlus /> Condition
            </PrimaryButton>
            <button
              type="button"
              onClick={addConditionSet}
              className="flex items-center text-sm md:text-lg text-blue-500"
            >
              <FiPlus /> Condition Set
            </button>
          </div>
        </div>
        {conditions.map((condition, index) => (
          <div
            key={index}
            className="grid md:grid-cols-3 gap-4 p-4 border bg-gray-100 rounded-md"
          >
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
            <select
              value={condition.operator}
              onChange={(e) =>
                handleConditionChange(index, "operator", e.target.value)
              }
              className="flex-1 px-4 py-2 border rounded"
            >
              <option value="">Select Operator</option>
              {operatorOptions.map((op) => (
                <option key={op} value={op}>
                  {op}
                </option>
              ))}
            </select>
            <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Value"
              value={condition.value}
              onChange={(e) =>
                handleConditionChange(index, "value", e.target.value)
              }
              required
              className=" px-4 py-3 border rounded"
            />
            <FiMinus
              className="cursor-pointer text-red-500"
              onClick={() => removeCondition(index)}
            />
            </div>
          </div>
        ))}
      </div>

      <div className="my-2 border border-b-slate-300"></div>

      <div className="md:flex justify-between">
        <div className="w-2/3 md:w-1/2 space-y-4 ">
          <h3 className="">Actions</h3>
          <div className="flex justify-between items-center">
            <label className="block text-lg text-slate-400 font-medium">
              Click the button to add actions
            </label>
            <span
              onClick={addAction}
              className="bg-blue-500 text-white rounded-md cursor-pointer"
            >
              <FiPlus />
            </span>
          </div>
          {actions.map((action, index) => (
            <div key={index} className="flex  items-center gap-4 mb-2 border p-3 border-gray-300 bg-gray-100 rounded-md">
              <select
                value={action.target}
                onChange={(e) =>
                  handleActionChange(index, "target", e.target.value)
                }
                className="flex-1 px-4 py-2 border rounded"
              >
                <option value="">Select Action</option>
                {actionOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <FiMinus
                className="cursor-pointer text-red-500"
                onClick={() => removeAction(index)}
              />
            </div>
          ))}
        </div>

        <div className=" w-2/3 md:w-1/3 mt-4">
          <label className="block text-lg font-medium">
            Flow Operator - Salience
          </label>
          <input
            type="number"
            value={salience}
            min={100}
            onChange={(e) => setSalience(Number(e.target.value))}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Rule
        </button>
      </div>
    </form>
  );
};

export default AddRuleForm;
