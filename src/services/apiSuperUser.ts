import URL from "../db/url";
import { StatData } from "../features/super-user/dashboard/Stats";
import { TenantData } from "../features/super-user/tenants/TenantContext";
// import { Tenant } from "../features/super-user/tenants/TenantRow";

// ********** DASHBOARD ***********
export async function getUserTrends() {
  try {
    const res = await URL.get(
      "/analytics/trends/user?startDate=2024-01-01&endDate=2024-12-01&intervalUnit=month"
    );
    // console.log(res.data.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// ********* SUMMARY (DASHBOARD) *********
export const getSummary = async (): Promise<StatData[]> => {
  try {
    const res = await URL.get(
      "/analytics/summary?metrics=Total_Tenants&metrics=Total_Active_Admins&metrics=Total_Admins&metrics=Average_Admin_Created_Per_Day"
    );
    // console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching summary");
  }
};

// ******* ADMINS **************
export async function getAdmins(page: number = 1) {
  try {
    const res = await URL.get(`/users?page=${page}`);

    // console.log(admins.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Admin could not be fetched");
  }
}

export async function getAdminsModal() {
  try {
    const res = await URL.get(`/users`);

    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Admin could not be fetched");
  }
}

export async function deleteAdmin(id: string) {
  try {
    const { data } = await URL.delete(`/users/${id}`);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Admin could not be deleted");
  }
}

//*********** TENANTS **************/
export async function getTenants(page: number) {
  try {
    const tenants = await URL.get(`/tenants?page=${page}`);

    return tenants.data;
  } catch (error) {
    console.log(error);
    throw new Error("Tenants could not be fetched");
  }
}

export async function createTenant(newTenant: TenantData) {
  try {
    await URL.post("/tenants", newTenant);
  } catch (error) {
    console.log(error);
    throw new Error("Tenant could not be created");
  }
}

export async function deleteTenant(tenant: string) {
  try {
    const data = await URL.delete(`/tenants/${tenant}`);
    // console.log(data);

    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Tenant could not be deleted");
  }
}

// ********** REPORTS ***************
export async function getReports() {
  try {
    const res = await URL.get(`/reports/tenant_reports`);

    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching reports");
  }
}

// ********* AUDIT & COMPLIANCE *********
export async function getAudit(page: number) {
  try {
    const res = await URL.get(`/reports/audit_logs?page=${page}`);

    // console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching reports");
  }
}

//********* SETTINGS ******* */
export async function getProfile() {
  try {
    const res = await URL.get("/users/account/me");

    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching reports");
  }
}

type UpdateProfileData = {
  [key: string]: string;
};

export async function updateProfile(data: UpdateProfileData): Promise<void> {
  try {
    const res = await URL.patch("/users/account/me", data);
    // return
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching reports");
  }
}
