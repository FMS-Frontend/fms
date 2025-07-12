import { FC } from "react";
import { formatRuleDate } from "../../../../ui/utils/helpers";

export interface ViewRuleFormProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  rule?: {
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
    conditions: ExtendedExpression;
    actions: Array<{
      target: string;
      property: string;
      value: string;
    }>;
    properties: {
      [key: string]: string | number;
    };
    historyLogs: Array<any>;
  };
}

const renderConditions = (expr: ExtendedExpression): JSX.Element => {
  switch (expr.type) {
    case "operation":
      return (
        <div className="mb-2 ml-4 border-l-4 border-blue-200 pl-4">
          <p className="font-semibold text-blue-700">
            Operation: <span className="text-gray-800">{expr.operator}</span>
          </p>
          <div className="ml-2 space-y-2">
            {expr.operands.map((op, idx) => (
              <div key={idx}>{renderConditions(op)}</div>
            ))}
          </div>
        </div>
      );

    case "function":
      return (
        <div className="mb-2 ml-4 border-l-4 border-green-200 pl-4">
          <p className="font-semibold text-green-700">
            Function: <span className="text-gray-800">{expr.name}</span>
          </p>
          <p className="text-sm text-gray-600">Return Type: {expr.return}</p>
          <div className="ml-2">
            <p className="font-medium">Arguments:</p>
            <ul className="list-disc list-inside">
              {expr.args.map((arg, idx) => (
                <li key={idx}>{renderConditions(arg)}</li>
              ))}
            </ul>
          </div>
        </div>
      );

    case "variable":
      return (
        <div className="ml-4 text-purple-700">
          Variable: <strong>{expr.name}</strong>{" "}
          <span className="text-sm text-gray-500">(type: {expr.return})</span>
        </div>
      );

    case "literal":
      return (
        <div className="ml-4 text-orange-700">
          Literal: <strong>{String(expr.value)}</strong>{" "}
          <span className="text-sm text-gray-500">(type: {expr.return})</span>
        </div>
      );

    case "empty":
      return <div className="ml-4 text-gray-500">Empty Expression</div>;

    default:
      return <div className="ml-4 text-red-500">Unknown Expression</div>;
  }
};


const ViewRuleForm: FC<ViewRuleFormProps> = ({ onNext, onClose, rule }) => {
  

  const renderProperties = (properties: { [key: string]: string | number }) => (
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
        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Rule ID
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">R{rule?.id.slice(0, 4)}</p>
        </div>

        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Rule Name
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">{rule?.name}</p>
        </div>

        <div className="flex justify-between items-center">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Status
          </label>
          <p className={`px-3 text-lg py-1 rounded-full ${
            rule?.status === "Active"
              ? "bg-green-100 hover:bg-green-200 text-green-500"
              : "bg-red-50 hover:bg-red-100 text-red-500"
          }`}>{rule?.status}</p>
        </div>

        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Last Modified
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">
            {rule && formatRuleDate(rule.updatedAt)}
          </p>
        </div>

        <h3 className="font-bold">Rule Details</h3>
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <p className="w-full px-4 py-2 border border-gray-300 bg-gray-50 rounded-md h-[80px] min-h-[80px] max-h-[120px] overflow-y-auto">
            {rule?.description}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Conditions
          </label>
          <div className="bg-gray-100 p-4 rounded-md border">
          {rule?.conditions ? renderConditions(rule.conditions) : <p>No conditions found.</p>}
          </div>
        </div>

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

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Properties
          </label>
          {rule?.properties ? renderProperties(rule.properties) : <p>No properties found.</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Created By
          </label>
          <p className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3">
            {rule?.author?.name}
          </p>
        </div>

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