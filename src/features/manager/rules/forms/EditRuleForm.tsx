import { FC, useEffect, useState } from "react";
import { useForm, useFieldArray, Path } from "react-hook-form";
import { editRule } from "../../../../services/managerServices";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../../context/AppContext";
import { useQueryClient } from "@tanstack/react-query";
import { FiMinus, FiPlus } from "react-icons/fi";
import PrimaryButton from "../../../../ui/utils/PrimaryButton";
import { useRule } from "../RuleContext";
import Node from "./Node";
import { NodeData } from "../RuleContext";

const renderFlowOperatorInput = (
  flowOperatorType: string,
  flowOperatorValue: string | number,
  setFlowOperatorValue: (value: string | number) => void
) => {
  switch (flowOperatorType) {
    case "salience":
      return (
        <input
          type="number"
          value={flowOperatorValue}
          min={100}
          onChange={(e) => setFlowOperatorValue(Number(e.target.value))}
          required
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 mt-4"
          placeholder="Enter Salience Value"
        />
      );
    case "activationGroup":
      return (
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
      );
    case "agendaGroup":
      return (
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
      );
    default:
      return null;
  }
};

interface EditRuleFormProps {
  tenantId: string;
  ruleId: string;
  rule: EditRuleProp;
  onClose?: () => void;
  onPrevious?: () => void;
}

const EditRuleForm: FC<EditRuleFormProps> = ({
  tenantId,
  ruleId,
  rule,
  onClose,
}) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { role } = useAppContext();
  const { root, initialize, getData } = useRule()

  const { control, register, handleSubmit, reset, setValue } =
    useForm<EditRuleProp>({
      defaultValues: {
        name: "",
        description: "",
        conditions: { condition: "And", rules: [] },
        actions: [{ target: "", property: "Allow", value: "" }],
        properties: {},
      },
    });

  const {
    fields: actionFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "actions",
  });

  const [targetOptions] = useState([
    "Print",
    "Transaction",
    "User",
    "Application",
  ]);

  const [selectedFlowOperator, setSelectedFlowOperator] =
    useState<string>("salience");
  const [flowOperatorValue, setFlowOperatorValue] = useState<string | number>(
    100
  );

  useEffect(() => {
    if (rule) {
      reset({
        name: rule.name,
        description: rule.description,
        actions: rule.actions || [{ target: "", property: "", value: "" }],
        properties: rule.properties || {},
      });
  
      const flowOperator = Object.keys(rule.properties).find((key) =>
        ["salience", "activationGroup", "agendaGroup"].includes(key)
      );
  
      if (flowOperator && flowOperator !== selectedFlowOperator) {
        setSelectedFlowOperator(flowOperator);
        setFlowOperatorValue(rule.properties[flowOperator]);
      }
  
      initialize(rule.conditions);
    }
  }, []);
  
  const handleFlowOperatorChange = (type: string) => {
    setSelectedFlowOperator(type);
    setValue("properties", {
      [type]: type === "salience" ? 100 : "",
    });
    setFlowOperatorValue(type === "salience" ? 100 : "");
  };

  const transformConditions = (map: Map<number, NodeData>): EditRuleProp["conditions"] => {
    const buildTree = (id: number): any => {
      const node = map.get(id);
      if (!node) {
        throw new Error(`Node with ID ${id} not found`);
      }

      if (node.isLeaf) {
        return {
          field: node.left,
          operator: node.operator,
          value: node.right,
        };
      }

      return {
        condition: node.condition,
        rules: node.children.map(buildTree),
      };
    };

    return buildTree(root());
  };
  const onSubmit = async (formData: EditRuleProp) => {
    try {
      const conditions = transformConditions(getData()); 
      const updatedRule = { ...formData, conditions };
      await editRule(tenantId, ruleId, updatedRule);
      toast.success("Rule updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["rules", tenantId] });
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
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Edit Rule</h2>
      </div>
      <div className="">
        <label className="block text-gray-700 text-xl font-medium mb-1">
          Rule Name
        </label>
        <input
          {...register("name")}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-gray-700 text-xl font-medium mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md focus:outline-none focus:border-blue-500 h-[80px] min-h-[80px] max-h-[120px] overflow-y-auto"
        />
      </div>

      {/* Conditions Section */}
      <div>
        <h3 className="text-xl font-medium mb-4">Conditions</h3>
        <Node id={root()} />
      </div>

      {/* Actions Section */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-medium">Actions</h3>
          <PrimaryButton
            onClick={() => append({ target: "", property: "", value: "" })}
          >
            <FiPlus /> Add Action
          </PrimaryButton>
        </div>
        {actionFields.map((action, index) => (
          <div
            key={action.id}
            className="md:w-2/3 p-4 border bg-gray-100 rounded-md mb-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <select
                {...register(`actions.${index}.target` as Path<EditRuleProp>)}
                className="text-lg px-4 py-2 border rounded"
              >
                <option value="" disabled>
                  Select Target
                </option>
                {targetOptions.map((target) => (
                  <option key={target} value={target}>
                    {target}
                  </option>
                ))}
              </select>
              <div className="flex justify-between items-center">
                <input
                  {...register(`actions.${index}.value` as Path<EditRuleProp>)}
                  placeholder="Enter Value"
                  className="flex-1 px-4 py-2 border rounded"
                />
                <FiMinus
                  className="cursor-pointer text-red-500"
                  onClick={() => remove(index)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Flow Operators */}
      <div>
        <label className="block text-gray-700 text-xl font-medium mb-1">
          Flow Operators
        </label>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="flowOperator"
                value="salience"
                checked={selectedFlowOperator === "salience"}
                onChange={() => handleFlowOperatorChange("salience")}
              />
              Salience
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="flowOperator"
                value="activationGroup"
                checked={selectedFlowOperator === "activationGroup"}
                onChange={() => handleFlowOperatorChange("activationGroup")}
              />
              Activation Group
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="flowOperator"
                value="agendaGroup"
                checked={selectedFlowOperator === "agendaGroup"}
                onChange={() => handleFlowOperatorChange("agendaGroup")}
              />
              Agenda Group
            </label>
          </div>
          {renderFlowOperatorInput(
            selectedFlowOperator,
            flowOperatorValue,
            setFlowOperatorValue
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-center md:justify-end mt-6 gap-4">
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
