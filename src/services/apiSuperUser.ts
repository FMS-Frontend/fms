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
      "/analytics/summary?metrics=TotalTenants&metrics=TotalActiveAdmins&metrics=TotalAdmins&metrics=AverageAdminCreatedPerDay"
    );
    // console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching summary");
  }
};

// ******* ADMINS **************
export async function getAdmins(page: number) {
  try {
    const admins = await URL.get(`/users?page=${page}`);

    // console.log(admins.data);
    return admins.data;
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

// export async function editAdmin(id: string) {
//   try {
//     const { data } = await URL.patch(`/users/${id}`); // Use PATCH for partial updates

//     console.log(data);
//     return data; // Return the response data
//   } catch (error) {
//     console.error(error);
//     throw new Error("Admin could not be updated"); // Throw a descriptive error
//   }
// }

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

    // console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching reports");
  }
}
