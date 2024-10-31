import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./ui/AppLayout";
import Tenant from "./pages/Tenant";
import Administrator from "./pages/Administrator";
import Reporting from "./pages/Reporting";
import Audit from "./pages/Audit";
import AdminDashboard from "./pages/AdminDashboard";
import { checkUserRole } from "./utils/helpers";
import { FC, ReactNode } from "react";
import Users from "./pages/Users";
import Integration from "./pages/Integration";

interface ProtectedProps {
  role: string;
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedProps> = ({ role, children }) => {
  const userRole = checkUserRole(role);
  if (userRole !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

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
        <Route element={<AppLayout />}>
          <Route index element={<RedirectToDashboard />} />
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
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
