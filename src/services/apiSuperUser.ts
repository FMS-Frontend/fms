import URL from "../db/url";
import { TenantData } from "../features/super-user/tenants/TenantContext";
import { Tenant } from "../features/super-user/tenants/TenantRow";

export async function getAdmins() {
  try {
    const admins = await URL.get("/users");

    // console.log(admins.data.data);
    return admins.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Admin could not be fetched");
  }
}

export async function deleteAdmin(id: string) {
  try {
    const { data } = await URL.delete(`/users/${id}`);

    return data;
  } catch (error) {
    console.error(error);
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
export async function getTenants() {
  try {
    const tenants = await URL.get("/tenants");

    return tenants.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Tenants could not be fetched");
  }
}

export async function createTenant(newTenant: TenantData) {
  try {
    const res = await URL.post("/tenants", newTenant);

    console.log(res.data);
  } catch (error) {
    console.error(error);
    throw new Error("Tenant could not be created");
  }
}

export async function deleteTenant(tenant: string) {
  try {
    const data = await URL.delete(`/tenants/${tenant}`);
    console.log(data);

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Tenant could not be deleted");
  }
}
