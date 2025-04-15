// services/superUserApi.ts
import URL from "../db/url";
import { StatProps } from "../features/super-user/dashboard/Stat";
import { extractBackendError } from "../ui/utils/helpers";




// ********** DASHBOARD ***********
export async function getUserTrends() {
  try {
    const res = await URL.get("/analytics/trends/user?startDate=2025-01-01&endDate=2025-12-01&intervalUnit=month");
    return res.data;
  } catch (error) {
    // console.error("User Trends Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch user trends."));
  }
}

export const getSummary = async (): Promise<StatProps[]> => {
  try {
    const res = await URL.get("/analytics/summary?metrics=Total_Tenants&metrics=Total_Active_Admins&metrics=Total_Admins&metrics=Average_Admin_Created_Per_Day");
    return res.data.data;
  } catch (error) {
    // console.error("Summary Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch summary."));
  }
};

// ******* ADMINS **************
export async function getAdmins(page: number = 1) {
  try {
    const res = await URL.get(`/users?page=${page}`);
    return res.data;
  } catch (error) {
    // console.error("Get Admins Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch admins."));
  }
}

export async function getAdminsModal() {
  try {
    const res = await URL.get(`/users`);
    return res.data.data;
  } catch (error) {
    // console.error("Get Admins Modal Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch admin modal data."));
  }
}

export async function deleteAdmin(id: string) {
  try {
    const { data } = await URL.delete(`/users/${id}`);
    return data;
  } catch (error) {
    // console.error("Delete Admin Error:", error);
    throw new Error(extractBackendError(error, "Failed to delete admin."));
  }
}

//*********** TENANTS **************/
export async function getTenants(page: number) {
  try {
    const res = await URL.get(`/tenants?page=${page}`);
    return res.data;
  } catch (error) {
    // console.error("Get Tenants Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch tenants."));
  }
}

export async function createTenant(newTenant: TenantData) {
  try {
    await URL.post("/tenants", newTenant);
  } catch (error) {
    // console.error("Create Tenant Error:", error);
    throw new Error(extractBackendError(error, "Failed to create tenant."));
  }
}

export async function deleteTenant(tenant: string) {
  try {
    const data = await URL.delete(`/tenants/${tenant}`);
    return data;
  } catch (error) {
    // console.error("Delete Tenant Error:", error);
    throw new Error(extractBackendError(error, "Failed to delete tenant."));
  }
}

// ********** REPORTS ***************
export async function getReports() {
  try {
    const { data } = await URL.get(`/reports/tenant_reports`);
    return { reports: data.data, pagination: data.pagination };
  } catch (error) {
    // console.error("Get Reports Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch reports."));
  }
}

// ********* AUDIT & COMPLIANCE *********
export async function getAudit(page: number) {
  try {
    const res = await URL.get(`/reports/audit_logs?page=${page}`);
    return res.data;
  } catch (error) {
    // console.error("Get Audit Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch audit logs."));
  }
}

//********* SETTINGS ******* */
export async function getProfile() {
  try {
    const res = await URL.get("/users/account/me");
    return res.data.data;
  } catch (error) {
    // console.error("Get Profile Error:", error);
    throw new Error(extractBackendError(error, "Failed to fetch profile."));
  }
}

export async function updateProfile(data: UpdateProfileData): Promise<void> {
  try {
    await URL.patch("/users/account/me", data);
  } catch (error) {
    // console.error("Update Profile Error:", error);
    throw new Error(extractBackendError(error, "Failed to update profile."));
  }
}
