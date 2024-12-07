// AppLayout.tsx
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../navs/Sidebar";
import Header from "../navs/Header";
import { superUserNavdata } from "../../db";

/**
 * App Layout component for the Super User dashboard.
 *
 * This layout provides a responsive structure for the Super User dashboard, which includes:
 * - A sidebar that can be toggled on and off for mobile devices.
 * - A header with a button to toggle the sidebar visibility.
 * - The main content area where child components will be rendered using the `Outlet` from React Router.
 *
 * The sidebar adjusts its visibility based on the screen size and the toggle state.
 *
 * @component
 * @example
 * return (
 *   <AppLayout>
 *     { Children components will be rendered here }
 *   </AppLayout>
 * );
 *
 * @returns {JSX.Element} The rendered layout with a sidebar, header, and content area.
 */

const AppLayout: FC = () => {
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
        navData={superUserNavdata}
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

export default AppLayout;
