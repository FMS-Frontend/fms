import { createContext, FC, ReactNode, Context, useContext } from "react";

// Define the context type
interface AppContextType {
  checkUserRole: (role: string) => string | undefined; // Adjust the return type as needed
  role: string;
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
  const role = "manager";

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
    }
    return undefined; // Return undefined if the role is invalid
  }

  return (
    <AppContext.Provider value={{ checkUserRole, role }}>
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
