// App.tsx
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
import { checkUserRole } from "./utils/helpers";
import { FC, ReactNode } from "react";
import Users from "./pages/Users";
import Integration from "./pages/Integration";

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
  const userRole = checkUserRole(role);
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

/**
 * RedirectToDashboard component navigates users to the appropriate dashboard
 * based on their role.
 *
 * @component
 * @returns {JSX.Element} A <Navigate /> component that redirects the user to the
 * appropriate dashboard based on their role. Redirects to the login page if
 * the user role is neither "admin" nor "superuser".
 */

const RedirectToDashboard = () => {
  const role = "admin";
  const userRole = checkUserRole(role); // get user role from your auth logic

  if (userRole === "superuser") {
    return <Navigate to="dashboard" replace />;
  } else if (userRole === "admin") {
    return <Navigate to="admin-dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          {/* <Route index element={<RedirectToDashboard />} /> */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute role="superuser">
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin-dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="users"
            element={
              <ProtectedRoute role="admin">
                <Users />
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
          <Route
            path="integration"
            element={
              <ProtectedRoute role="admin">
                <Integration />
              </ProtectedRoute>
            }
          />

          <Route path="reporting" element={<Reporting />} />
          <Route path="audit" element={<Audit />} />
        </Route>
        {/* manager routes */}
        <Route path="/manager" element={<ManagerLayout />}>
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="alerts" element={<Tenant />} />
          <Route path="cases" element={<Administrator />} />
          <Route path="analytics" element={<Reporting />} />
        </Route>
        <Route path="*" element={<Page404 />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
