// AppLayout.tsx
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { adminNavData } from "../db";

const AdminLayout: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30rem_1fr] grid-rows-[auto_1fr] h-screen hide-scrollbar">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Sidebar
        navData={adminNavData}
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block absolute lg:relative z-20`}
      />
      <Header toggleSidebar={toggleSidebar} />

      <div className="col-span-1 lg:col-start-2 lg:py-10 overflow-scroll hide-scrollbar p-12">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
