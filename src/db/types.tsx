export interface Tenant {
  id: string;
  userName: string;
  name: string;
  createdAt: string;
  address?: string;
  description?: string;
  admin: {
    name: string;
  };
  status: "Active" | "Pending" | "Deactivated";
}

// DashboardTable Tenants (Organization)
export interface Organization {
  id: string;
  name: string;
  admin: {
    name: string;
    mobile: string;
    email: string;
  };
  status: string;
}
