// services/rulesCasesApi.ts
import URL from "../db/url";
import { extractBackendError } from "../ui/utils/helpers";


export async function getRules(
  tenantId: string,
  page: number
): Promise<PaginatedResponse<Rule1>> {
  try {
    const response = await URL.get(`/rules/${tenantId}?sortOrder=desc`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    // console.error("Error fetching rules:", error);
    throw new Error(extractBackendError(error, "Rules could not be fetched."));
  }
}

export async function getRuleById(tenantId: string, identity: string) {
  try {
    const response = await URL.get(`/rules/${tenantId}/${identity}`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching rule by ID:", error);
    throw new Error(extractBackendError(error, "Rule could not be fetched."));
  }
}

export async function createRule(
  tenantId: string,
  newRule: RuleCreationRequest
): Promise<Rule2> {
  try {
    const response = await URL.post(`/rules/${tenantId}`, newRule);
    return response.data;
  } catch (error) {
    // console.error("Error creating rule:", error);
    throw new Error(extractBackendError(error, "Rule could not be created."));
  }
}

export async function editRule(
  tenantId: string,
  identity: string,
  rule: EditRuleProp
) {
  try {
    const response = await URL.patch(`/rules/${tenantId}/${identity}`, rule);
    return response.data;
  } catch (error) {
    // console.error("Error updating rule:", error);
    throw new Error(extractBackendError(error, "Rule could not be updated."));
  }
}

export async function deleteRule(
  tenantId: string,
  identity: string
): Promise<void> {
  try {
    await URL.delete(`/rules/${tenantId}/${identity}`);
  } catch (error) {
    // console.error("Error deleting rule:", error);
    throw new Error(extractBackendError(error, "Rule could not be deleted."));
  }
}

export const getCases = async (
  tenantId: string,
  page: number
) => {
  try {
    const response = await URL.get(`/cases/tenants/${tenantId}`, {
      params: { page },
    });
    return response.data;
  } catch (error) {
    // console.error("Error fetching cases:", error);
    throw new Error(extractBackendError(error, "Cases could not be fetched."));
  }
};

export async function getCase(tenantId: string, identity: string) {
  try {
    const response = await URL.get(`/cases/tenants/${tenantId}/${identity}`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching case:", error);
    throw new Error(extractBackendError(error, "Case could not be fetched."));
  }
}

export const assignCase = async (
  tenantId: string,
  identity: string,
  assigneeId: string
) => {
  try {
    const response = await URL.post(
      `/cases/tenants/${tenantId}/${identity}/assign`,
      { assigneeId }
    );
    return response.data;
  } catch (error) {
    // console.error("Error assigning case:", error);
    throw new Error(extractBackendError(error, "Failed to assign case."));
  }
};

export const updateCase = async (
  tenantId: string,
  identity: string,
  formData: UpdateProfileData
) => {
  try {
    const response = await URL.patch(
      `/cases/tenants/${tenantId}/${identity}`,
      formData
    );
    return response.data;
  } catch (error) {
    // console.error("Error updating case:", error);
    throw new Error(extractBackendError(error, "Failed to update case."));
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
    // console.error("Error adding comment:", error);
    throw new Error(extractBackendError(error, "Failed to add comment."));
  }
};

export const createCase = async (
  tenantId: string,
  formData: { description: string; priority: string }
) => {
  try {
    const response = await URL.post(`/cases/tenants/${tenantId}`, formData);
    return response.data;
  } catch (error) {
    // console.error("Error creating case:", error);
    throw new Error(extractBackendError(error, "Failed to create case."));
  }
};

export const fetchCaseStats = async (tenantId: string) => {
  try {
    const response = await URL.get(`/cases/tenants/${tenantId}`);
    const cases = response.data.data;

    if (!Array.isArray(cases)) {
      throw new Error("Invalid case data");
    }

    const totalActive = cases.filter((c: any) => c.status === "Open").length;
    const totalUnassigned = cases.filter((c: any) => !c.assignee.name).length;
    const alertsAwaitingReview = cases.reduce(
      (count: number, c: any) => count + (c.alerts?.length || 0),
      0
    );
    const totalClosedThisMonth = cases.filter((c: any) => {
      const updatedDate = new Date(c.updatedAt);
      const now = new Date();
      return (
        c.status === "Closed" &&
        updatedDate.getMonth() === now.getMonth() &&
        updatedDate.getFullYear() === now.getFullYear()
      );
    }).length;

    return {
      totalActive,
      totalUnassigned,
      alertsAwaitingReview,
      totalClosedThisMonth,
    };
  } catch (error) {
    // console.error("Error fetching case stats:", error);
    throw new Error(extractBackendError(error, "Failed to fetch case stats."));
  }
};

export async function getCaseSummary(
  tenant: string,
  startDate: string = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    .toISOString()
    .split("T")[0]
): Promise<any> {
  try {
    const { data } = await URL.get(`/analytics/trends/tenants/${tenant}/case`, {
      params: { startDate },
    });
    return data;
  } catch (error) {
    throw new Error(extractBackendError(error, "Error fetching case summary"));
  }
}


export async function getVariables(tenant: string) {
  try {
    const { data } = await URL.get(`/settings/tenants/${tenant}/variables`);
    return data;
  } catch (error) {
    // console.error("Error fetching variables:", error);
    throw new Error(extractBackendError(error, "Error fetching variables"));
  }
}


// API function to fetch alerts
export const getAlerts = async (tenant: string) => {
  try {
    const res = await URL.get(`/tenants/${tenant}/alerts`);
  return res?.data;
  } catch (error) {
    throw new Error(extractBackendError(error, "Error fetching alerts"));
  }
};

export async function getAlert(tenant: string, identity: string) {
  try {
    const response = await URL.get(`/tenants/${tenant}/alerts/${identity}`);
    return response.data;
  } catch (error) {
    // console.error("Error fetching case:", error);
    throw new Error(extractBackendError(error, "Alert could not be fetched."));
  }
}

export const updateAlert = async (
  tenantId: string,
  identity: string,
  formData: {
    description: string;
    status: "Open" | "Closed";
    severity: "Low" | "Medium" | "High";
    reOpenReason?: string;
  }
) => {
  try {
    const response = await URL.patch(
      `/tenants/${tenantId}/alerts/${identity}`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(extractBackendError(error, "Failed to update alert."));
  }
};

export const logAlertAction = async (
  tenantId: string,
  alertId: string,
  formData: { description: string }
) => {
  try {
    const response = await URL.post(
      `/tenants/${tenantId}/alerts/${alertId}/log_action`,
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(extractBackendError(error, "Failed to log action."));
  }
};
