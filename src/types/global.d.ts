import { ReactNode } from "react";
export {};

declare global {
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

  // Admin Table
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
    admin: {id: string; name: string};
    createdAt: string;
    address?: string;
    description?: string;
    status: "Active" | "Pending" | "Deactivated";
  }
interface  TenantData {
    name: string;
    address: string;
    description: string;
    contactPersonEmail: string;
    contactPersonName: string;
    contactPersonMobile: string;
  }

  // DashboardTable Tenants (Organization)
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

  // AUDIT TABLE*********
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
  

  // ********** ADMIN (USER) *******************************************************
  // User Table
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

  

  // Reports Table
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

  // ========= ALERTS =================
  interface Alert {
    id: string;
    type: string;
    status: string;
    severity: string;
    timestamp: string;
    actions?: string;
  }

  interface AlertDetails {
    id: string;
    code: number;
    transactionId: string;
    severity: string;
    timestamp: string;
    status: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
  

  // ========= RULES =================
  // Rule Table
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

  interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      totalItems: number;
      pageSize: number;
      currentPage: number;
      totalPages: number;
    };
  }
  interface RuleCreationRequest { 
    name: string;
    description: string;
    conditions: Array<{
      field: string;
      operator: string;
      value: string;
    }>;
    actions: Array<{
      target: string;
      property: string;
      value: string;
    }>;
    properties: {
      [key: string]: string | number;
    };
  }
  
  interface RuleData {
  rule_name: string;
  description: string;
  conditions: Array<{
    field: string;
    operator: string;
    value: string;
  }>;
  actions: Array<{
    target: string;
    property: string;
    value: string;
  }>;
  flow_operators: {
    salience: number;
  };
}
interface EditRuleProp {
  name: string;
  description: string;
  conditions: {
    condition: "And" | "Or";
    rules: Array<
      | {
          field: string;
          operator: string;
          value: string;
        }
      | EditRuleProp["conditions"]
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
}

  interface RuleUpdateData {
    rule_name: string;
    description: string;
    conditions: Array<{ field: string; operator: string; value: string }>;
    actions: Array<{ target: string; property: string; value: string }>;
    flow_operators: { salience: number };
  }

  interface RuleTableRowProps {
    ruleId: string; // R001, R002, R003, etc.
    ruleName: string; // login Check, Payment Cap, Ip Block, etc.
    status: "Active" | "Inactive";
    assignedTo?: {
      image: string;
      name: string;
    };
    lastModified: string; // 2024-06-07T11:30:00Z
    index: number;
  }
  interface Rule3 {
    name: string;
    description: string;
    conditions: Array<{ field: string; operator: string; value: string }>;
    actions: Array<{ target: string; property: string; value: string }>;
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
interface DeleteRuleProps {
  ruleId: string;
  tenantId: string;
}

  // ========= CASES =================
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

  interface Assignee {
    id: string;
    name: string;
  }
  interface CaseWithActions {
    id: string;
    code: number;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "Closed";
    description: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
    assignee?: {
      id: string;
      name: string;
    };
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
  

  interface CaseMgtOperationsProps {
    assignedTo: string;
    selectedStatus: string;
    onAssignedToChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onDateChange: (newDateRange: { startDate: Date; endDate: Date }) => void;
  }

  interface priorityDataProps {
    id: number;
    alertType: "Login" | "Logout" | "Edit" | "Update" | "Create" | "Delete";
    timeStamp: string;
    status: "Active" | "Unassigned" | "Deactivated";
  }

  interface RecentProp {
    id: number;
    priority: string;
    user: {
      image: string;
      name: string;
    };
    date: string;
  }
  interface CasesTableRowProps {
    id: string;
    priority: "Low" | "High" | "Medium";
    status: "Open" | "Closed" | "All";
    assignee: { id: string; name: string };
    updatedAt: string;
    index: number;
  }
  interface CaseDetails {
    id: string;
    code: number;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "Closed";
    description: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
    assignee?: {
      id: string;
      name: string;
    };
  }

  interface CaseDetailsAll {
    id: string;
    code: number;
    priority: "Low" | "Medium" | "High";
    status: "Open" | "Closed";
    description: string;
    assignedTo: string;
    createdAt: string;
    updatedAt: string;
    assignee?: {
      id: string;
      name: string;
    };
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
}
