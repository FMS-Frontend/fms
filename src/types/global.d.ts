import { ReactNode } from "react";
export {};

declare global {
  // 🔹 Common Types
  type Return = "string" | "number" | "boolean";

  // 🔹 Expression Types
  type Expression = Literal | Variable | FunctionCall | Operation | EmptyExpression;
  type ExtendedExpression = Expression | EmptyExpression;

  type Literal = {
    type: "literal";
    value: string | number | boolean;
    return: Return;
  };

  type Variable = {
    type: "variable";
    name: string;
    return: Return;
  };

  type FunctionCall = {
    type: "function";
    name: string;
    args: Expression[];
    return: Return;
  };

  type Operation = {
    type: "operation";
    operator: string;
    operands: Expression[];
    return?: Return;
  };

  type EmptyExpression = {
    type: "empty";
  };

  type ExpressionNodeProp = {
    exp: ExtendedExpression;
    onUpdate?: (newExp: Expression) => void;
    onDelete: () => void;
    path?: number[];
    editable?: boolean;
  };

  type EmptyExpressionNodeProp = {
    onUpdate: (newExp: Expression) => void;
  };

  // 🔹 Dashboard/Stats Types
  interface StatProp {
    icon: ReactNode;
    title: string;
    value: string | number;
    color: "red" | "green" | "blue" | "yellow";
  }

  interface StatData {
    icon: ReactNode;
    title: string;
    caseValue: string | number;
    color: string;
    isGain: boolean;
    text: string;
    percent: number;
  }

  // 🔹 Admin Tables
  interface Admin {
    id: string;
    name: string;
    role: string;
    email: string;
    mobile: string;
    tenant?: {
      name: string;
    };
    status: "Active" | "Pending" | "Deactivated";
  }

  interface Tenant {
    id: string;
    userName: string;
    name: string;
    admin: { id: string; name: string };
    createdAt: string;
    address?: string;
    description?: string;
    status: "Active" | "Pending" | "Deactivated";
  }

  interface TenantData {
    name: string;
    address: string;
    description: string;
    contactPersonEmail: string;
    contactPersonName: string;
    contactPersonMobile: string;
  }

  interface Organization {
    id: string;
    name: string;
    admin: {
      name: string;
      mobile: string;
      email: string;
    };
    status: string;
  }

  // 🔹 Audits
  interface Author {
    id: string;
    name: string;
    tenant: {
      name: string;
      id: string;
    };
  }

  interface Audit {
    id: string;
    operation: string;
    ipAddress: string;
    updatedAt: string;
    author: Author;
  }

  interface AdminAudit {
    id: string;
    operation: string;
    ipAddress: string;
    updatedAt: string;
    author: {
      id: string;
      name: string;
      role: string;
      subRole: {
        name: string;
        id: string;
      };
    };
  }

  // 🔹 Users
  interface User {
    id: string;
    name: string;
    role: string;
    subRole: {
      name: string;
      id: string;
    };
    email: string;
    mobile: string;
    status: string;
    address?: string;
    description?: string;
  }

  interface CreateUserFormData {
    id: string;
    name: string;
    email: string;
    mobile: string;
    address: string;
    description: string;
    roleId?: string;
  }

  type UpdateProfileData = {
    [key: string]: string;
  };

  // 🔹 Reports
  interface AdminReport {
    id: string;
    updatedAt: string;
    comment: string;
    status: "Active" | "Pending" | "Deactivated";
    author: {
      id: string;
      name: string;
    };
  }

  interface Reports {
    id: string;
    createdAt: string;
    updatedAt: string;
    tenantName: string;
    comment: string;
    status: "Active" | "Pending" | "Deactivated";
  }

  // 🔹 Alerts
  interface Alert {
    id: string;
    type: string;
    status: string;
    severity: string;
    timestamp: string;
    actions?: string;
  }

  // 🔹 Rules
  interface Rule {
    id: string;
    rule_name: string;
    updatedAt: string;
    createdAt: string;
    status: "Active" | "Pending" | "Deactivated";
  }

  interface Rule1 {
    id: string;
    name: string;
    status: "Active" | "Inactive";
    assignedTo?: {
      image: string;
      name: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  interface Rule2 {
    id: string;
    rule_name: string;
    last_modified_date?: string;
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

  interface Rule3 {
    name: string;
    description: string;
    conditions: Condition[];
    actions: Action[];
  }

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
    salience: string | number;
  }

  interface CreatedBy {
    id: string;
    name: string;
  }

  interface RuleData {
    rule_name: string;
    description: string;
    conditions: Condition[];
    actions: Action[];
    flow_operators: FlowOperators;
  }

  interface RuleUpdateData extends RuleData {}

  interface RuleAction extends Action {}

  interface RuleProperties {
    salience?: number;
    activationGroup?: string;
    agendaGroup?: string;
  }

  interface RuleCreationRequest {
    name: string;
    description: string;
    conditions: ExtendedExpression;
    actions: RuleAction[];
  }

  interface EditRuleProp {
    name: string;
    description: string;
    actions: RuleAction[];
    properties?: RuleProperties;
    conditions: ExtendedExpression;
  }

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
    conditions: ExtendedExpression;
    actions: RuleAction[];
    properties: Record<string, string | number>;
    historyLogs: any[];
  }

  interface RuleTableRowProps {
    ruleId: string;
    ruleName: string;
    status: "Active" | "Inactive";
    assignedTo?: {
      image: string;
      name: string;
    };
    lastModified: string;
    index: number;
  }

  interface DeleteRuleProps {
    ruleId: string;
    tenantId: string;
  }

  interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      totalItems: number;
      pageSize: number;
      currentPage: number;
      totalPages: number;
    };
  }

  // 🔹 Cases
  interface Case {
    id: string;
    priority: "Low" | "High" | "Medium";
    status: "Open" | "Closed" | "All";
    assignee: {
      id: string;
      name: string;
    };
    updatedAt: string;
    createdAt: string;
  }

  interface PaginationCase {
    pageSize: number;
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }

  interface CaseData {
    data: Case[];
    pagination: PaginationCase;
  }

  interface CaseDetails extends Case {
    code: number;
    description: string;
    assignedTo: string;
  }

  interface CaseDetailsAll extends CaseDetails {
    comments: Array<{
      id: string;
      caseId: string;
      userId: string;
      comment: string;
      createdAt: string;
      updatedAt: string;
      author: {
        id: string;
        name: string;
      };
    }>;
    alerts: Array<{
      id: string;
      caseId: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      author: {
        id: string;
        name: string;
      };
    }>;
    actions: Array<{
      id: string;
      caseId: string;
      userId: string;
      description: string;
      createdAt: string;
      updatedAt: string;
      author: {
        id: string;
        name: string;
      };
    }>;
  }

  interface CaseMgtOperationsProps {
    assignedTo: string;
    selectedStatus: string;
    onAssignedToChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onDateChange: (newDateRange: { startDate: Date; endDate: Date }) => void;
  }

  interface CasesTableRowProps {
    id: string;
    priority: "Low" | "High" | "Medium";
    status: "Open" | "Closed" | "All";
    assignee: { id: string; name: string };
    updatedAt: string;
    index: number;
  }

  interface CaseWithActions extends CaseDetails {
    actions: Array<{
      id: string;
      description: string;
      createdAt: string;
      author: {
        id: string;
        name: string;
      };
    }>;
  }
  interface Assignee {
    id: string;
    name: string;
  }

  interface priorityDataProps {
    id: number;
    alertType: "Login" | "Logout" | "Edit" | "Update" | "Create" | "Delete";
    timeStamp: string;
    status: "Active" | "Unassigned" | "Deactivated";
  }

  interface RecentProp {
    id: number;
    cases: string;
    user: {
      image: string;
      name: string;
    };
    date: string;
  }
}
