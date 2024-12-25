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

interface Condition {
  field: string;
  operator: string;
  value: string;
  condition?: "AND" | "OR"; // Logical operator for both main and subRules
  subRules?: Condition[];
}

interface Action {
  target: string;
  property: string;
  value: string;
}

const CreateRuleForm: FC<CreateRuleFormProps> = ({ onClose }) => {
  const [ruleName, setRuleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [conditions, setConditions] = useState<Condition[]>([
    { field: "", operator: "", value: "", condition: "AND" },
  ]);
  const [actions, setActions] = useState<Action[]>([
    {
      target: "Transaction",
      property: "Allow",
      value: "Print: Fraud detected",
    },
  ]);
  const [flowOperatorType, setFlowOperatorType] = useState<string>("salience"); 
  const [flowOperatorValue, setFlowOperatorValue] = useState<number | string>(
    ""
  ); // New state for flow operator value
  const { tenant } = useAppContext();
  const queryClient = useQueryClient();
  const handleFlowOperatorChange = (type: string) => {
    setFlowOperatorType(type);
    if (type === "salience") {
      setFlowOperatorValue(100);
    } else {
      setFlowOperatorValue("");
    }
  };

  const operatorOptions = ["==", "!=", ">", "<", ">=", "<=", "IN", "NOT IN",];
  const conditionOptions = ["AND", "OR"];
  const targetOptions = ["Print", "Transaction", "Application", "User"];

  // Adds a new condition to the conditions array
  const addCondition = () => {
    setConditions([
      ...conditions,
      { field: "", operator: "", value: "", condition: "AND" },
    ]);
  };

  // Removes a condition from the conditions array
  const removeCondition = (index: number) => {
    const updatedConditions = [...conditions];
    updatedConditions.splice(index, 1);
    setConditions(updatedConditions);
  };

  // Handles field changes for conditions
  const handleConditionChange = (
    index: number,
    field: keyof Condition,
    value: any
  ) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = value;
    setConditions(updatedConditions);
  };

  // Handles subRule changes
  const handleSubRuleChange = (
    conditionIndex: number,
    subRuleIndex: number,
    field: keyof Condition,
    value: any
  ) => {
    const updatedConditions = [...conditions];
    updatedConditions[conditionIndex].subRules![subRuleIndex][field] = value;
    setConditions(updatedConditions);
  };

  // Adds a new subRule
  const addSubRule = (index: number) => {
    const updatedConditions = [...conditions];
    if (!updatedConditions[index].subRules) {
      updatedConditions[index].subRules = [];
    }
    updatedConditions[index].subRules!.push({
      field: "",
      operator: "",
      value: "",
      condition: "AND", // Default logical operator
    });
    setConditions(updatedConditions);
  };

  // Removes a subRule
  const removeSubRule = (conditionIndex: number, subRuleIndex: number) => {
    const updatedConditions = [...conditions];
    updatedConditions[conditionIndex].subRules!.splice(subRuleIndex, 1);
    setConditions(updatedConditions);
  };

  const addAction = () => {
    setActions([
      ...actions,
      {
        target: "Print",
        property: "Allow",
        value: "",
      },
    ]);
  };

  const removeAction = (index: number) => {
    const updatedActions = [...actions];
    updatedActions.splice(index, 1);
    setActions(updatedActions);
  };

  // Handles form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const flow_operators = {
      target: flowOperatorType,
      value: flowOperatorValue,
    };

    const newRule = {
      rule_name: ruleName,
      description,
      conditions,
      actions,
      flow_operators,
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

      {/* Rule Name */}
      <div>
        <h3>Rule Name</h3>
        <input
          type="text"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
          placeholder="e.g. Frequent Transaction at odd hours"
          required
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <h3>Description</h3>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
          className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 h-[80px] min-h-[80px] max-h-[120px] overflow-y-auto"
        />
      </div>

      {/* Conditions Section */}
      <div>
        <h3>Conditions</h3>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs md:text-lg text-slate-400 font-medium">
            Click the button to add conditions
          </label>
          <PrimaryButton onClick={addCondition}>
            <FiPlus /> Condition
          </PrimaryButton>
        </div>
        {conditions.map((condition, index) => (
          <div key={index} className="p-4 border bg-gray-100 rounded-md mb-4">
            <div className="w-1/2 md:w-1/5">
              <select
                value={condition.condition || "AND"}
                onChange={(e) =>
                  handleConditionChange(index, "condition", e.target.value)
                }
                className="w-full px-4 py-2 border rounded mb-2"
              >
                {conditionOptions.map((cond) => (
                  <option key={cond} value={cond}>
                    {cond}
                  </option>
                ))}
              </select>
            </div>

            {/* Main Rule Fields */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 relative">
              <div className="w-4 border border-b-slate-300 absolute -left-[1rem] top-6"></div>
              <input
                type="text"
                value={condition.field}
                onChange={(e) =>
                  handleConditionChange(index, "field", e.target.value)
                }
                placeholder="Field"
                className="px-4 py-2 border rounded"
              />
              <select
                value={condition.operator}
                onChange={(e) =>
                  handleConditionChange(index, "operator", e.target.value)
                }
                className="text-lg px-4 py-2 border rounded"
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
                  value={condition.value}
                  onChange={(e) =>
                    handleConditionChange(index, "value", e.target.value)
                  }
                  placeholder="Value"
                  className="px-4 py-2 border rounded"
                />
                <FiMinus
                  className="cursor-pointer text-red-500"
                  onClick={() => removeCondition(index)}
                />
              </div>
            </div>

            {/* SubRules Section */}
            {condition.subRules?.map((subRule, subIndex) => (
              <div
                key={subIndex}
                className="ml-4 p-2 border-l-2 border-b-2 pt-2"
              >
                <div className="w-1/2 md:w-1/5">
                  <select
                    value={subRule.condition || "AND"}
                    onChange={(e) =>
                      handleSubRuleChange(
                        index,
                        subIndex,
                        "condition",
                        e.target.value
                      )
                    }
                    className="w-full px-4 text-lg py-2 border rounded mb-2"
                  >
                    {conditionOptions.map((cond) => (
                      <option key={cond} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid md:grid-cols-3 gap-3 relative">
                  <div className="w-[6px] border border-b-slate-300 absolute -left-[6px] top-6"></div>

                  <input
                    type="text"
                    value={subRule.field}
                    onChange={(e) =>
                      handleSubRuleChange(
                        index,
                        subIndex,
                        "field",
                        e.target.value
                      )
                    }
                    placeholder="Field"
                    className="px-4 py-2 border rounded mb-2"
                  />
                  <select
                    value={subRule.operator}
                    onChange={(e) =>
                      handleSubRuleChange(
                        index,
                        subIndex,
                        "operator",
                        e.target.value
                      )
                    }
                    className="text-lg px-4 py-2 border rounded mb-2"
                  >
                    <option value="" disabled>Select Operator</option>

                    {operatorOptions.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-between items-center">
                    <input
                      type="text"
                      value={subRule.value}
                      onChange={(e) =>
                        handleSubRuleChange(
                          index,
                          subIndex,
                          "value",
                          e.target.value
                        )
                      }
                      placeholder="Value"
                      className="px-4 py-2 border rounded"
                    />
                    <FiMinus
                      className="cursor-pointer text-red-500"
                      onClick={() => removeSubRule(index, subIndex)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2">
              <label className="block text-xs md:text-lg text-slate-400 font-medium">
                Click the button to add condition sets
              </label>
              <button
                type="button"
                onClick={() => addSubRule(index)}
                className="flex items-center text-sm md:text-lg text-blue-500"
              >
                <FiPlus /> Condition set
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Actions Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3>Actions</h3>
          <PrimaryButton onClick={addAction}>
            <FiPlus /> Action
          </PrimaryButton>
        </div>
        {actions.map((action, index) => (
          <div
            key={index}
            className="md:w-2/3 p-4 border bg-gray-100 rounded-md mb-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <select
                value={action.target}
                onChange={(e) =>
                  setActions(
                    actions.map((act, i) =>
                      i === index ? { ...act, target: e.target.value } : act
                    )
                  )
                }
                className="text-lg px-4 py-2 border rounded"
              >
                <option value="" disabled>Select Target</option>
                {targetOptions.map((target) => (
                  <option key={target} value={target}>
                    {target}
                  </option>
                ))}
              </select>
              <div className="flex justify-between items-center">
                <input
                  type="text"
                  placeholder="Value"
                  value={action.value}
                  onChange={(e) =>
                    setActions(
                      actions.map((act, i) =>
                        i === index ? { ...act, value: e.target.value } : act
                      )
                    )
                  }
                  required
                  className="px-4 py-2 border rounded"
                />
                <FiMinus
                  className="cursor-pointer text-red-500"
                  onClick={() => removeAction(index)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4">
          {/* Flow Operators */}
          <div>
            <h3>Flow Operator</h3>
            <div className="w-full md:w-2/3 my-2">
              <div className="grid md:grid-cols-3 gap-4">
                <label className="border text-lg border-slate-300 p-2 rounded-lg">
                  <input
                    type="radio"
                    name="flowOperatorType"
                    value="salience"
                    checked={flowOperatorType === "salience"}
                    onChange={(e) => handleFlowOperatorChange(e.target.value)}
                    className="mr-4"
                  />
                  Salience
                </label>
                <label className="border text-lg border-slate-300 p-2 rounded-lg">
                  <input
                    type="radio"
                    name="flowOperatorType"
                    value="activation-group"
                    checked={flowOperatorType === "activation-group"}
                    onChange={(e) => handleFlowOperatorChange(e.target.value)}
                    className="mr-4"
                  />
                  Activation Group
                </label>
                <label className="border text-lg border-slate-300 p-2 rounded-lg">
                  <input
                    type="radio"
                    name="flowOperatorType"
                    value="agenda-group"
                    checked={flowOperatorType === "agenda-group"}
                    onChange={(e) => handleFlowOperatorChange(e.target.value)}
                    className="mr-4"
                  />
                  Agenda Group
                </label>
              </div>
            </div>

            {/* Separate Conditional Rendering for Each Type */}
            {flowOperatorType === "salience" && (
              <input
                type="number"
                value={flowOperatorValue}
                min={100}
                onChange={(e) => setFlowOperatorValue(Number(e.target.value))}
                required
                className="w-full md:w-1/3 px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 mt-4"
                placeholder="Enter Salience Value"
              />
            )}

            {flowOperatorType === "activation-group" && (
              <select
                value={flowOperatorValue as string}
                onChange={(e) => setFlowOperatorValue(e.target.value)}
                required
                className="w-full md:w-1/3 text-lg px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 mt-4"
              >
                <option value="" disabled>
                  Activation Group
                </option>
                <option value="group1">Group 1</option>
                <option value="group2">Group 2</option>
                <option value="group3">Group 3</option>
              </select>
            )}

            {flowOperatorType === "agenda-group" && (
              <select
                value={flowOperatorValue as string}
                onChange={(e) => setFlowOperatorValue(e.target.value)}
                required
                className="w-full md:w-1/3 text-lg px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 mt-4"
              >
                <option value="" disabled>
                  Agenda Group
                </option>
                <option value="agenda1">Agenda 1</option>
                <option value="agenda2">Agenda 2</option>
                <option value="agenda3">Agenda 3</option>
              </select>
            )}
          </div>
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

export default CreateRuleForm;
