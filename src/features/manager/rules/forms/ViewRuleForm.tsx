
import { FC } from "react";
import { formatRuleDate } from "../../../../ui/utils/helpers";

interface Condition {
  field: string;
  operator: string;
  value: string;
}

interface Action {
  target: string;
  property: string;
  value: string;
}

interface FlowOperators {
  salience: number;
}

interface CreatedBy {
  id: string;
  name: string;
}

export interface Rule2 {
  id: string;
  rule_name: string;
  last_modified_date: string;
  status: string;
  description: string;
  conditions: Condition[];
  actions: Action[];
  flow_operators: FlowOperators;
  createdAt: string;
  updatedAt: string;
  historyLogs: any[];
  createdBy: CreatedBy;
}

export interface ViewRuleFormProps {
  onPrevious?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  rule?: Rule2; 
}

const ViewRuleForm: FC<ViewRuleFormProps> = ({ onNext, onClose, rule }) => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold"><b>Rule</b>-R{rule?.id.slice(0, 4)}</h2>
      </div>
      <form className="flex flex-col gap-6">
        <div className="">
        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            RuleId
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">R{rule?.id.slice(0, 4)}</p>
        </div>
        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Rule Name
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">{rule?.rule_name}</p>
        </div>

        <div className="flex justify-between items-center">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Status
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">{rule?.status}</p>
        </div>
        <div className="flex justify-between">
          <label className="block text-[#A6A6A6] text-xl font-medium mb-1">
            Last Modified 
          </label>
          <p className="text-gray-700 text-xl font-medium mb-1">{rule && formatRuleDate(rule.last_modified_date)}</p>
        </div>
          </div>        

        <h3 className="font-bold">Rule Details</h3>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <p className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3">{rule?.description}</p>
        </div>

        {/* Conditions */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Conditions
          </label>
          <ul className="list-disc pl-6">
            {rule?.conditions.map((condition, index) => (
              <li key={index} className="text-lg">
                <strong>Field:</strong> {condition.field}, 
                <strong> Operator:</strong> {condition.operator}, 
                <strong> Value:</strong> {condition.value}
              </li>
            ))}
          </ul>
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

        {/* Flow Operators */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Salience
          </label>
          <p className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3">{rule?.flow_operators.salience}</p>
        </div>

        {/* Created By */}
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Created By
          </label>
          <p className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3">
            {rule?.createdBy.name}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-around mt-6">
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
