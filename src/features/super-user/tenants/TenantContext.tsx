/* eslint-disable react-refresh/only-export-components */
import { useQuery } from "@tanstack/react-query";
import React, { createContext, useContext, useState } from "react";
import { getAdminsModal } from "../../../services/apiSuperUser";

// Define the shape of the tenant data

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
  isLoading: boolean;
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
    phonenumber: "",
    createSchema: true,
    syncAdmin: true,
    sendLoginMail: false,
    createRuleFolder: false,
  });

  const { isLoading, data: admins = [] } = useQuery({
    queryKey: ["adminsModal"],
    queryFn: getAdminsModal,
  });

  // Extract all admin IDs
  const adminsId = admins.map((admin: Admin) => admin.id);

  return (
    <TenantContext.Provider
      value={{ tenantData, setTenantData, admins, adminsId, isLoading }}
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
