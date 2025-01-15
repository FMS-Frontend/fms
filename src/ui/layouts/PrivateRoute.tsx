import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { SETTINGS_VALID_ROLES } from "../../types/roles";

interface ProtectedProps {
  userRole: string;
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedProps> = ({ userRole, children }) => {
  const { role } = useAppContext();
  const location = useLocation();

  // Check if the current path is a settings route
  const isSettingsRoute = location.pathname.includes("/settings");

  // If it's a settings route, validate against SETTINGS_VALID_ROLES
  if (isSettingsRoute) {
    const hasValidRole = SETTINGS_VALID_ROLES.includes(role);

    if (!hasValidRole) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }

    return <>{children}</>;
  }

  // For non-settings routes, validate against the specific userRole
  if (role !== userRole) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
