import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./ui/AppLayout";
import Tenant from "./pages/Tenant";
import Administrator from "./pages/Administrator";
import Reporting from "./pages/Reporting";
import Audit from "./pages/Audit";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import ManagerLayout from "./ui/ManagerLayout";
import ManagerDashboard from "./pages/manager/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { FC, ReactNode } from "react";
import Users from "./pages/Users";
import { useAppContext } from "./context/AppContext";
import AdminLayout from "./ui/AdminLayout";
import AdminReports from "./pages/AdminReports";
import AdminAudit from "./pages/AdminAudit";
import AdminIntegration from "./pages/AdminIntegration";
// import Integration from "./pages/Integration";

// Define the ProtectedRoute component
interface ProtectedProps {
  role: string;
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedProps> = ({ role, children }) => {
  const { checkUserRole } = useAppContext();
  const userRole = checkUserRole(role);
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Define the RedirectToDashboard component
// const RedirectToDashboard = () => {
//   const { checkUserRole, role } = useAppContext();
//   const userRole = checkUserRole(role);

//   if (userRole === "superuser") {
//     return <Navigate to="dashboard" replace />;
//   } else if (userRole === "admin") {
//     return <Navigate to="admin-dashboard" replace />;
//   } else if (userRole === "manager") {
//     return <Navigate to="manager/dashboard" replace />;
//   } else {
//     return <Navigate to="/login" replace />;
//   }
// };

function App() {
  const { checkUserRole, role } = useAppContext();
  const userRole = checkUserRole(role);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />

        {/* Superuser Routes */}
        <Route element={<AppLayout />}>
          {userRole === "superuser" && (
            <>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute role="superuser">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tenant"
                element={
                  <ProtectedRoute role="superuser">
                    <Tenant />
                  </ProtectedRoute>
                }
              />
              <Route
                path="administrator"
                element={
                  <ProtectedRoute role="superuser">
                    <Administrator />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          <Route path="reporting" element={<Reporting />} />
          <Route path="audit" element={<Audit />} />
        </Route>

        {/* Admin Routes */}
        {userRole === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="reporting" element={<AdminReports />} />
            <Route path="audit" element={<AdminAudit />} />
            <Route path="integration" element={<AdminIntegration />} />
          </Route>
        )}

        {/* Manager Routes */}
        {userRole === "manager" && (
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="alerts" element={<Tenant />} />
            <Route path="cases" element={<Administrator />} />
            <Route path="analytics" element={<Reporting />} />
          </Route>
        )}

        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
