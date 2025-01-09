import URL from "../db/url";
export interface StatData {
  value: number; // Adjust the type based on the actual structure of your API response
}

// ****** DASHBOARD ******************
export const getAdminSummary = async (): Promise<StatData[]> => {
  try {
    const res = await URL.get(
      "/analytics/summary?metrics=Total_Tenant_User&metrics=Total_New_Users&metrics=Total_Active_Sessions&metrics=Total_Integrations"
    );

    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching summary");
  }
};

export async function getTenantChart(tenant: string | null) {
  try {
    const res = await URL.get(
      `/analytics/trends/tenants/${tenant}/user?startDate=2025-01-01&endDate=2025-12-12&intervalUnit=month`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching chart data");
  }
}

// ******** USERS **********************************
export async function getUsers(tenant: string | null, page?: number) {
  try {
    const res = await URL.get(`/users/tenants/${tenant}?page=${page}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Tenants could not be fetched");
  }
}

// CREATE USER
export async function createUser(tenant: string) {
  try {
    const res = URL.post(`/users/tenants/${tenant}`);

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("User could not be created");
  }
}

// DELETE USER
export async function deleteUser(tenant: string | null, id: string) {
  try {
    const res = await URL.delete(`/users/tenants/${tenant}/${id}`);

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("User could not be deleted");
  }
}

// Get Roles
export async function getRoles(tenant: string | null) {
  try {
    const res = await URL.get(`/tenants/${tenant}/roles`);

    // console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching roles");
  }
}

// ********* RULE *****************
export async function getRules(tenant: string | null, page?: number) {
  try {
    const res = await URL.get(`/rules/${tenant}?page=${page}`);

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching rules");
  }
}

// ********* REPORTS *****************
export async function getAdminReports(tenant: string | null, page: number) {
  try {
    const res = await URL.get(
      `/reports/tenants/${tenant}/user_reports?page=${page}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching reports");
  }
}

// ********** AUDIT & COMPLIANCE **********************
export async function getAdminAudit(tenant: string, page: number) {
  try {
    const res = await URL.get(
      `/reports/tenants/${tenant}/audit_logs?page=${page}`
    );

    // console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching Audit");
  }
}
