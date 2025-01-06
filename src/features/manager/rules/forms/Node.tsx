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

type NodeProps = {
  id: number;
  parentId?: number;
};

const Node: React.FC<NodeProps> = ({ id, parentId}) => {
  const { getNode, createRule, createRuleSet, updateNode, deleteNode } = useRule();
  const node = getNode(id);

  const [selectedType, setSelectedType] = useState<string>("text");
  // const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [variables, setVariables] = useState<Variable[]>([]);
    const { tenant } = useAppContext();

  useEffect(() => {
    const fetchVariables = async () => {
      try {
        const result = await getVariables(tenant);        
        setVariables(result?.data); 
        setLoading(false);
      } catch (err) {
        console.error(err);
        // setError("Failed to load variables");
        // setLoading(false);
      }
    };

    fetchVariables();
  }, []);
  

  // Always calculate variable options, even if node is missing
  const variableOptions = useMemo(() => {
    return variables.flatMap((variable) => {
      if (
        variable.type.schema.type === "object" &&
        variable.type.schema.properties // Ensure properties exist
      ) {
        return Object.keys(variable.type.schema.properties).map((property) => ({
          value: `${variable.name}.${property}`,
          schemaType: variable.type.schema.properties![property].type, // Property type
        }));
      }
      return { value: variable.name, schemaType: variable.type.schema.type };
    });
  }, [variables]);

  const handleVariableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = variableOptions.find((opt) => opt.value === selectedValue);
  
    // Update the schema type for the selected variable/property
    if (selectedOption) {
      setSelectedType(mapSchemaTypeToInputType(selectedOption.schemaType, selectedValue));
    }
    updateNode(id, { left: selectedValue });
  };
  

  const mapSchemaTypeToInputType = (schemaType: string, fieldName: string): string => {
    switch (schemaType) {
      case "float":
        return "number";
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
  
  console.log(selectedType);
  

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (parentId !== undefined) {
      deleteNode(id, parentId);
    } else {
      toast.error("Cannot delete root node!");
    }
  };

  if (!node) {
    return <div>Error: Node not found</div>;
  }

  if (node.isLeaf) {
    return (
      <div className="flex gap-2 mb-2">
        {/* Variable Selection */}
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

        {/* Operator Selection */}
        <select
          value={node.operator}
          onChange={(e) => updateNode(id, { operator: e.target.value })}
          className="min-w-12 p-1 border rounded"
        >
          <option value="">Select Operator</option>
          <option value="=">{"="}</option>
          <option value=">">{">"}</option>
          <option value="<">{"<"}</option>
          <option value=">=">{">="}</option>
          <option value="<=">{"<="}</option>
          <option value="!=">{"!="}</option>
          <option value="in">in</option>
          <option value="is null">is null</option>
        </select>

        {/* Value Input */}
        <input
          type={selectedType} // Dynamically set the input type
          value={node.right}
          onChange={(e) => updateNode(id, { right: e.target.value })}
          placeholder={`Enter ${selectedType} value`}
          className="p-1 border rounded"
        />

        {/* Delete Button */}
        <button
          type="button"
          onClick={handleDelete}
          className="p-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white"
        >
          Delete
        </button>
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
                className={`p-1 border rounded ${
                  node.condition === condition ? "bg-gray-300" : ""
                }`}
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
            <Node key={childId} id={childId} parentId={id}/>
          ))}
        </div>
      </div>
    );
  }
};

export default Node;
