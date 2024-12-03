/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { getAdmins } from "../../../services/apiSuperUser";
import { useSearchParams } from "react-router-dom";

// Define the shape of the tenant data
export interface TenantData {
  name: string;
  address: string;
  adminId: string;
  email: string;
  description: string;
  createSchema: boolean;
  syncAdmin: boolean;
  sendLoginMail: boolean;
  createRuleFolder: boolean;
}

interface Admin {
  id: string; // Assuming each admin has a unique ID
  name: string; // Example property, adjust based on actual API response
}

// Define the context and its methods
interface TenantContextType {
  tenantData: TenantData;
  setTenantData: React.Dispatch<React.SetStateAction<TenantData>>;
  admins: Admin[] | undefined; // Fetched admin data
  adminsId: string[]; // Array of admin IDs extracted from the fetched data
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

// Context provider component
export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tenantData, setTenantData] = useState<TenantData>({
    name: "",
    address: "",
    adminId: "",
    email: "",
    description: "",
    createSchema: true,
    syncAdmin: true,
    sendLoginMail: false,
    createRuleFolder: false,
  });

  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: admins = [] } = useQuery({
    queryKey: ["admins", page],
    queryFn: () => getAdmins(page),
  });

  // Extract all admin IDs
  const adminsId = admins.map((admin: Admin) => admin.id);

  return (
    <TenantContext.Provider
      value={{ tenantData, setTenantData, admins, adminsId }}
    >
      {children}
    </TenantContext.Provider>
  );
};

// Custom hook for accessing the context
export const useTenant = (): TenantContextType => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};
