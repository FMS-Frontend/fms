import { FC } from "react";
import { formatRuleDate } from "../../../../ui/utils/helpers";

interface ViewRuleProp {
  id: string; 
  name: string;
  status: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string; 
  author: {
    id: string;
    name: string;
  };
  conditions: {
    condition: "And" | "Or"; 
    rules: Array<
      | {
          field: string; 
          operator: string;
          value: string;
        }
      | ViewRuleProp["conditions"] 
    >;
  };
  actions: Array<{
    target: string;
    property: string; 
    value: string; 
  }>;
  properties: {
    [key: string]: string | number;
  };
  historyLogs: Array<any>; 
}


export interface ViewRuleFormProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  rule?: ViewRuleProp;
}

const ViewRuleForm: FC<ViewRuleFormProps> = ({ onNext, onClose, rule }) => {
 
  const renderNestedConditions = (conditions: ViewRuleProp["conditions"]) => (
    <ul className="list-disc pl-6">
      {conditions.rules.map((rule, index) => (
        <li key={index} className="text-lg">
          {"condition" in rule && "rules" in rule ? (
            // Nested condition
            <div>
              <strong>Condition:</strong> {rule.condition}
              {renderNestedConditions(rule)}
            </div>
          ) : (
            // Leaf condition (field, operator, value)
            <div>
              <strong>Field:</strong> {rule.field}, 
              <strong> Operator:</strong> {rule.operator}, 
              <strong> Value:</strong> {rule.value}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
  
  const renderProperties = (properties: ViewRuleProp["properties"]) => (
    <ul className="list-disc pl-6">
      {Object.entries(properties).map(([key, value]) => (
        <li key={key} className="text-lg">
          <strong>{key}:</strong> {value}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">
          <b>Rule</b>-R{rule?.id.slice(0, 4)}
        </h2>
      </div>
      <form className="flex flex-col gap-6 overflow-auto">
        {/* Rule ID */}
        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Rule ID
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">R{rule?.id.slice(0, 4)}</p>
        </div>

        {/* Rule Name */}
        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Rule Name
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">{rule?.name}</p>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Status
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">{rule?.status}</p>
        </div>

        {/* Last Modified */}
        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Last Modified
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">
            {rule && formatRuleDate(rule.updatedAt)}
          </p>
        </div>

        {/* Rule Details */}
        <h3 className="font-bold">Rule Details</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <p className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md h-[80px] min-h-[80px] max-h-[120px] overflow-y-auto">
            {rule?.description}
          </p>
        </div>

        {/* Conditions */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Conditions
          </label>
          {rule?.conditions ? renderNestedConditions(rule.conditions) : <p>No conditions found.</p>}
        </div>

        {/* Actions */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Actions
          </label>
          <ul className="list-disc pl-6">
            {rule?.actions.map((action, index) => (
              <li key={index} className="text-lg">
                <strong>Target:</strong> {action.target}, 
                <strong> Property:</strong> {action.property}, 
                <strong> Value:</strong> {action.value}
              </li>
            ))}
          </ul>
        </div>

        {/* Properties */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Properties
          </label>
          {rule?.properties ? renderProperties(rule.properties) : <p>No properties found.</p>}
        </div>

        {/* Created By */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Created By
          </label>
          <p className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3">
            {rule?.author?.name}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center md:justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>
          <button
            type="button"
            onClick={onNext}
            className="w-44 text-xl px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Rule
          </button>
        </div>
      </form>
    </>
  );
};

export default ViewRuleForm;
