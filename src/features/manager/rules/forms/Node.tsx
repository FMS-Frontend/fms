import React, { useMemo, useState, useEffect } from "react";
import { useRule } from "../RuleContext";
import toast from "react-hot-toast";
import { getVariables } from "../../../../services/managerServices";
import { useAppContext } from "../../../../context/AppContext";

type Variable = {
  name: string;
  type: {
    schema: {
      type: string;
      properties?: Record<string, { type: string }>;
    };
  };
};

const mockVariables: Variable[] = [
  {
    name: "Transaction",
    type: {
      schema: {
        type: "object",
        properties: {
          date: { type: "string" },
          amount: { type: "float" },
          currency: { type: "string" },
        },
      },
    },
  },
  {
    name: "localTransactionDate",
    type: {
      schema: {
        type: "string",
      },
    },
  },
  {
    name: "transactionAmount",
    type: {
      schema: {
        type: "float",
      },
    },
  },
];

type NodeProps = {
  id: number;
  parentId?: number;
};

const functionOptions = ["avg", "sum", "max", "min"];

const Node: React.FC<NodeProps> = ({ id, parentId }) => {
  const { getNode, createRule, createRuleSet, updateNode, deleteNode } = useRule();
  const node = getNode(id);
  const [selectedType, setSelectedType] = useState<string>("text");
  const [loading, setLoading] = useState<boolean>(false);
  const [variables, setVariables] = useState<Variable[]>([]);
  const { tenant } = useAppContext();
  const [isFunctionValue, setIsFunctionValue] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState<string>("avg");

  const useMock = false;

  useEffect(() => {
    const fetchVariables = async () => {
      setLoading(true);
      try {
        if (useMock) {
          await new Promise((res) => setTimeout(res, 300));
          setVariables(mockVariables);
        } else {
          const result = await getVariables(tenant);
          setVariables(result?.data);
        }
      } catch (err) {
        console.error("Failed to fetch variables", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariables();
  }, [useMock]);

  const variableOptions = useMemo(() => {
    return variables.flatMap((variable) => {
      if (
        variable.type.schema.type === "object" &&
        variable.type.schema.properties
      ) {
        return Object.keys(variable.type.schema.properties).map((property) => ({
          value: `${variable.name}.${property}`,
          schemaType: variable.type.schema.properties![property].type,
        }));
      }
      return { value: variable.name, schemaType: variable.type.schema.type };
    });
  }, [variables]);

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = variableOptions.find((opt) => opt.value === selectedValue);

    if (selectedOption) {
      setSelectedType(mapSchemaTypeToInputType(selectedOption.schemaType, selectedValue));
    }
    updateNode(id, { left: selectedValue });
  };

  const mapSchemaTypeToInputType = (schemaType: string, fieldName: string): string => {
    switch (schemaType) {
      case "float":
      case "double":
        return "number";
      case "date":
        return "date";
      case "string":
        return fieldName.endsWith(".date") ? "date" : "text";
      default:
        return "text";
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (parentId !== undefined) {
      deleteNode(id, parentId);
    } else {
      toast.error("Cannot delete root node!");
    }
  };

  const handleFunctionToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsFunctionValue(checked);
    if (checked) {
      // Set a default function value
      const functionValue = {
        type: "function",
        name: selectedFunction,
        arguments: [],
      };
      updateNode(id, { right: JSON.stringify(functionValue) });
    } else {
      updateNode(id, { right: "" });
    }
  };

  const handleFunctionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fn = e.target.value;
    setSelectedFunction(fn);
    updateNode(id, {
      right: JSON.stringify({
        type: "function",
        name: fn,
        arguments: [],
      }),
    });
  };

  if (!node) {
    return <div>Error: Node not found</div>;
  }

  if (node.isLeaf) {
    return (
      <div className="">
         <div className="flex items-center gap-2 text-sm mb-1">
          <input
            type="checkbox"
            checked={isFunctionValue}
            onChange={handleFunctionToggle}
          />
          Call function
        </div>
        <div className="flex gap-2 mb-2 items-center">
        <select
          value={node.left}
          onChange={handleVariableChange}
          className="min-w-32 p-1 border rounded"
        >
          <option value="">{loading ? "Loading..." : "Select Field"}</option>
          {variableOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.value}
            </option>
          ))}
        </select>

        <select
          value={node.operator}
          onChange={(e) => updateNode(id, { operator: e.target.value })}
          className="min-w-12 p-1 border rounded"
        >
          <option value="">Select Operator</option>
          <option value="=">=</option>
          <option value=">">&gt;</option>
          <option value="<">&lt;</option>
          <option value=">=">&gt;=</option>
          <option value="<=">&lt;=</option>
          <option value="!=">!=</option>
          <option value="in">in</option>
          <option value="is null">is null</option>
        </select>

        {isFunctionValue ? (
          <select
            value={selectedFunction}
            onChange={handleFunctionSelect}
            className="p-1 border rounded"
          >
            {functionOptions.map((fn) => (
              <option key={fn} value={fn}>
                {fn}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={selectedType}
            value={node.right}
            onChange={(e) => updateNode(id, { right: e.target.value })}
            placeholder={`Enter ${selectedType} value`}
            className="p-2 border rounded"
          />
        )}

        <button
          type="button"
          onClick={handleDelete}
          className="p-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
      </div>
      </div>
      
    );
  } else {
    return (
      <div className="space-y-2 border-l-2 pl-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {(["And", "Or"] as ("And" | "Or")[]).map((condition) => (
              <button
                key={condition}
                type="button"
                onClick={() => updateNode(id, { condition })}
                className={`p-1 border rounded ${node.condition === condition ? "bg-gray-300" : ""}`}
              >
                {condition}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => createRule(id)}
              className="p-1 border rounded hover:bg-gray-300"
            >
              +Rule
            </button>
            <button
              type="button"
              onClick={() => createRuleSet(id)}
              className="p-1 border rounded hover:bg-gray-300"
            >
              +RuleSet
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="p-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {node.children.map((childId) => (
            <Node key={childId} id={childId} parentId={id} />
          ))}
        </div>
      </div>
    );
  }
};

export default Node;

