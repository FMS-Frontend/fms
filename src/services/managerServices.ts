import URL from "../db/url";
// import { RuleTableRowProps } from "../features/manager/rules/RuleTableRow";
import { Rule2 } from "../features/manager/rules/forms/ViewRuleForm";

// Define the response structure for rules
export interface Rule {
  id: string;
  rule_name: string;
  status: "Active" | "Inactive";
  assignedTo: {
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

//*********** RULES Services **************/

/**
 * Fetch all rules for a tenant with pagination
 * @param tenantId ID of the tenant
 * @param page Current page number
 * @returns Paginated list of rules
 */
export async function getRules(tenantId: string, page: number): Promise<PaginatedResponse<Rule>> {
  try {
    const response = await URL.get(`/rules/${tenantId}`, {
      params: { page },
    });
    // console.log(response?.data);
    
    return response.data;
  } catch (error) {
    console.error("Error fetching rules:", error);
    throw new Error("Rules could not be fetched");
  }
}

/**
 * Fetch a single rule by its identity
 * @param tenantId ID of the tenant
 * @param identity Identity of the rule
 * @returns Rule details
 */
// import { Rule2 } from "../features/manager/rules/forms/ViewRuleForm";
export async function getRuleById(tenantId: string, identity: string){
  try {
    const response = await URL.get(`/rules/${tenantId}/${identity}}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rule by ID:", error);
    throw new Error("Rule could not be fetched");
  }
}

/**
 * Create a new rule for a tenant
 * @param tenantId ID of the tenant
 * @param newRule Rule data to create
 * @returns Created rule data
//  */
// export async function createRule(tenantId: string, newRule: RuleTableRowProps): Promise<Rule> {
//   try {
//     const response = await URL.post(`/rules/${tenantId}`, newRule);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating rule:", error);
//     throw new Error("Rule could not be created");
//   }
// }


export interface RuleCreationRequest {
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

export async function createRule(
  tenantId: string,
  newRule: RuleCreationRequest
): Promise<Rule2> {
  try {
    const response = await URL.post(`/rules/${tenantId}`, newRule);
    return response.data;
  } catch (error) {
    console.error("Error creating rule:", error);
    throw new Error("Rule could not be created");
  }
}


/**
 * Delete a rule by its identity
 * @param tenantId ID of the tenant
 * @param identity Identity of the rule
 * @returns Success response
 */
export async function deleteRule(tenantId: string, identity: string): Promise<void> {
  try {
    await URL.delete(`/rules/${tenantId}/${identity}`);
  } catch (error) {
    console.error("Error deleting rule:", error);
    throw new Error("Rule could not be deleted");
  }
}
