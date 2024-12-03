/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  FC,
  ReactNode,
  Context,
  useContext,
  useState,
} from "react";

interface AppContextType {
  role: string;
  checkUserRole: (role: string) => string | undefined;
  handleRoleChange: (newRole: string) => void;
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
}

// Create the context with the appropriate type
const AppContext: Context<AppContextType | undefined> = createContext<
  AppContextType | undefined
>(undefined);

// Define props for the AppProvider
interface AppProviderProps {
  children: ReactNode;
}

// Create the AppProvider component
const AppProvider: FC<AppProviderProps> = ({ children }) => {
  const [role, setRole] = useState("superuser");

  // handleRoleChange
  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
  };

  const [accessToken, setAccessToken] = useState<string | null>("");
  const [refreshToken, setRefreshToken] = useState<string | null>("");

  // const role = "superuser";

  /**
   * Check the user role and return the role string.
   *
   * @param {string} role - The role of the user to check.
   * @returns {string | undefined} The role string if valid, otherwise undefined.
   */
  function checkUserRole(role: string): string | undefined {
    if (role === "superuser") {
      return "superuser";
    } else if (role === "admin") {
      return "admin";
    } else if (role === "manager") {
      return "manager";
    } else if (role === "analyst") {
      return "analyst";
    }
    return undefined; // Return undefined if the role is invalid
  }

  return (
    <AppContext.Provider
      value={{
        handleRoleChange,
        checkUserRole,
        role,
        setAccessToken,
        accessToken,
        setRefreshToken,
        refreshToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/**
 * Custom hook to use the AppContext.
 *
 * @returns {AppContextType} The context value containing the checkUserRole function and role.
 * @throws {Error} Throws an error if the context is accessed outside of its provider.
 */
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
