import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/auth/LoginPage";
import AppLayout from "./ui/layouts/AppLayout";
import Tenant from "./pages/Tenant";
import Administrator from "./pages/Administrator";
import Audit from "./pages/Audit";
import Page404 from "./pages/Page404";
import ManagerLayout from "./ui/layouts/ManagerLayout";
import ManagerDashboard from "./pages/manager/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { FC, ReactNode } from "react";
import Users from "./pages/Users";
import { useAppContext } from "./context/AppContext";
import AdminLayout from "./ui/layouts/AdminLayout";
import AdminReports from "./pages/AdminReports";
import AdminAudit from "./pages/AdminAudit";
import AdminIntegration from "./pages/AdminIntegration";
import ChangePassword from "./pages/ChangePassword";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import AdminAnalytics from "./pages/AdminAnalytics";
import AnalystLayout from "./ui/layouts/AnalystLayout";
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";
import RulesManagement from "./features/manager/rules/RulesManagement";
import AlertsManagement from "./features/manager/alerts/AlertsManagement";
import CasesManagement from "./features/manager/cases/CasesManagement";
import AnalystManagement from "./features/manager/analyst/AnalystManagement";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import PasswordConfirmation from "./pages/PasswordConfirmation";
import Index from "./pages/Index";
import TenantsLogin from "./pages/auth/TenantsLogin";
import AuditorLayout from "./ui/layouts/AuditorLayout";
import SettingsPage from "./pages/SettingsPage";
import AdminRule from "./pages/AdminRule";
// import { SuperUserProvider } from "./context/SuperuserContext";
// import Integration from "./pages/Integration";

// ProtectedRoute Component
interface ProtectedProps {
  userRole: string;
  children: ReactNode;
}

// const ProtectedRoute: FC<ProtectedProps> = ({ userRole, children }) => {
//   const { role } = useAppContext();

//   const skip = ["settings"];

//   // Check role and redirect to login if unauthorized
//   if (role !== userRole) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

// const ProtectedRoute: FC<ProtectedProps> = ({ userRole, children }) => {
//   const { role } = useAppContext();
//   const location = useLocation(); // Get the current path
//   // const skip = ["settings"]; // Array of paths to skip role checks

//   // // Check if the current path is in the skip array
//   // const isSkipped = skip.some((path) => location.pathname.includes(path));

//   const skipPaths = ["/settings", "/admin/settings"]; // Fully qualified skip paths
//   // Check if the current path is in the skip array
//   const isSkipped = skipPaths.includes(location.pathname);

//   // If role doesn't match and the route is not in the skip array, redirect to home
//   if (!isSkipped && role !== userRole) {
//     console.log("Redirecting to home due to role mismatch");

//     return <Navigate to="/" state={{ from: location }} replace />;
//   }

//   return <>{children}</>;
//   // return <Outlet />; // Render child routes
// };

const ProtectedRoute: FC<ProtectedProps> = ({ userRole, children }) => {
  console.log("user role  in props ===>", userRole);
  const { role } = useAppContext();
  console.log("from context ===>", role);

  const location = useLocation();

  // Function to check if current path is a settings route
  const isSettingsRoute = location.pathname.includes("/settings");
  console.log("is settings ===>", isSettingsRoute);

  // If it's a settings route, allow access based on the user having any valid role
  if (isSettingsRoute) {
    const validRoles = ["Admin", "Manager", "Analyst", "Auditor", "Super User"];
    const hasValidRole = validRoles.includes(role);

    if (!hasValidRole) {
      return <Navigate to="/login" replace state={{ from: location }} />;
    }

    return <>{children}</>;
  }

  // For non-settings routes, check if the user has the specific required role
  if (role !== userRole) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

// QueryClient Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  // Set up token handling
  useAxiosInterceptor();

  

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/:tenant/auth/login" element={<TenantsLogin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route
          path="/password-confirmation"
          element={<PasswordConfirmation />}
        />

        {/* Protected Routes */}
        <Route
          path="/change-password"
          element={
            <ProtectedRoute userRole="Super User">
              <ChangePassword />
            </ProtectedRoute>
          }
        />

        {/* Super User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute userRole="Super User">
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="organizations" element={<Tenant />} />
          <Route path="contact" element={<Administrator />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="audit" element={<Audit />} />
          <Route path="settings/super" element={<SettingsPage />} />
        </Route>

        {/* Admin Routes */}
        {/* <Route path="/admin" element={<ProtectedRoute userRole="Admin" />}>
          <Route path="" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="rules" element={<AdminRule />} />
            <Route path="reporting" element={<AdminReports />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="audit" element={<AdminAudit />} />
            <Route path="integration" element={<AdminIntegration />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route> */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute userRole="Admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="rules" element={<RulesManagement />} />
          <Route path="users" element={<Users />} />
          <Route path="rules" element={<AdminRule />} />
          <Route path="reporting" element={<AdminReports />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="audit" element={<AdminAudit />} />
          <Route path="integration" element={<AdminIntegration />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Manager Routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute userRole="Manager">
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="alerts" element={<AlertsManagement />} />
          <Route path="rules" element={<RulesManagement />} />
          <Route path="cases" element={<CasesManagement />} />
          <Route path="analytics" element={<AnalystManagement />} />
        </Route>

        {/* Rule Analyst Routes */}
        <Route
          path="/rule-analyst"
          element={
            <ProtectedRoute userRole="Analyst">
              <AnalystLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="alerts" element={<AlertsManagement />} />
          <Route path="rules" element={<RulesManagement />} />
          <Route path="cases" element={<CasesManagement />} />
          <Route path="analytics" element={<AnalystManagement />} />
        </Route>

        {/*Fraud Analyst Routes */}
        <Route
          path="/analyst"
          element={
            <ProtectedRoute userRole="Analyst">
              <AnalystLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="alerts" element={<AlertsManagement />} />
          <Route path="rules" element={<RulesManagement />} />
          <Route path="cases" element={<CasesManagement />} />
          <Route path="analytics" element={<AnalystManagement />} />
        </Route>

        {/* Auditor Routes */}
        <Route
          path="/auditor"
          element={
            // <ProtectedRoute userRole="Auditor">
            <AuditorLayout />
            // </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="auditlogs" element={<Audit />} />
          <Route path="report" element={<Reports />} />
          <Route path="rules" element={<RulesManagement />} />
          <Route path="alerts" element={<AlertsManagement />} />
          <Route path="cases" element={<CasesManagement />} />
          <Route path="organization" element={<Tenant />} />
          <Route path="integration" element={<AdminIntegration />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Page404 />} />
      </Routes>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#FAFAFA",
            color: "#313131",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
