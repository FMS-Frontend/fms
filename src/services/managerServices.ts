import URL from "../db/url";


//*********** RULES Services **************/

/**
 * Fetch all rules for a tenant with pagination
 * @param tenantId ID of the tenant
 * @param page Current page number
 * @returns Paginated list of rules
 */
export async function getRules(
  tenantId: string,
  page: number
): Promise<PaginatedResponse<Rule1>> {
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

export async function getRuleById(tenantId: string, identity: string) {
  try {
    const response = await URL.get(`/rules/${tenantId}/${identity}`);
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
 */

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


export async function editRule(
  tenantId: string,
  identity: string,
  rule: Rule3
): Promise<Rule2> {
  try {
    const response = await URL.patch(`/rules/${tenantId}/${identity}`, rule);
    return response.data;
  } catch (error) {
    console.error("Error updating rule:", error);
    throw new Error("Rule could not be updated");
  }
}

/**
 * Delete a rule by its identity
 * @param tenantId ID of the tenant
 * @param identity Identity of the rule
 * @returns Success response
 */
export async function deleteRule(
  tenantId: string,
  identity: string
): Promise<void> {
  try {
    await URL.delete(`/rules/${tenantId}/${identity}`);
  } catch (error) {
    console.error("Error deleting rule:", error);
    throw new Error("Rule could not be deleted");
  }
}

export const getCases = async (
  tenantId: string,
  page: number): Promise<CaseData> => {
  
  try {
    const response = await URL.get(`/cases/tenants/${tenantId}`, {
      params: { page},
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cases:", error);
    throw new Error("Cases could not be fetched");
  }
};

export async function getCase(
  tenantId: string,
  identity: string,
) {
  try {
    const response = await URL.get(`/cases/tenants/${tenantId}/${identity}`, {
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching cases:", error);
    throw new Error("Cases could not be fetched");
  }
}



export const assignCase = async (
  tenantId: string,
  identity: string,
  assigneeId: string
) => {
  try {
    const response = await URL.post(`/cases/tenants/${tenantId}/${identity}/assign`, {
      assigneeId,
    });
    return response.data;
  } catch (error) {
    console.error("Error assigning case:", error);
    throw new Error("Failed to assign case.");
  }
};
export const updateCase = async (
  tenantId: string,
  identity: string,
  formData: UpdateProfileData,
) => {
  try {
    
    const response = await URL.patch(`/cases/tenants/${tenantId}/${identity}`, formData);
    return response.data;
  } catch (error) {
    console.error("Error updating case:", error);
    throw new Error("Failed to update case.");
  }
};

export const addComment = async (
  tenantId: string,
  identity: string,
  commentData: { comment: string }
) => {
  try {
    const response = await URL.post(
      `/cases/tenants/${tenantId}/${identity}/comment`,
      commentData
    );
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw new Error("Failed to add comment.");
  }
};
