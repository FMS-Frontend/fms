import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./ui/AppLayout";
import Tenant from "./pages/Tenant";
import Administrator from "./pages/Administrator";
import Reporting from "./pages/Reports";
import Audit from "./pages/Audit";
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
import ChangePassword from "./pages/ChangePassword";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import AdminAnalytics from "./pages/AdminAnalytics";
import AnalystLayout from "./ui/AnalystLayout";
import AnalystDashboard from "./pages/analyst/AnalystDashboard";
import AnalystAlerts from "./pages/analyst/AnalystAlerts";
import AnalystRules from "./pages/analyst/AnalystRules";
import AnalystCase from "./pages/analyst/AnalystCase";
import AnalystAnalytics from "./pages/analyst/AnalystAnalytics";
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import PasswordConfirmation from "./pages/PasswordConfirmation";
import SuperUserHome from "./pages/SuperUserHome";
import Index from "./pages/Index";
// import { SuperUserProvider } from "./context/SuperuserContext";
// import Integration from "./pages/Integration";

// Define the ProtectedRoute component
interface ProtectedProps {
  role: string;
  children: ReactNode;
}

/**
 * ProtectedRoute component restricts access based on user role.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.role - The required role to access the route.
 * @param {React.ReactNode} props.children - The component's children to render if access is granted.
 * @returns {JSX.Element} The children if the user role matches; otherwise, redirects to the login page.
 */

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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const { checkUserRole, role } = useAppContext();
  const userRole = checkUserRole(role);

  // Interceptor hook to set up token handling
  useAxiosInterceptor();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <>
        <Routes>
          {/* <Route index element={<Navigate replace to="login" />} /> */}
          <Route path="/" element={<Index />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="home" element={<SuperUserHome />} />
          <Route path="change-password" element={<ChangePassword />} />

          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="update-password" element={<UpdatePassword />} />
          <Route
            path="password-confirmation"
            element={<PasswordConfirmation />}
          />

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
                  path="organizations"
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
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="audit" element={<Audit />} />
          </Route>

          {/* Admin Routes */}
          {userRole === "admin" && (
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="reporting" element={<AdminReports />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="audit" element={<AdminAudit />} />
              <Route path="integration" element={<AdminIntegration />} />
            </Route>
          )}

          {/* Manager Routes */}
          {userRole === "manager" && (
            <Route path="/manager" element={<ManagerLayout />}>
              <Route path="dashboard" element={<ManagerDashboard />} />
              <Route path="alerts" element={<Tenant />} />
              <Route path="rules" element={<Tenant />} />
              <Route path="cases" element={<Administrator />} />
              <Route path="analytics" element={<Reporting />} />
            </Route>
          )}

          {/* Analyst Routes */}
          {userRole === "analyst" && (
            <Route path="/analyst" element={<AnalystLayout />}>
              <Route path="dashboard" element={<AnalystDashboard />} />
              <Route path="alerts" element={<AnalystAlerts />} />
              <Route path="rules" element={<AnalystRules />} />
              <Route path="cases" element={<AnalystCase />} />
              <Route path="analytics" element={<AnalystAnalytics />} />
            </Route>
          )}

          <Route path="*" element={<Page404 />} />
        </Routes>
      </>

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
