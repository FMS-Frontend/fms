import URL from "../db/url";
import { extractBackendError } from "../ui/utils/helpers";

export interface StatData {
  value: number;
}

// ****** DASHBOARD ******************

export const getAdminSummary = async (): Promise<StatData[]> => {
  try {
    const res = await URL.get(
      "/analytics/summary?metrics=Total_Tenant_User&metrics=Total_New_Users&metrics=Total_Active_Sessions&metrics=Total_Integrations"
    );
    return res.data.data;
  } catch (error) {
    // console.error("Dashboard Summary Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch dashboard summary."));
  }
};

export async function getTenantChart(tenant: string | null) {
  try {
    const res = await URL.get(
      `/analytics/trends/tenants/${tenant}/user?startDate=2025-01-01&endDate=2025-12-12&intervalUnit=month`
    );
    return res.data;
  } catch (error) {
    // console.error("Tenant Chart Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch tenant chart data."));
  }
}

// ******** USERS **********************************

export async function getUsers(tenant: string | null, page?: number) {
  try {
    const res = await URL.get(`/users/tenants/${tenant}?page=${page}`);
    return res.data;
  } catch (error) {
    // console.error("Get Users Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch users."));
  }
}

export async function createUser(tenant: string) {
  try {
    const res = await URL.post(`/users/tenants/${tenant}`);
    return res;
  } catch (error) {
    // console.error("Create User Error:", error);
    throw new Error(extractBackendError(error, "Failed to create user."));
  }
}

export async function deleteUser(tenant: string | null, id: string) {
  try {
    const res = await URL.delete(`/users/tenants/${tenant}/${id}`);
    return res;
  } catch (error) {
    // console.error("Delete User Error:", error);
    throw new Error(extractBackendError(error, "Failed to delete user."));
  }
}

// ********* ROLES *****************

export async function getRoles(tenant: string | null) {
  try {
    const res = await URL.get(`/tenants/${tenant}/roles`);
    return res.data;
  } catch (error) {
    // console.error("Get Roles Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch roles."));
  }
}

// ********* RULES *****************

export async function getRules(tenant: string | null, page?: number) {
  try {
    const res = await URL.get(`/rules/${tenant}?page=${page}`);
    return res.data;
  } catch (error) {
    // console.error("Get Rules Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch rules."));
  }
}

// ********* REPORTS *****************

export async function getAdminReports(tenant: string | null, page: number) {
  try {
    const res = await URL.get(`/reports/tenants/${tenant}/user_reports?page=${page}`);
    return res.data;
  } catch (error) {
    // console.error("Get Reports Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch reports."));
  }
}

// ********* AUDIT & COMPLIANCE **********************

export async function getAdminAudit(tenant: string, page: number) {
  try {
    const res = await URL.get(`/reports/tenants/${tenant}/audit_logs?page=${page}`);
    return res.data;
  } catch (error) {
    // console.error("Get Audit Logs Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch audit logs."));
  }
}
