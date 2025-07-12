import { FC, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../../../../context/AppContext";
import { createRule } from "../../../../services/managerServices";
import { useQueryClient } from "@tanstack/react-query";
import PrimaryButton from "../../../../ui/utils/PrimaryButton";
import { FiMinus, FiPlus } from "react-icons/fi";
import { ExpressionBuilder } from "../expression-builder";

interface CreateRuleFormProps {
  onClose?: () => void;
}

interface Action {
  target: string;
  property: string;
  value: string;
}

const CreateRuleForm: FC<CreateRuleFormProps> = ({ onClose }) => {
  const [ruleName, setRuleName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [actions, setActions] = useState<Action[]>([
    {
      target: "",
      property: "",
      value: "",
    },
  ]);
  const [flowOperatorType, setFlowOperatorType] = useState<string>("salience");
  const [flowOperatorValue, setFlowOperatorValue] = useState<number | string>("");
  const [expression, setExpression] = useState<ExtendedExpression>({ type: "empty" });

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

  const targetOptions = ["Print", "Transaction", "Application", "User"];

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    
    const properties = {
      [flowOperatorType]: flowOperatorValue,
    };

    const newRule = {
      name: ruleName,
      description,
      actions,
      properties,
      conditions: expression, 
    };

    // console.log("Submitting rule:", newRule);

    try {
      await createRule(tenant, newRule);
      toast.success("Rule created successfully!");
      queryClient.invalidateQueries({
        queryKey: ["rules", tenant],
      });
      onClose?.();
    } catch (error: any) {
      console.error("Failed to create rule:", error);
      const errMsg = error?.message;
      toast.error(errMsg);
    }
  };

  // console.log(expression);
  

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

      {/* Expression Builder Section */}
      <div>
        <h3 className="mb-2">Expression</h3>
        <div className="border p-4 rounded bg-gray-50">
          <ExpressionBuilder
            rootExpression={expression}
            onExpressionChange={setExpression}
          />
        </div>
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

        {/* Flow Operators */}
        <div className="mt-4">
          <h3>Flow Operator</h3>
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
                value="activationGroup"
                checked={flowOperatorType === "activationGroup"}
                onChange={(e) => handleFlowOperatorChange(e.target.value)}
                className="mr-4"
              />
              Activation Group
            </label>
            <label className="border text-lg border-slate-300 p-2 rounded-lg">
              <input
                type="radio"
                name="flowOperatorType"
                value="agendaGroup"
                checked={flowOperatorType === "agendaGroup"}
                onChange={(e) => handleFlowOperatorChange(e.target.value)}
                className="mr-4"
              />
              Agenda Group
            </label>
          </div>

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

          {flowOperatorType === "activationGroup" && (
            <select
              value={flowOperatorValue as string}
              onChange={(e) => setFlowOperatorValue(e.target.value)}
              required
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 mt-4"
            >
              <option value="" disabled>
                Select Activation Group
              </option>
              <option value="group1">Group 1</option>
              <option value="group2">Group 2</option>
              <option value="group3">Group 3</option>
            </select>
          )}

          {flowOperatorType === "agendaGroup" && (
            <select
              value={flowOperatorValue as string}
              onChange={(e) => setFlowOperatorValue(e.target.value)}
              required
              className="w-full md:w-1/3 px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 mt-4"
            >
              <option value="" disabled>
                Select Agenda Group
              </option>
              <option value="agenda1">Agenda 1</option>
              <option value="agenda2">Agenda 2</option>
              <option value="agenda3">Agenda 3</option>
            </select>
          )}
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
