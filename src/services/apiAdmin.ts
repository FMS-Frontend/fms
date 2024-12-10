import URL from "../db/url";

// ******** USERS **********
export async function getUsers(tenant: string | null) {
  try {
    const res = await URL.get(`/users/tenants/${tenant}`);
    // ?page=${page} , page?: number

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
    throw new Error("Tenants could not be created");
  }
}

// DELETE USER
export async function deleteUser(tenant: string | null, id: string) {
  try {
    const res = await URL.delete(`/users/tenants/${tenant}/${id}`);

    return res;
  } catch (error) {
    console.log(error);
    throw new Error("Tenants could not be deleted");
  }
}
