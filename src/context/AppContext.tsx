/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  FC,
  ReactNode,
  Context,
  useContext,
  useState,
  useEffect,
} from "react";
import { Navigate, Outlet } from "react-router-dom";

interface AppContextType {
  role: string;
  tenant: string | "";
  setTenant: React.Dispatch<React.SetStateAction<string | "">>;
  checkRole: (role: string) => string;
  handleRoleChange: (newRole: string) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  logout: () => void;
  PrivateRoutes: ({ requiredRole }: { requiredRole: string }) => JSX.Element;
}

const AppContext: Context<AppContextType | undefined> = createContext<
  AppContextType | undefined
>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [role, setRole] = useState<string>(
    () => localStorage.getItem("role") || ""
  );
  const [tenant, setTenant] = useState<string>(
    () => localStorage.getItem("tenant") || ""
  );

  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
    if (tenant) {
      localStorage.setItem("tenant", tenant);
    }
  }, [role, tenant]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
  };

  const [accessToken, setAccessToken] = useState<string | null>("");

  const [refreshToken, setRefreshToken] = useState<string | null>("");

  const checkRole = (role: string): string => {
    let normalizedRole: string;

    switch (role) {
      case "":
        normalizedRole = "Super User";
        break;
      case "Admin":
        normalizedRole = "Admin";
        break;
      case "Manager":
        normalizedRole = "Manager";
        break;
      case "Analyst":
        normalizedRole = "Analyst";
        break;
      default:
        normalizedRole = "Unknown";
        break;
    }

    setRole(normalizedRole);
    return normalizedRole;
  };

  const PrivateRoutes = ({ requiredRole }: { requiredRole: string }) => {
    const storedRole = localStorage.getItem("role");

    // If the role matches, render the child routes; otherwise, redirect to /login
    return storedRole === requiredRole ? (
      <Outlet />
    ) : (
      <Navigate to="/" replace />
    );
  };

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setRole("");
    setTenant(""); // Clear tenant as well on logout
  };

  return (
    <AppContext.Provider
      value={{
        handleRoleChange,
        checkRole,
        role,
        logout,
        setAccessToken,
        accessToken,
        setRefreshToken,
        refreshToken,
        tenant,
        setTenant,
        PrivateRoutes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(
      "You're trying to access variable outside of Context Provider"
    );
  }

  return context;
};

export { AppProvider, useAppContext };
