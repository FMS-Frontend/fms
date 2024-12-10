// Admin Table
export interface Admin {
  id: string;
  name: string;
  role: string;
  email: string;
  mobile: string;
  tenant?: {
    name: string;
  };
  status: "Active" | "Pending" | "Deactivated";
}

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

// AUDIT TABLE*********
interface Author {
  id: string;
  name: string;
  tenant: {
    name: string;
    id: string;
  };
}
export interface Audit {
  id: string;
  operation: string;
  ipAddress: string;
  updatedAt: string;
  author: Author;
}

// ********** ADMIN (USER) **********
export interface User {
  id: string;
  name: string;
  role: string;
  email: string;
  mobile: string;
  status: string;
}
