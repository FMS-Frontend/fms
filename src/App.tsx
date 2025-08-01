import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import React from "react";
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";
// Dynamic imports
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const LoginPage = React.lazy(() => import("./pages/auth/LoginPage"));
const AppLayout = React.lazy(() => import("./ui/layouts/AppLayout"));
const Tenant = React.lazy(() => import("./pages/Tenant"));
const Administrator = React.lazy(() => import("./pages/Administrator"));
const Audit = React.lazy(() => import("./pages/Audit"));
const Page404 = React.lazy(() => import("./pages/Page404"));
const ManagerLayout = React.lazy(() => import("./ui/layouts/ManagerLayout"));
const ManagerDashboard = React.lazy(() => import("./pages/manager/Dashboard"));
const AdminDashboard = React.lazy(() => import("./pages/AdminDashboard"));
const Users = React.lazy(() => import("./pages/Users"));
const AdminLayout = React.lazy(() => import("./ui/layouts/AdminLayout"));
const AdminReports = React.lazy(() => import("./pages/AdminReports"));
const AdminAudit = React.lazy(() => import("./pages/AdminAudit"));
const AdminIntegration = React.lazy(() => import("./pages/AdminIntegration"));
const ChangePassword = React.lazy(() => import("./pages/ChangePassword"));
const Reports = React.lazy(() => import("./pages/Reports"));
const Analytics = React.lazy(() => import("./pages/Analytics"));
const AdminAnalytics = React.lazy(() => import("./pages/AdminAnalytics"));
const RuleAnalystLayout = React.lazy(() => import("./ui/layouts/RuleAnalystLayout"));
const FraudAnalystLayout = React.lazy(() => import("./ui/layouts/FraudAnalystLayout"));
const RulesManagement = React.lazy(
  () => import("./features/manager/rules/RulesManagement")
);
const AlertsManagement = React.lazy(
  () => import("./features/manager/alerts/AlertsManagement")
);
const CasesManagement = React.lazy(
  () => import("./features/manager/cases/CasesManagement")
);
const AnalystManagement = React.lazy(
  () => import("./features/manager/analyst/AnalystManagement")
);
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const UpdatePassword = React.lazy(() => import("./pages/UpdatePassword"));
const PasswordConfirmation = React.lazy(
  () => import("./pages/PasswordConfirmation")
);
const Index = React.lazy(() => import("./pages/Index"));
const AuditorLayout = React.lazy(() => import("./ui/layouts/AuditorLayout"));
const Settings = React.lazy(() => import("./pages/settings/Settings"));
const AdminRule = React.lazy(() => import("./pages/AdminRule"));
import { ROLES } from "./types/roles";
import ProtectedRoute from "./ui/layouts/PrivateRoute";
import VariableSetting from "./pages/settings/admin-settings/VariableSetting";


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
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route
          path="/password-confirmation"
          element={<PasswordConfirmation />}
        />

        {/* Protected Routes */}
        <Route path="/change-password" element={<ChangePassword />} />

        {/* Super User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute userRole={ROLES.SUPER_USER}>
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
          <Route path="settings/super" element={<Settings />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute userRole={ROLES.ADMIN}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="rules" element={<RulesManagement />} />
          <Route path="cases" element={<CasesManagement />} />
          <Route path="users" element={<Users />} />
          <Route path="rules" element={<AdminRule />} />
          <Route path="reporting" element={<AdminReports />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="audit" element={<AdminAudit />} />
          <Route path="integration" element={<AdminIntegration />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Manager Routes */}
        <Route
          path="/manager"
          element={
            <ProtectedRoute userRole={ROLES.MANAGER}>
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
            <ProtectedRoute userRole={ROLES.RULE_ANALYST}>
              <RuleAnalystLayout/>
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
          path="/fraud-analyst"
          element={
            <ProtectedRoute userRole={ROLES.FRAUD_ANALYST}>
              <FraudAnalystLayout/>
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
            <ProtectedRoute userRole={ROLES.AUDITOR}>
              <AuditorLayout />
            </ProtectedRoute>
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
        <Route path="/test" element={<VariableSetting/>} />

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
