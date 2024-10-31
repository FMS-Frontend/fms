// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import LoginPage from "./pages/LoginPage";
// import AppLayout from "./ui/AppLayout";
// import Tenant from "./pages/Tenant";
// import Administrator from "./pages/Administrator";
// import Reporting from "./pages/Reporting";
// import Audit from "./pages/Audit";
// import Home from "./pages/Home";
// import Page404 from "./pages/Page404";
// import ManagerLayout from "./ui/ManagerLayout";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/*" element={<Page404/>} />
//         <Route element={<AppLayout />}>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="tenant" element={<Tenant />} />
//           <Route path="administrator" element={<Administrator />} />
//           <Route path="reporting" element={<Reporting />} />
//           <Route path="audit" element={<Audit />} />
//         </Route>
//         <Route path="/manager" element={<ManagerLayout/>}>
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="alerts" element={<Tenant />} />
//           <Route path="cases" element={<Administrator />} />
//           <Route path="analytics" element={<Reporting />} />
//         </Route>
//         <Route path="login" element={<LoginPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<AppLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tenant" element={<Tenant />} />
          <Route path="administrator" element={<Administrator />} />
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
